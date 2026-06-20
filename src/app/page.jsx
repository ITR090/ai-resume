import React from 'react';
import Link from "next/link";
import {useTranslations} from 'next-intl';
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";


export default function Home() {

 const t = useTranslations('HomePage');

  return (
    <Body>
      
      {/* Hero */}
      <div className="hero min-h-[70vh]">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl sm:text-sm font-bold">
             {t('title')}
            </h1>

            <p className="py-6 text-lg opacity-80">
              {t('hero-description')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/generate-resume" className="btn btn-primary btn-lg">
                {t('get-started')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <Section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">
          {t('features.title')}
        </h2>      
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                {t('features.feature1.title')}
              </h2>
              <p>
                {t('features.feature1.description')}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                {t('features.feature2.title')}
              </h2>
              <p>
                {t('features.feature2.description')}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                {t('features.feature3.title')}
              </h2>
              <p>
                {t('features.feature3.description')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-base-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">
            {t('steps.title')}
          </h2>

          <ul className="steps steps-vertical md:steps-horizontal w-full">
            <li className="step step-primary">
              {t('steps.step1')}
            </li>

            <li className="step step-primary">
              {t('steps.step2')}
            </li>

            <li className="step step-primary">
              {t('steps.step3')}
            </li>
          </ul>
        </div>
      </Section>

      {/* pricing */}
      <Section className="flex justify-center align-center text-center">
        <div className="rounded-lg bg-base-200 p-6">
          <h4 className="text-4xl font-bold my-1">{t('pricing.title')}</h4>
          <p className="my-2">{t('pricing.description')}</p>
          <ul className="text-left">
            <li className="mb-2">✅ {t('pricing.1')}</li>
            <li className="mb-2">✅ {t('pricing.2')}</li>
            <li className="mb-2">✅ {t('pricing.3')}</li>
          </ul>
          <Link href="https://buy.stripe.com/test_5kQaEX7yX3Mp67CdQV6Zy00" className="btn btn-primary rounded-xl px-4 py-3">
            {t('pricing.cta')}
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
