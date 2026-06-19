'use client';
import { useState } from "react";
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";
import FileUpload from "@/components/ui/file-upload";
import Textarea from "@/components/ui/text-area";
import Button from "@/components/ui/button";
// context
import { useToast } from '@/context/ToastContext';


export default function GenerateResume() {

    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [feedback, setFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast()

    const handleSubmit = async () => {

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("jobDescription", jobDescription);
            
            if (!file) {
                showToast({ message: 'Please upload a resume', type: 'error' });
                throw new Error("Please upload a resume");
            }

            if (!jobDescription.trim()) {
                showToast({ message: 'Please enter a job description', type: 'error' });
                throw new Error("Please enter a job description");
            }
            // extract text from the uploaded resume and get the job description from the user input.
            const response = await fetch("/api/extract", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (!response.ok) {
                showToast({ message: result.message || 'Failed to extract resume content', type: 'error' });
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
                    showToast({ message: generateResult.message || 'Failed to generate resume', type: 'error' });
                    throw new Error(generateResult.message || "Failed to generate resume");
                }

                showToast({ message: 'Resume generated successfully!', type: 'success' });
                setFeedback(generateResult.generatedResume);
            }

        } catch (error) {
            showToast({ message: error.message || 'An unexpected error occurred while generating your resume. Please try again.', type: 'error' });
            setErrorMessage(error.message);
            console.error("Error submitting form:", error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Body>

            {/*  */}
            <Section className="text-center">
                <h3 className="text-4xl font-extrabold tracking-tight md:text-4xl">AI <span className="text-primary">Resume</span> Enhancer</h3>
                <p className="text-lg">Paste your current resume below and get an improved, professional rewrite.</p>
            </Section>

            {/* Resume Upload */}
            <Section>
                <h5 className='text-xl font-bold mb-2'>1. Select Resume</h5>
                <FileUpload onFileChange={(e) => setFile(e.target.files[0])} />
            </Section>

            {/* Job Description... */}
            <Section>
                <h5 className="text-xl font-bold mb-2">2. Job Description</h5>
                <Textarea onTextAreaChange={(e) => setJobDescription(e.target.value)} />
                <p className="text-sm">
                    Works great with content pasted from LinkedIn or other job boards.
                </p>
            </Section>

            {/* Submit Button */}
            <Section className='flex items-center justify-center'>
                <Button onClick={handleSubmit} variant="primary" 
                className={`btn btn-primary rounded-xl px-4 py-3`} disabled={isLoading}>
                    {isLoading ? "Rewriting..." : "Rewrite My Resume"}
                </Button>
            </Section>

            {errorMessage && <p className="w-auto mt-4 text-sm">{errorMessage}</p>}

            {/* Resume Output */}
            <Section className="bg-base-200 p-5 rounded-lg shadow-sm whitespace-pre-line min-h-60">
                {feedback ? (
                    <div>
                        <p className="text-base-content">{feedback}</p>
                    </div>
                ) : (
                    <p className="text-base-content">Your enhanced resume will appear here.</p>
                )}
            </Section>
        </Body>
    )
}

