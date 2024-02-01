"use client";

import {useEffect, useState} from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);
  async function getBots() {
    const url = "http://10.0.0.24:3000/backend/bots";
    setLoading(true)
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setBots(data);
    setLoading(false)
  }

  useEffect(() => {
    getBots();
  }, []);

  return (
    <main className="flex flex-wrap p-24 bg-gray-400">

      <h1>Bots</h1>

      <div className={"flex basis-full justify-end"}>
          <Button colorScheme='blue' onClick={getBots} isLoading={loading} >refresh bots</Button>
      </div>

        {loading ? (
                <Skeleton>
                    <Card >
                        <CardBody>
                            Id :
                        </CardBody>
                    </Card>
                </Skeleton>
            ) : (
            <div className={"flex basis-full"}>
                {bots.map((bot: any) => (
                    <Card key={bot.id}>
                        <CardBody>
                            Id : {bot.id}
                        </CardBody>
                        <CardFooter>
                            <Button colorScheme='blue' onClick={() => router.push("/bots/" + bot.id )}>See more</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}


    </main>
  )
}
