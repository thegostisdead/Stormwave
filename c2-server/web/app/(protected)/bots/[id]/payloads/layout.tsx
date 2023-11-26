"use client"
import {Spacer} from "@nextui-org/react";
import {Button} from "@nextui-org/button";


export default function Layout({ children } : { children: React.ReactNode }) {
    return (

        <div>
            <div className={"flex justify-between"}>
                <div className={"flex flex-nowrap"}>
                    <h1 className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Bots</h1>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>/</span>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>1</span>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>/</span>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>payloads</span>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>/</span>
                    <Spacer y={2}/>
                    <span className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>nmap</span>
                </div>
                <div className={"flex"}>
                    <Button color="primary" variant="bordered">Shell</Button>
                    <Spacer x={2}/>
                    <Button color="primary" variant="bordered">Refresh</Button>
                </div>
            </div>
            <main>{children}</main>
        </div>

    )
}
