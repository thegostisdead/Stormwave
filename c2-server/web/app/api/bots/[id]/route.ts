import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    const id = request.url.split('/').slice(-1)[0]
    console.log(id)

    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(backendUrl + "/bots/" + id, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    console.log(data)
    return NextResponse.json(data);
}