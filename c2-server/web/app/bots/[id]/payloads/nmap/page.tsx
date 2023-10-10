"use client";

import {Divider, Spacer} from "@nextui-org/react";
// @ts-ignore
import Graph from "react-vis-network-graph";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useState} from "react";

export default function Nmap() {
    const [loading, setLoading] = useState(false);
    const graph = {
        nodes: [
            { id: 1, label: "source", title: "Bot1" },
            { id: 2, label: "192.168.1.9", title: "Windows 10 pro" },
            { id: 3, label: "192.168.1.9", title: "Windows 10 pro" },

        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
        ]
    };

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "red"
        },
        height: "500px"
    };

    const events = {
        select: function (event: any) {
            var { nodes, edges } = event;
            console.log(edges);
            console.log(nodes);
        }
    };

    return (
        <div>
            <h1 className={"font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Nmap</h1>

            <Spacer y={2} />

            <section>
                <h2 className={"text-lg text-default-600"}>Network Scan</h2>
                <div className={"flex gap-2"}>
                    <Button color="primary" isLoading={loading}>Fast Scan</Button>
                    <Button color="secondary" isLoading={loading}>Full Scan</Button>
                    <Button color="secondary" isLoading={loading}>Custom Scan</Button>
                </div>
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                    getNetwork={(network: any) => {
                        //  if you want access to vis.js network api you can set the state in a parent component using this property
                    }}
                />
            </section>
            <Spacer y={2} />
            <Divider />
            <Spacer y={2} />
            <section>
                <h2 className={"text-lg text-default-600"}>Port Scan</h2>
               <div className={"flex w-full"}>
                   <Input type="text" label="Target" placeholder="Enter target ip" />
                   <Spacer x={4} />
                   <Button color="primary" isLoading={loading}>Scan</Button>
               </div>
            </section>


        </div>
    )
}
