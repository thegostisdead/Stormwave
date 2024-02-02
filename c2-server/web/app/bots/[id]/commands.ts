
const backendUrl = "http://localhost:4000/backend";


export async function sendCommand(botId: string, commandName: string, commandData: any) {

    if (botId === undefined || botId === null) {
        throw new Error("botId is required");
    }

    if (commandName === undefined || commandName === null) {
        throw new Error("commandName is required");
    }

    return await fetch(backendUrl + "/commands", {
        method: "POST",
        body: JSON.stringify({
            "botId" : botId,
            "name" : commandName,
            "args" : commandData || {}
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })
}
