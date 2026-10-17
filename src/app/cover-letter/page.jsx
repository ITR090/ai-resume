'use client';
import React from 'react';
import { useState } from "react";
import {useTranslations} from 'next-intl';
// ui components
import Body from '@/components/ui/body';
import Section from '@/components/ui/section';
import Textarea from '@/components/ui/text-area';
import Button from '@/components/ui/button';
import ResultPanel from '@/components/ui/result-panel';
// context
import { useToast } from '@/context/ToastContext';

export default function CoverLetterPage() {

  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("professional");
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { showToast } = useToast()
  const t = useTranslations('cover-letter');
  
  const handleSubmit = async () => {

    try {

      setIsLoading(true);

      if (!jobDescription.trim()) {
        showToast({ message: 'Please enter a job description', type: 'error' });
        throw new Error("Please enter a job description");
      }
      if (!role.trim()) {
        showToast({ message: 'Please enter your desired role', type: 'error' });
        throw new Error("Please enter your desired role");
      }

      if (!tone.trim()) {
        showToast({ message: 'Please select a tone for your cover letter', type: 'error' });
        throw new Error("Please select a tone for your cover letter");
      }

      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription, role, tone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ message: errorData.message || 'Failed to generate cover letter', type: 'error' });
        throw new Error(errorData.message || 'Failed to generate cover letter');
      }

      if (response.ok) {
        const generateResult = await response.json();
        showToast({ message: 'Cover letter generated successfully!', type: 'success' });
        setFeedback(generateResult.coverLetter);
      }

    } catch (error) {
      console.error('Error generating cover letter:', error);
      showToast({ message: error.message || 'An unexpected error occurred while generating your cover letter. Please try again.', type: 'error' });
      setErrorMessage(error.message || 'An unexpected error occurred while generating your cover letter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

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
          <div className="card-body gap-7">
            {/* Role */}
            <label className="flex flex-col gap-2">
              <span className="text-lg font-semibold">{t('role')}</span>
              <input type="text" placeholder={t('role-placeholder')} className="input input-lg w-full rounded-xl text-base focus:outline-primary" value={role} onChange={(e) => setRole(e.target.value)} />
            </label>

            {/* Job Description... */}
            <div>
              <label htmlFor="job-description" className="mb-2 block text-lg font-semibold">{t('job-description')}</label>
              <Textarea id="job-description" onTextAreaChange={(e) => setJobDescription(e.target.value)} placeholder={t('job-description-placeholder')} />
              <div className="mt-2 flex justify-between gap-4 text-sm text-base-content/60">
                <p>{t('job-description-hint')}</p>
                <span className="shrink-0 tabular-nums">{jobDescription.length}</span>
              </div>
            </div>

            {/* Tone */}
            <fieldset>
              <legend className="mb-2 text-lg font-semibold">{t('tone')}</legend>
              <div className="join w-full">
                {['professional', 'confident', 'executive'].map((value) => (
                  <input
                    key={value}
                    type="radio"
                    name="tone"
                    value={value}
                    aria-label={t(`tones.${value}`)}
                    checked={tone === value}
                    onChange={(e) => setTone(e.target.value)}
                    className="btn join-item flex-1"
                  />
                ))}
              </div>
            </fieldset>

            {/* Generate Button */}
            <Button variant="primary"
              className="btn btn-primary btn-lg btn-block rounded-xl shadow-lg shadow-primary/20" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              )}
              {isLoading ? t('generating-cover-letter') : t('start-generate-cover-letter')}
            </Button>
          </div>
        </div>

        {/* {errorMessage && <p className="w-auto mt-4 text-sm">{errorMessage}</p>} */}

        {/* Cover Letter Output */}
        <div className="lg:sticky lg:top-24">
          <ResultPanel title={t('result-title')} content={feedback} helper={t('helper')} isLoading={isLoading} loadingText={t('generating-cover-letter')} />
        </div>
      </div>

    </Body>
  );
}
