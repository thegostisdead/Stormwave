#!/bin/bash

# https://lehollandaisvolant.net/?d=2019/01/07/22/57/47-localhost-et-https 
# https://github.com/FiloSottile/mkcert 

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
	echo "Installing tools "
        sudo apt install libnss3-tools -y
	mkdir ~/.mkcert && cd ./.mkcert	
        wget -O mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.2.0/mkcert-v1.2.0-linux-amd64
        chmod +x mkcert
	echo "Install done"
	./mkcert -install
        ./mkcert localhost
elif [[ "$OSTYPE" == "darwin"* ]]; then
	echo "Installing tools "	
	brew install mkcert
	brew install nss # if you use Firefox
	echo "Install done"	
	mkcert -install
	mkcert localhost
else 
	echo "Your os is not compatible with this script."
fi

