import {Bot} from "@/lib/bot.interface";
import {Card, CardBody, Divider} from "@nextui-org/react";

function InfoField({ name, value } : { name: string, value: string | number }) {
    return (
        <div className={"flex justify-between"}>
            <p className={"text-gray-500"}>{name}</p>
            <p className={"text-lg font-semibold"}>{value}</p>
        </div>
    )

}

export default function BotInfo({ bot } : { bot: Bot }) {

    return (
        <Card className={"w-full"}>
            <CardBody>
                <div className={"flex gap-4"}>
                    <div className={"flex flex-col basis-1/3"}>
                        <InfoField name={"Id"} value={bot.id}/>
                        <InfoField name={"Ip"} value={bot.ip}/>
                        <InfoField name={"Last Connexion"} value={new Date(bot.lastSeen).toUTCString()}/>
                    </div>
                    <Divider orientation={"vertical"}/>
                    <div  className={"flex flex-col basis-1/3"}>
                        <InfoField name={"PC name"} value={bot.hostname}/>
                        <InfoField name={"OS"} value={bot.os}/>
                        <InfoField name={"Deployed Payload"} value={bot.deployedPayload}/>
                    </div>
                    <Divider orientation={"vertical"}/>
                    <div  className={"flex flex-col basis-1/3"}>
                        <InfoField name={"Username"} value={"bot.username"}/>
                        <InfoField name={"Password"} value={"bot.password"}/>
                        <InfoField name={"Domain"} value={"bot.domain"}/>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}