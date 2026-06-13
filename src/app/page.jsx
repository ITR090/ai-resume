import React from 'react';
import Link from "next/link";
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";


export default function Home() {

 
  return (
    <Body>
      
      {/* Hero */}
      <div className="hero min-h-[70vh]">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl sm:text-sm font-bold">
              Optimize Your Resume with AI
            </h1>

            <p className="py-6 text-lg opacity-80">
              Upload your resume and paste a job
              description. Our AI will tailor your
              resume to improve ATS compatibility
              and increase interview chances.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn btn-primary btn-lg">
                Upload Resume
              </button>

              <button className="btn btn-outline btn-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <Section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                ATS Friendly
              </h2>
              <p>
                Improve compatibility with modern
                applicant tracking systems.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                AI Optimization
              </h2>
              <p>
                Match keywords and skills directly
                to the job description.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                Professional Results
              </h2>
              <p>
                Get cleaner and more impactful
                resume content.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-base-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">
            How It Works
          </h2>

          <ul className="steps steps-vertical md:steps-horizontal w-full">
            <li className="step step-primary">
              Upload Resume
            </li>

            <li className="step step-primary">
              Paste Job Description
            </li>

            <li className="step step-primary">
              Get Optimized Resume
            </li>
          </ul>
        </div>
      </Section>

      {/* pricing */}
      <Section className="flex justify-center align-center text-center">
        <div className="rounded-lg bg-base-200 p-6">
          <h4 className="text-4xl font-bold my-1">$5</h4>
          <p className="my-2">Lifetime unlock</p>
          <ul className="text-left">
            <li className="mb-2">✅ Resume-based personalization</li>
            <li className="mb-2">✅ Unlimited cover letters</li>
            <li className="mb-2">✅ You can cancel at any time no questions asked</li>
          </ul>
          <Link href="https://buy.stripe.com/test_5kQaEX7yX3Mp67CdQV6Zy00" className="btn btn-primary rounded-xl px-4 py-3">
            Get Started for $5
          </Link>
        </div>
      </Section>


      {/* contact us */}
      {/* <Section className="text-center mt-10">
        <h4 className="text-2xl font-bold mb-2">Have questions or want to learn more?</h4>
        <p className="mb-4">Feel free to reach out to us at <a href="mailto:info@airesume.com" className="text-blue-600 hover:underline">info@airesume.com</a></p>
      </Section> */}
      
    </Body>
  );
}
