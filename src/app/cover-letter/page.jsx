'use client';
import React from 'react';
import { useState } from "react";
// ui components
import Body from '@/components/ui/body';
import Section from '@/components/ui/section';
import Textarea from '@/components/ui/text-area';
import Button from '@/components/ui/button';

export default function CoverLetterPage() {

  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("professional");
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async () => {

    try {

      setIsLoading(true);

      if (!jobDescription.trim()) {
        throw new Error("Please enter a job description");
      }
      if (!role.trim()) {
        throw new Error("Please enter your desired role");
      }

      if (!tone.trim()) {
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
        throw new Error(errorData.message || 'Failed to generate cover letter');
      }

      if (response.ok) {
        const generateResult = await response.json();
        setFeedback(generateResult.coverLetter);
      }

    } catch (error) {
      console.error('Error generating cover letter:', error);
      setErrorMessage(error.message || 'An unexpected error occurred while generating your cover letter. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Body>

      <Section className="text-center">
        <h3 className="text-4xl font-extrabold tracking-tight md:text-4xl">AI <span className='text-primary'>Cover Letter</span> Generator</h3>
        <p className="text-lg">Instantly generate tailored cover letters from any job description.</p>
      </Section>

      {/* Job Description... */}
      <Section>
        <h5 className="text-xl font-bold mb-2">Job Description</h5>
        <Textarea onTextAreaChange={(e) => setJobDescription(e.target.value)} />
        <p className="text-sm text-gray-500">
          Works great with content pasted from LinkedIn or other job boards.
        </p>
      </Section>

      {/* Role */}
      <Section className="text-sm text-gray-500 mb-4 flex flex-row gap-4">
        <input type="text" placeholder="Desired Role (e.g., Software Engineer, Product Manager)" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={role} onChange={(e) => setRole(e.target.value)} />
        <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="professional">Professional</option>
          <option value="confident">Confident</option>
          <option value="executive">Executive</option>
        </select>
      </Section>
      
      {/* Generate Button */}
      <Section className='flex items-center justify-center'>
        <Button variant="primary" 
          className={`btn btn-primary rounded-xl px-4 py-3 text-sm`} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Cover Letter'}
        </Button>
      </Section>
      
      {errorMessage && <p className="w-auto mt-4 text-sm">{errorMessage}</p>}
      
      {/* Cover Letter Output */}
      <Section className="bg-base-200 p-5 rounded-lg shadow-sm whitespace-pre-line min-h-60">
        {feedback ? (
          <div>
            <p className="text-base-content">{feedback}</p>
          </div>
        ) : (
          <p className="text-base-content">Your enhanced cover letter will appear here.</p>
        )}
      </Section>

    </Body>
  );
}
