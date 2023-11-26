import { NextResponse } from 'next/server';

export async function GET() {
    const backendUrl = process.env.BACKEND_URL;
    const res = await fetch(backendUrl + "/bots", {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    console.log(data)
    return NextResponse.json(data);
}


