"use client"
import {useSession} from "next-auth/react";
import React from "react";
import {Card, CardBody, CardHeader, Spacer, Image} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {PiPencilSimpleLineBold} from "react-icons/pi";

export default function ProfilePage() {

    const {data: session} = useSession();
    console.log("session", session)

    return (
        <div className={"flex gap-4 flex-wrap w-5/6"}>
            <div className={"flex basis-full justify-center "}>
                <h1>Profile</h1>
            </div>
            <div className={"flex basis-full justify-center "}>
                <Card className={"w-4/6 p-4"}>
                    <CardHeader>
                        <div>
                            <Image
                                src={"https://thispersondoesnotexist.com"}
                                width={100}
                                height={100}
                                radius={"full"}
                                isZoomed={true}
                                alt="NextUI hero Image with delay"
                            />
                        </div>
                        <Spacer x={8}/>
                        <div className={"flex flex-col"}>
                            <Button>Upload new photo</Button>
                            <p>Photo must be in format 800x800</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Card>
                            <CardHeader>
                                <div className={"flex justify-between basis-full"}>
                                    <h3>Personal Info</h3>
                                    <Button variant="bordered" startContent={<PiPencilSimpleLineBold/>} >Edit</Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className={"flex flex-col"}>
                                    <label htmlFor={"name"}>Name</label>
                                    <input type={"text"} id={"name"} />
                                </div>
                                <div className={"flex flex-col"}>
                                    <label htmlFor={"email"}>Email</label>
                                    <input type={"text"} id={"email"} />
                                </div>
                            </CardBody>
                            <CardBody>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>

            </div>
        </div>
    );
}