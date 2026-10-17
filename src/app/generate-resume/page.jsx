'use client';
import { useState } from "react";
import {useTranslations} from 'next-intl';
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";
import FileUpload from "@/components/ui/file-upload";
import Textarea from "@/components/ui/text-area";
import Button from "@/components/ui/button";
import ResultPanel from "@/components/ui/result-panel";
// context
import { useToast } from '@/context/ToastContext';


export default function GenerateResume() {

    const t = useTranslations('generate-resume');
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

            {/* Header */}
            <Section className="relative isolate mt-0 text-center">
                <div aria-hidden className="bg-dots absolute inset-x-0 -top-10 -z-10 h-56" />
                <span className="badge badge-primary badge-soft mb-4">{t('badge')}</span>
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t('title')}</h1>
                <p className="mx-auto mt-3 max-w-2xl text-lg text-base-content/70">{t('description')}</p>
            </Section>

            <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
                <div className="card border border-base-300 bg-base-100 shadow-sm">
                    <div className="card-body gap-8">
                        {/* Resume Upload */}
                        <div>
                            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                                <span className={`badge badge-sm ${file ? 'badge-success' : 'badge-primary'}`}>{file ? '✓' : '1'}</span>
                                {t('resume-upload')}
                            </h2>
                            <FileUpload onFileChange={(e) => setFile(e.target.files[0])} />
                        </div>

                        {/* Job Description... */}
                        <div>
                            <label htmlFor="job-description" className="mb-3 flex items-center gap-2 text-lg font-semibold">
                                <span className={`badge badge-sm ${jobDescription.trim() ? 'badge-success' : 'badge-primary'}`}>{jobDescription.trim() ? '✓' : '2'}</span>
                                {t('job-description')}
                            </label>
                            <Textarea id="job-description" onTextAreaChange={(e) => setJobDescription(e.target.value)} placeholder={t('job-description-placeholder')} />
                            <div className="mt-2 flex justify-between gap-4 text-sm text-base-content/60">
                                <p>{t('job-description-hint')}</p>
                                <span className="shrink-0 tabular-nums">{jobDescription.length}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} variant="primary"
                        className="btn btn-primary btn-lg btn-block rounded-xl shadow-lg shadow-primary/20" disabled={isLoading}>
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                                </svg>
                            )}
                            {isLoading ? t('rewriting') : t('start-rewrite')}
                        </Button>
                    </div>
                </div>

                {/* {errorMessage && <p className="w-auto mt-4 text-sm">{errorMessage}</p>} */}

                {/* Resume Output */}
                <div className="lg:sticky lg:top-24">
                    <ResultPanel title={t('result-title')} content={feedback} helper={t('helper')} isLoading={isLoading} loadingText={t('rewriting')} />
                </div>
            </div>
        </Body>
    )
}

