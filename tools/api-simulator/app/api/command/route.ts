import { readFile } from 'node:fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
    const file = await readFile('current.json', 'utf-8');
    return NextResponse.json(JSON.parse(file));
}