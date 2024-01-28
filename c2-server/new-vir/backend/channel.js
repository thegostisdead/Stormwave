

 class IMessage {
    constructor() {
        this.timestamp = new Date();
    }
}

 class C2Message extends IMessage {
    constructor(data) {
        super();
        this.type = 'c2';
        this.data = data;
    }
}

 class BotMessage extends IMessage {
    constructor(data) {
        super();
        this.type = 'bot';
        this.data = data;
    }
}

 class Channel {
    constructor(botId) {
        this.botId = botId;
        this.messages = []; // IMessage[]
        this.commands = []
    }
}

module.exports = { Channel, BotMessage, C2Message, IMessage}
