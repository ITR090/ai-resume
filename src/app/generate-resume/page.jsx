'use client';
import { useState } from "react";
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";
import FileUpload from "@/utils/file-upload";
import Textarea from "@/utils/text-area";
import Button from "@/components/ui/button";

export default function GenerateResume() {

    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [feedback, setFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("jobDescription", jobDescription);

            // extract text from the uploaded resume and get the job description from the user input.
            const response = await fetch("/api/extract", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            // console.log("Extract API response:", response);
            // console.log("Extract API result:", result); 
            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }
            
            if (response.ok) {
                // api call to genrate resume based on the extracted text and job description.
                const generateResponse = await fetch("/api/generate-resume", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        resume: result.resume,
                        jobDescription: result.jobDescription,
                    }),
                });

                const generateResult = await generateResponse.json();

                if (!generateResponse.ok) {
                    throw new Error(generateResult.message || "Failed to generate resume");
                }

                setFeedback(generateResult.generatedResume);
            }

        } catch (error) {
            setErrorMessage(error.message);
            console.error("Error submitting form:", error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Body classname="w-auto p-8">

            {/*  */}
            <Section className="text-center">
                <h3 className="text-4xl font-extrabold tracking-tight text-stone-800 md:text-4xl">AI <span className="text-blue-600">Resume</span> Enhancer</h3>
                <p className="text-lg text-stone-600">Paste your current resume below and get an improved, professional rewrite.</p>
            </Section>

            {/* Resume Upload */}
            <Section>
                <h5 className='text-xl font-bold text-gray-800 mb-2'>1. Select Resume</h5>
                <FileUpload onFileChange={(e) => setFile(e.target.files[0])} />
            </Section>

            {/* Job Description... */}
            <Section>
                <h5 className="text-xl font-bold text-gray-800 mb-2">2. Job Description</h5>
                <Textarea onTextAreaChange={(e) => setJobDescription(e.target.value)} />
                <p className="text-sm text-gray-500">
                    Works great with content pasted from LinkedIn or other job boards.
                </p>
            </Section>

            {/* Submit Button */}
            <Section className='flex items-center justify-center'>
                <Button onClick={handleSubmit} variant="primary" className={`rounded-xl ${isLoading ? 'bg-blue-300' : 'bg-blue-600'} px-4 py-3 text-sm font-semibold text-white shadow-sm ${isLoading ? 'hover:nono' : 'hover:bg-blue-800'} transition`} disabled={isLoading}>
                    {isLoading ? "Rewriting..." : "Rewrite My Resume"}
                </Button>
            </Section>

            {errorMessage && <p className="w-auto mt-4 text-sm text-red-500">{errorMessage}</p>}

            {/* Resume Output */}
            <Section className="bg-stone-50 border border-stone-200 p-5 rounded-lg shadow-sm whitespace-pre-line min-h-60">
                {feedback ? (
                    <div>
                        <h5 className="text-xl font-bold text-gray-800 mb-2">Your Enhanced Resume:</h5>
                        <p className="text-gray-700">{feedback}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Your enhanced resume will appear here.</p>
                )}
            </Section>
        </Body>
    )
}

