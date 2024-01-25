# T-SEC-901-LYO_13

## StormWave 
StormWave is our malware. StormWave run like an agent and allow attacker to exec commands. 

### Attack 

1) The attacker use the RemoteMouse Exploit to spawn a shell. 
An evil powershell script will be downloaded and started. 

2) Powershell script 
The script will first download a malicious exe file to disable Windows Defender.
The script also download a malicious DLL file and save it in the System32 folder. This DLL will be automatically loaded at startup time with NT Authority System right. <dllname> allow use to disable the AV and turn off firewall continiously. 

The powershell script also install the agent A.K.A Stormware. 

3) StormWave 
StormWave load a dll to detect sandbox and stop his execution if a sandbox is detected. StormWave try to be persitant everytime. 

### Features

#### Command Execution 

#### Persitance

#### Keylogger 

#### Dump SAM 
