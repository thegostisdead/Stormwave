"use client"
import {Card, CardBody, CardHeader, Divider, Spacer} from "@nextui-org/react";
import React from 'react';

import "chart.js/auto";
import {Bar} from 'react-chartjs-2';



const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

export default function Dashboard() {
    return (
        <div>
            <h1 className={"block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"}>Dashboard</h1>
            <Spacer y={4}/>
            <section className={"flex gap-8"}>
                <Card className={"ma-4 w-1/4"}>
                    <CardHeader>
                        Active Agents
                    </CardHeader>
                    <Divider/>
                    <CardBody className={"flex justify-end"}>
                        <h1 className={"text-center text-5xl font-medium leading-tight text-primary"}>20</h1>
                    </CardBody>
                </Card>
                <Card className={"ma-4 w-1/4"}>
                    <CardHeader>
                        Keystrokes
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <h1 className={"text-center text-5xl font-medium leading-tight text-primary"}>9</h1>
                    </CardBody>
                </Card>
                <Card className={"ma-4 w-1/4"}>
                    <CardHeader>
                        Passwords
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <h1 className={"text-center text-5xl font-medium leading-tight text-primary"}>20</h1>
                    </CardBody>
                </Card>
                <Card className={"ma-4 w-1/4"}>
                    <CardHeader>
                        Screenshots
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <h1 className={"text-center text-5xl font-medium leading-tight text-primary"}>20</h1>
                    </CardBody>
                </Card>

            </section>
            <Spacer y={4}/>
            <section className={""}>
                <Bar data={data} height={400} options={{maintainAspectRatio: false}}/>
            </section>
        </div>
    )

}
