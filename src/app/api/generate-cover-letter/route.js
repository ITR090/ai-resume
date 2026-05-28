import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const googleai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
    try {
        const { jobDescription, role, tone } = await request.json();

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
        
        console.log('Received data for cover letter generation:', { jobDescription, role, tone });
        console.log('Generated cover letter:', interaction);
        
        return NextResponse.json(
            { coverLetter: interaction.output_text }, 
            { status: 200 }
        );

    } catch (error) {
        console.error('Error generating cover letter:', error);
        return NextResponse.json(
            { message: 'Sorry, there was an error generating your cover letter. Please try again.' },
            { status: 500 }
        );
    }
}
