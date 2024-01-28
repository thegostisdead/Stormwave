
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


module.exports = {Command, Idle, Ping, Announce}