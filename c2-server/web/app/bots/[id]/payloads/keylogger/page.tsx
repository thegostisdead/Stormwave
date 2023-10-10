"use client"
import {Button} from "@nextui-org/button";
import {Card, CardBody, Spacer} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";


export default function Keylogger() {
    return (
        <div>
            <div className={"flex justify-between"}>
                <div className={"flex gap-4"}>
                    <Button color={"primary"}>Get Keyboard</Button>
                    <Button color={"danger"}>Uninstall</Button>
                    <Button color={"secondary"}>Interval</Button>
                </div>
                <Button color={"primary"} variant={"bordered"}>Download</Button>
            </div>
            <Spacer y={4}/>
            <Card className={"w-full"}>
                <CardBody>
                    <Textarea
                        label="Keystrokes"
                        labelPlacement="outside"
                        placeholder="ENTER;AaASFSFSFdsfsdfdsf"
                        className="w-full"
                    />
                </CardBody>
            </Card>
        </div>
    )
}
