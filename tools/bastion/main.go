package main

import (
	"errors"
	"fmt"
	"net"
	"os"
	"strings"
	"syscall"
	"unsafe"
)

var (
	/* Hooking */
	_ = syscall.NewLazyDLL("user32.dll")
	_ = syscall.NewLazyDLL("kernel32.dll")

	user32                  = syscall.NewLazyDLL("user32.dll")
	kernel_32               = syscall.MustLoadDLL("kernel32.dll")
	procGetSystemMetrics    = user32.NewProc("GetSystemMetrics")
	globalMemoryStatusEx, _ = kernel_32.FindProc("GlobalMemoryStatusEx")
)

type Pair[T, U any] struct {
	First  T
	Second U
}

type DiskUsage struct {
	freeBytes  int64
	totalBytes int64
	availBytes int64
}

type memStatusEx struct {
	dwLength     uint32
	dwMemoryLoad uint32
	ullTotalPhys uint64
	unused       [6]uint64
}

// disk usage of path/disk
func getDiskUsage(volumePath string) *DiskUsage {

	h := syscall.MustLoadDLL("kernel32.dll")
	c := h.MustFindProc("GetDiskFreeSpaceExW")

	du := &DiskUsage{}

	c.Call(
		uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr(volumePath))),
		uintptr(unsafe.Pointer(&du.freeBytes)),
		uintptr(unsafe.Pointer(&du.totalBytes)),
		uintptr(unsafe.Pointer(&du.availBytes)))

	return du
}

func getMacAddr() []string {
	interfaces, err := net.Interfaces()

	if err != nil {

	}

	var address []string

	for _, networkInterface := range interfaces {
		address = append(address, networkInterface.HardwareAddr.String())
	}

	return address
}

func evadeSystemMemory() {
	// https://unprotect.it/technique/checking-memory-size/

	msx := &memStatusEx{dwLength: 64}
	r, _, _ := globalMemoryStatusEx.Call(uintptr(unsafe.Pointer(msx)))
	if r == 0 {
		fmt.Println("Error getting memory status")
	}

	var maxMemory float64 = 2.0
	var system_memory = float64(msx.ullTotalPhys/1024/1024) / 1024

	if system_memory <= maxMemory {
		fmt.Println("Sandbox detected")
	} else {
		fmt.Println("Sandbox not detected")
	}
}

func getCPUInfo() {
	//wmic.exe CPU Get NumberOfCores,NumberOfLogicalProcessors /Format:List
}

func getScreenResolution() {
	// https://unprotect.it/technique/checking-screen-resolution/
	indexX := uintptr(0)
	indexY := uintptr(1)
	x, _, _ := procGetSystemMetrics.Call(indexX)
	y, _, _ := procGetSystemMetrics.Call(indexY)
	fmt.Println("X = ", x, " Y = ", y)
	// Modify the screen size as you want !
	if x < 1024 || y < 768 {
		fmt.Println("Sandbox Detected !")
	}
}
func Exists(name string) (bool, error) {
	_, err := os.Stat(name)
	if err == nil {
		return true, nil
	}
	if errors.Is(err, os.ErrNotExist) {
		return false, nil
	}
	return false, err
}

// TODO https://github.com/addi00000/empyrean/blob/main/src/components/antidebug.py

// detect sandboxes
func isEnvSandbox() bool {

	evadeSystemMemory()
	getScreenResolution()

	systemFiles := [...]string{
		"C:\\Windows\\system32\\drivers\\BoxMouse.sys",
		"C:\\Windows\\system32\\drivers\\BoxGuest.sys",
		"C:\\Windows\\system32\\drivers\\BoxSF.sys",
		"c:\\windows\\system32\\drivers\\BoxVideo.sys",
		"c:\\windows\\system32\\boxdisp.dll",
		"c:\\windows\\system32\\boxhook.dll",
		"c:\\windows\\system32\\boxmrxnp.dll",
		"c:\\windows\\system32\\vboxogl.dll",
		"c:\\windows\\system32\\vboxoglarrayspu.dll",
		"c:\\windows\\system32\\vboxoglcrutil.dll",
		"c:\\windows\\system32\\vboxoglerrorspu.dll",
		"c:\\windows\\system32\\vboxoglfeedbackspu.dll",
		"c:\\windows\\system32\\vboxoglpackspu.dll",
		"c:\\windows\\system32\\vboxoglpassthroughspu.dll",
		"c:\\windows\\system32\\vboxservice.exe",
		"c:\\windows\\system32\\vboxtray.exe",
		"c:\\windows\\system32\\VBoxControl.exe",
		"c:\\windows\\system32\\drivers\\vmmouse.sys",
		"c:\\windows\\system32\\drivers\\vmhgfs.sys",
		"c:\\windows\\system32\\drivers\\vm3dmp.sys",
		"c:\\windows\\system32\\drivers\\vmci.sys",
		"c:\\windows\\system32\\drivers\\vmhgfs.sys",
		"c:\\windows\\system32\\drivers\\vmmemctl.sys",
		"c:\\windows\\system32\\drivers\\vmmouse.sys",
		"c:\\windows\\system32\\drivers\\vmrawdsk.sys",
		"c:\\windows\\system32\\drivers\\vmusbmouse.sys",
	}
	macAddressPrefix := [...]string{
		"08:00:27", //  (VBOX)
		"00:05:69", //  (VMWARE)
		"00:0C:29", //  (VMWARE)
		"00:1C:14", //  (VMWARE)
		"00:50:56", //  (VMWARE)
		"00:1C:42", //  (Parallels)
		"00:16:3E", //  (Xen)
		"0A:00:27", //  (Hybrid Analysis)
	}

	// search for system files
	for _, element := range systemFiles {

		exists, err := Exists(element)
		if err != nil {
			fmt.Println("Error during file exist")
		}

		if exists {
			fmt.Print("Warning file exist : ")
			fmt.Println(element)
		}
	}

	// check for mac address can detect VM
	macAddress := getMacAddr()
	for _, basePrefix := range macAddressPrefix {
		for _, foundedMac := range macAddress {
			if strings.HasPrefix(foundedMac, basePrefix) {
				fmt.Println("Warning sus mac address founded!")
				// TODO crash the program before install persistence
			}
		}
	}

	return false
}

func main() {
	isEnvSandbox()
}
