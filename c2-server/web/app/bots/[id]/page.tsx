"use client"

import {
    Card,
    CardBody,
    Divider,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {LuRefreshCw, LuTerminalSquare} from "react-icons/lu";
import {Link} from "@nextui-org/link";
import NextLink from "next/link";


export default function BotPage() {

    const payloads = [ "Nmap", "Keylogger", "Webcam", "phishing", "ethernal blue", "reverse shell", "hashcat"]


    return (
        <div>
            <nav className={"flex justify-between"}>
                <div className={"flex"}>
                    <h1 className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Bots</h1>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>/</span>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>1</span>
                </div>
                <div className={"flex"}>
                        <Button href="/bots/1/shell" as={Link}  color="secondary" variant="bordered"  startContent={<LuTerminalSquare/>}>
                            Shell
                        </Button>
                    <Spacer x={2}/>
                    <Button color="primary" variant="bordered"  startContent={<LuRefreshCw/>}>
                        Refresh
                    </Button>
                </div>
            </nav>
            <Spacer y={4}/>
            <Divider/>
            <Spacer y={4}/>
            <section className={"flex gap-4"}>
                <Card className={"w-full"}>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </section>
            <Spacer y={4}/>
            <section>
                <h1 className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Payloads</h1>
                <Spacer y={4}/>
                <div className={"flex gap-8"}>
                    {payloads.map((payload, index) => (
                       <Link key={index} href={"/bots/1/payloads/" + payload.toLowerCase()}>
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
