"use client"

import {Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {LuRefreshCw} from "react-icons/lu";
import {Link} from "@nextui-org/link";

interface RowData {
    id: number;
    ip: string;
    lastConnexion: string;
    pcName: string;
    os: string;
    deployedPayload: string;
}


export default function Bots() {


    const rowsData : RowData[] = [
        {
            id: 1,
            ip: "56.54.123.1",
            lastConnexion: "2 minutes ago",
            pcName: "DESKTOP-123",
            os: "Windows 10 Enterprise",
            deployedPayload: "Nmap, Keylogger, Webcam"
        },
        {
            id: 2,
            ip: "56.96.123.5",
            lastConnexion: "30 minutes ago",
            pcName: "DESKTOP-456",
            os: "Windows 10",
            deployedPayload: "Webcam, Keylogger"
        },
        {
            id: 3,
            ip: "43.4.5.56",
            lastConnexion: "3 minutes ago",
            pcName: "LAPTOP-456",
            os: "Windows 10 LTSC",
            deployedPayload: "Keylogger"
        },
    ]

    return (
        <div>
            <nav className={"flex justify-between"}>
                <h1 className={"block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"} >Bots</h1>
                <Button color="primary" variant="bordered"  startContent={<LuRefreshCw/>}>
                    Refresh
                </Button>
            </nav>
            <Spacer y={4}/>
            <section className={"flex gap-4"}>
                <Table aria-label="Example static collection table" isStriped>
                    <TableHeader>
                        <TableColumn>Id</TableColumn>
                        <TableColumn>Ip</TableColumn>
                        <TableColumn>Last Connexion</TableColumn>
                        <TableColumn>PC name</TableColumn>
                        <TableColumn>OS</TableColumn>
                        <TableColumn>Deployed Payload</TableColumn>
                        <TableColumn>{}</TableColumn>
                    </TableHeader>
                    <TableBody>
                        { rowsData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.ip}</TableCell>
                                <TableCell>{row.lastConnexion}</TableCell>
                                <TableCell>{row.pcName}</TableCell>
                                <TableCell>{row.os}</TableCell>
                                <TableCell>{row.deployedPayload}</TableCell>
                                <TableCell>
                                    <Button
                                        href={`/bots/${row.id}`}
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
            </section>
            <section>

            </section>
        </div>
    )

}
