"use client"

import {Button} from "@nextui-org/button";
import {useEffect, useState} from "react";
import {Card, CardBody, Spacer} from "@nextui-org/react";
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import "./terminal.css"
export default function Shell() {

    const [connected, setConnected] = useState(false)

    const handleConnect = () => {
        setConnected(!connected)
    }

    const commandHandler = (text : string) => {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            TerminalService.emit('response', response);
        }
        else {
            TerminalService.emit('clear');
        }
    }

    useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        }
    }, []);

    return (
        <div>
            <div className={"flex justify-end"}>
                <Button color={connected ? "danger" : "primary" } variant={"bordered"} onClick={handleConnect}>
                    {connected ? "Disconnect" : "Connect"}
                </Button>
            </div>
            <Spacer y={4}/>

            <div className="terminal-demo">
                <div className="card">
                    <Terminal welcomeMessage="Connected to shell" prompt="bot#232 $" />
                </div>
            </div>
        </div>
    )

}
