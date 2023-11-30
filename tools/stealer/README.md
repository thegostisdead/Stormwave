
# Stealer README

## Description
This project consists of two Python scripts designed for educational purposes to demonstrate how data can be extracted from Google Chrome's saved information on Linux and Windows systems. 

- `linux_stealer.py`: Extracts data from Google Chrome on Linux systems.
- `windows_stealer.py`: Extracts data from Google Chrome on Windows systems.

## Dependencies
Both scripts require Python 3.8 - 3.10 and several external libraries. The specific dependencies for each script are as follows:

### For `linux_stealer.py`:
- `os`
- `json`
- `base64`
- `sqlite3`
- `shutil`
- `cryptography`

### For `windows_stealer.py`:
- `os`
- `json`
- `base64`
- `sqlite3`
- `shutil`
- `win32crypt`
- `pycryptodome` (replaces `Crypto.Cipher`)

To install these dependencies, you can use pip, Python's package installer. Example command:
```bash
pip install pycryptodome cryptography
```

## How To Use

### `linux_stealer.py`:
1. Ensure all dependencies are installed.
2. Run the script in a Python 3 environment.
3. The script will attempt to locate and extract data from the Chrome user data directory in a Linux environment.

### `windows_stealer.py`:
1. Ensure all dependencies are installed.
2. Run the script in a Python 3 environment on a Windows system.
3. The script will attempt to locate and extract data from the Chrome user data directory in a Windows environment.

## Disclaimer
This software is provided for educational purposes only. Do not use it for illegal or unethical activities. The developer assumes no liability for misuse of this software.