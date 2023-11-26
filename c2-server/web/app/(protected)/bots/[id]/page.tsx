"use client"
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import {
    BreadcrumbItem,
    Breadcrumbs,
    Card,
    CardBody,
    Divider,
    Spacer, Spinner,
} from "@nextui-org/react";

import {
    Listbox,
    ListboxSection,
    ListboxItem
} from "@nextui-org/react";

import {Button} from "@nextui-org/button";
import {LuRefreshCw, LuTerminalSquare} from "react-icons/lu";
import {Link} from "@nextui-org/link";
import {usePathname} from "next/navigation";
import {Bot} from "@/lib/bot.interface";
import BotInfo from "@/components/bot-info";
import {availableCommands} from "@/lib/available-commands";


export default function BotPage() {

    const currentPath = usePathname()

    const [bot, setBot] = useState<Bot| null>(null)
    const [payloads, setPayloads] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const commands = availableCommands.commands

    async function getBots() {
        setLoading(true)
        const res = await fetch('/api/bots/' + currentPath.split('/')[2])
        const bots = await res.json()
        setBot(bots)
        setLoading(false)
        return bots
    }

    useEffect(() => {
        getBots()
    }, [])


    function handleRefresh() {
        const promise = getBots()

        toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => { return `Bot data refreshed!`},
            error: 'Error',
        });
    }

    return (
        <div>
            <nav className={"flex justify-between"}>
                <div className={"flex"}>
                    <Breadcrumbs>
                        <BreadcrumbItem href="/bots">Bots</BreadcrumbItem>
                        <BreadcrumbItem>{bot?.id}</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div className={"flex"}>
                        <Button href={`/bots/${bot?.id}/shell`} as={Link} color="secondary" variant="bordered" startContent={<LuTerminalSquare/>}>
                            Shell
                        </Button>
                    <Spacer x={2}/>
                    <Button color="primary" variant="bordered"  startContent={<LuRefreshCw/>} onClick={handleRefresh}>
                        Refresh
                    </Button>
                </div>
            </nav>
            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>
            <section className={"flex gap-4"}>
                {bot ? <BotInfo bot={bot}/> : <Spinner label="Loading..." />}
            </section>
            <Spacer y={4}/>
            <section>
                <h1 className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Commands</h1>
                <Spacer y={4}/>
                <div className={"flex gap-2"}>
                    <div className={"flex basis-1/4"}>
                        <div className="w-full max-w-[300px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                            <Listbox
                                aria-label="Actions"
                                onAction={(key) => alert(key)}
                            >
                                {commands.map((command, index) => (
                                    <ListboxItem key={index}>{command.name}</ListboxItem>
                                ))}

                            </Listbox>
                        </div>
                    </div>
                    <div className={"flex basis-3/4 bg-amber-300"}>
                        <Card>
                            <CardBody>
                                <p>test</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section>
            <Spacer y={4}/>
            <section>
                <h1 className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Payloads</h1>
                <Spacer y={4}/>
                <div className={"flex gap-8"}>
                    {payloads.map((payload, index) => (
                       <Link key={index} href={`/bots/${bot?.id}/payloads/${payload.toLowerCase()}`}>
                           <Card className={"w-full"}>
                               <CardBody>
                                   <p>{payload}</p>
                               </CardBody>
                           </Card>
                          </Link>
                    ))}
                </div>
            </section>
        </div>
    )

}
