import { NextResponse } from 'next/server';
import PDFParser from 'pdf2json';

export async function POST(request) {

    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const jobDescription = formData.get("jobDescription");

        if (!file) {
            return NextResponse.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        if (!jobDescription) {
            return NextResponse.json(
                { message: "No job description provided" },
                { status: 400 }
            );
        }

        if (!['application/pdf'].includes(file.type)) {
            return NextResponse.json(
                { message: "Invalid file type. Only PDF allowed" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const pdfParser = new PDFParser();

        const text = await new Promise((resolve, reject) => {

            pdfParser.on('pdfParser_dataError', (errData) => {
                reject(errData.parserError);
            });

            pdfParser.on('pdfParser_dataReady', (pdfData) => {

                let extractedText = '';

                for (const page of pdfData.Pages) {
                    for (const text of page.Texts) {
                        for (const run of text.R) {
                            extractedText += decodeURIComponent(run.T) + ' ';
                        }
                    }

                    extractedText += '\n';
                }

                resolve(extractedText);
            });

            pdfParser.parseBuffer(buffer);
        });

        return NextResponse.json(
            {
                "message": "Data received successfully",
                "resume": text,
                "jobDescription": jobDescription,
                "status": 200
            },
        );

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { message: "Error processing request" },
            { error: error },
            { status: 500 }
        );
    }
}