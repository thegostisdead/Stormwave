'use server';
import { writeFile } from 'node:fs/promises';
export async function setCurrentCommand(payload: string) {
    try {
        await writeFile('current.json', payload, 'utf-8');

    }
    catch (err) {
        console.error(err);
    }
}
