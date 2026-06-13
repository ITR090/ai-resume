import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();


export async function POST(request) {

    try {

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Please try again.' }, 
            { status: 500 });
    }   
}