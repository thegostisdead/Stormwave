# Bastion 

Bastion is a dll that provide functions to allow you to detect if you are in a sandbox environment.

## Detection methods 
- Mac Address prefix 
- Dll 
- Screen size
- Mouse movements 
- Disk Space 
- Ram Space

## How to use 

Import the dll in your favorite language. 

```python
import ctypes
# Load DLL into memory.
hllDll = ctypes.WinDLL ("c:\\bastion.dll")
```

With C : https://stackoverflow.com/questions/8696653/dynamically-load-a-function-from-a-dll

## Dev
Bastion is written in go. 

1 - Install dep 
```sh 
go get 
```
2 - Run 
```sh 
go get 
```
3 - Generate Dll
```sh 
go get 
```

# Sources
- https://github.com/LordNoteworthy/al-khaser?tab=readme-ov-file#antivm
- https://unprotect.it/category/sandbox-evasion/
- https://hackmag.com/security/malware-sandbox/