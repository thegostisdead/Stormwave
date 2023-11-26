"use client"
import {useState} from "react";
import {
    Skeleton,
    Spacer,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {LuRefreshCw} from "react-icons/lu";
import {Link} from "@nextui-org/link";
import React from "react";
import {Bot} from "@/lib/bot.interface";
import {toast} from "sonner";

export default function Bots() {

    const [bots, setBots] = useState<Bot[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function getBots() {
        setLoading(true)
        const res = await fetch('/api/bots')
        const bots = await res.json()
        setBots(bots)
        setLoading(false)
    }

    React.useEffect(() => {
        getBots()
    }, [])

    async function handleRefresh() {
        const promise = getBots()
        toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
                return `Bots refreshed!`
            },
            error: 'Error',
        });
    }

    return (
        <div>
            <nav className={"flex justify-between"}>
                <h1 className={"block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Bots</h1>
                <Button color="primary" variant="bordered" startContent={<LuRefreshCw/>} onClick={handleRefresh}>
                    Refresh
                </Button>
            </nav>
            <Spacer y={4}/>
            <section className={"flex gap-4"}>
                {loading ? (
                    <Skeleton className="rounded-lg">
                        <div className="h-50 rounded-lg bg-default-500"></div>
                    </Skeleton>
                ) : <Table aria-label="Example static collection table" isStriped>
                    <TableHeader>
                        <TableColumn>Id</TableColumn>
                        <TableColumn>Ip</TableColumn>
                        <TableColumn>Last Connexion</TableColumn>
                        <TableColumn>PC name</TableColumn>
                        <TableColumn>OS</TableColumn>
                        <TableColumn>Deployed Payload</TableColumn>
                        <TableColumn>{}</TableColumn>
                    </TableHeader>
                    <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..."/>}>
                        {bots.map((bot: Bot) => (
                            <TableRow key={bot.id}>
                                <TableCell>{bot.id}</TableCell>
                                <TableCell>{bot.ip}</TableCell>
                                <TableCell>{bot.lastSeen}</TableCell>
                                <TableCell>{bot.hostname}</TableCell>
                                <TableCell>{bot.os}</TableCell>
                                <TableCell>{bot.deployedPayload}</TableCell>
                                <TableCell>
                                    <Button
                                        href={`/bots/${bot.id}`}
                                        as={Link}
                                        color="primary"
                                        variant="bordered"
                                    >
                                        See
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                }
            </section>
            <section>
            </section>
        </div>
    )

}
