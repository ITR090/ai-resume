import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const googleai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
import { getUserIP } from '@/components/utils/get-user-ip';
import { ratelimit } from '@/components/utils/limiter';
import { setIP } from '@/components/utils/limiter';

export async function POST(request) {
    try {
        const userIP = await getUserIP();
        
        const { success } = await ratelimit.limit(userIP);
        // console.log(`Rate limit check for IP ${userIP}: ${success ? 'allowed' : 'blocked'}`);
        
        if (!success) { 
            await setIP(userIP);
            return NextResponse.json(
                { message: 'You have reached the limit of cover letter generations allowed per day. Please try again later.' },
                { status: 429 }
            );
        }
        const { jobDescription, role, tone } = await request.json();

        if (!jobDescription || !role || !tone) {
            return NextResponse.json(
                { message: 'Please provide job description, role, and tone for cover letter generation.' },
                { status: 400 }
            );
        }

        const system_instructions = `
            You are an expert cover letter writer, write a cover letter of the provided role based on the provided job description. 
            Use provided tone in the cover letter. 
            Keep the cover letter concise, impactful, and tailored to the job description.
            Keep it under 250 words.
            `

        const input = `Find below the job description, role, and tone for the cover letter generation:
            Job Description: ${jobDescription}
            Role: ${role}
            Tone: ${tone}
        `    
        const interaction = await googleai.interactions.create({
            model: "gemini-3.5-flash",
            input: input,
            system_instruction: system_instructions,
        });
        
        // console.log('Received data for cover letter generation:', { jobDescription, role, tone });
        // console.log('Generated cover letter:', interaction);
        
        return NextResponse.json(
            { coverLetter: interaction.output_text }, 
            { status: 200 }
        );

    } catch (error) {
        // console.error('Error generating cover letter:', error);
        return NextResponse.json(
            { message: 'Sorry, there was an error generating your cover letter. Please try again.' },
            { status: 500 }
        );
    }
}
