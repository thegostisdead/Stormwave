
## Commands

✔️

| Command          | Status |                                            Args | Handled by Stormwave | Handled by C2 | Handled in C2 website | 
|------------------|:------:|------------------------------------------------:|---------------------:|--------------:|----------------------:|
| Announce         |   ✔️   |                                                 |                    x |            no |                    no |
| Idle             |   ✔️   |                                                 |                    x |            no |                    no |
| SetRelay         |   ✔️   |                                       ip:string |                    x |             x |                   yes |
| SetPullingRate   |   ✔️   |                                     seconds:int |                    x |             x |                   yes |
| GetPublicIp      |   ✔️   |                                                 |                    x |             x |                   yes |
| GetSysInfo       |   ✔️   |                                                 |                    x |             x |                   yes |
| GetPrivateIp     |   ✔️   |                                                 |                    x |             x |                   yes |
| Screenshot       |   ✔️   |                                                 |                    x |             x |                   yes |
| GetKeyboardData  |   ✔️   |                                                 |                    x |             x |                   yes |
| Ping             |   ✔️   |                                 targetIp:string |                    x |             x |                   yes |
| Wifi             |   ✔️   |                                                 |                    x |             x |                   yes |
| Ddos             |   ✔️   |                                 targetIp:string |                    x |             x |                   yes |
| RunCommand       |   ✔️   |                                  command:string |                    x |             x |                   yes |
| PowershellAdmin  |   ✔️   |                                  command:string |                    x |             x |                   yes |
| InstallIpScanner |   ✔️   |                                                 |                    x |             x |                   yes |
| DownloadFile     |        |                                                 |                    x |             x |                   yes |
| NetworkScan      |        | startIPv4Address:string ; endIPv4Address:string |                    x |             x |                   yes |
| UploadFile       |        |                                                 |                    x |             x |                   yes |
| AudioCapture     |        |                                                 |                    x |             x |                   yes |
| InstallPython    |        |                                                 |                    x |             x |                   yes |
| InstallStealer   |        |                                                 |                    x |             x |                   yes |


C2 Commands:
ClearCommands
NetworkMove
