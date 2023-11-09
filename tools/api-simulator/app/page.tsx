"use client";
import { setCurrentCommand } from './actions'
import React from "react";
import {Select, SelectItem, Spacer, Textarea, Button, Input, Divider, Code} from '@nextui-org/react';
import {availableCommands, Command} from "@/config/available-commands";
import {Icon} from "@iconify/react";

interface CommandArgs {
    "name": string,
    "type": "string" | "number" | "boolean",
}

export default function Home() {

    const [commandBody, setCommandBody] = React.useState<string>("");
    const [commandName, setCommandName] = React.useState<string>("");
    const [commandArgs, setCommandArgs] = React.useState<CommandArgs[]>([]);
    const [apiCommand, setApiCommand] = React.useState<string>("");

    async function fetchCurrentCommand() {
        const response = await fetch("/api/command");
        const json = await response.json();
        setApiCommand(JSON.stringify(json));
    }

    function handleCommandChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setCommandName(e.target.value);
        setCommandBody(JSON.stringify(availableCommands.commands.find((command: Command) => command.name === e.target.value)));

        const selected = availableCommands.commands.find((command: Command) => command.name === e.target.value) || null;
        if (selected && selected.args) {
            const objectKeys = Object.keys(selected.args)
            setCommandArgs(objectKeys.map((key: string) => {
                return {
                    "name": key,
                    "type": selected.args[key] as "string" | "number" | "boolean"
                }
            }))
        }
    }

    function handleArgChange(e: React.ChangeEvent<HTMLInputElement>, arg: CommandArgs) {

        const newBody = JSON.parse(commandBody);
        if (arg.type === "number") {
            newBody.args[arg.name] = parseInt(e.target.value);
            setCommandBody(JSON.stringify(newBody));
            return;
        } else if (arg.type === "boolean") {
            newBody.args[arg.name] = e.target.value === "true";
            setCommandBody(JSON.stringify(newBody));
            return;
        } else if (arg.type === "string") {
            newBody.args[arg.name] = e.target.value;
            setCommandBody(JSON.stringify(newBody));
            return;
        } else {
            newBody.args[arg.name] = e.target.value;
            setCommandBody(JSON.stringify(newBody));
            return;
        }

    }

    return (
        <div>
            <h1>Api Simulator</h1>
            <Spacer y={4}/>
            <div className={"flex justify-between"}>
                <Select
                    label="Select a command"
                    placeholder=""
                    className="max-w-xs"
                    variant="bordered"
                    startContent={<Icon icon="mdi:play"/>}
                    items={availableCommands.commands}
                    value={commandName}
                    onChange={handleCommandChange}
                >
                    {(command: Command) => <SelectItem key={command.name} value={command.name}>
                        {command.name}
                    </SelectItem>}
                </Select>
                <Button color={"primary"} variant={"ghost"} onClick={() => {setCurrentCommand(commandBody)}}>Set a current command</Button>
            </div>
            <Spacer y={4}/>
            <div className={"flex gap-4 flex-col"}>
                <h2>Args</h2>
                <div className={"grid grid-cols-3 gap-4"}>
                    {commandArgs.map((arg: CommandArgs) => {
                        return (
                            <Input key={arg.type + arg.name}
                                   label={arg.name}
                                   type={arg.type}
                                   placeholder={arg.type}
                                   onChange={(e) => handleArgChange(e, arg)}
                                   variant={"bordered"}
                            />
                        )
                    })}
                </div>
                <Spacer y={2}/>
                <Textarea
                    className="w-full y-4"
                    placeholder="Response"
                    variant="bordered"
                    value={commandBody}
                    onChange={(e) => setCommandBody(e.target.value)}
                />
            </div>
            <Spacer y={4}/>
            <Divider/>
            <div className={"flex flex-wrap"}>
                <div className={"flex justify-between basis-full"}>
                    <h2>Current Command</h2>
                    <Button variant={"ghost"} color={"success"} onClick={fetchCurrentCommand}>Get current command</Button>
                </div>
                <pre>
                     <Code color="default">
                         {apiCommand}
                     </Code>
                </pre>
            </div>
        </div>
    );
}
