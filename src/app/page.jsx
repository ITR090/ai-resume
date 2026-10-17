import React from 'react';
import Link from "next/link";
import {useTranslations} from 'next-intl';
// ui components
import Body from "@/components/ui/body";
import Section from "@/components/ui/section";

const featureIcons = [
  // shield-check (ATS friendly)
  "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  // sparkles (AI optimization)
  "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z",
  // document-check (professional results)
  "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12",
];

const stepIcons = [
  // arrow-up-tray (upload)
  "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5",
  // clipboard (paste)
  "M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184",
  // document-check (result)
  "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12",
];

function CheckIcon({ className = "text-success" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`mt-0.5 size-5 shrink-0 ${className}`} aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

export default function Home() {

 const t = useTranslations('HomePage');

  return (
    <Body className="py-0">

      {/* Hero */}
      <section className="relative isolate grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-dots absolute inset-0" />
          <div className="absolute start-1/4 top-1/4 size-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute end-0 bottom-0 size-72 rounded-full bg-secondary/15 blur-3xl" />
        </div>

        <div className="text-center motion-safe:animate-fade-up lg:text-start">
          <span className="badge badge-primary badge-soft mb-6 gap-1 px-3 py-3">
            ✨ {t('badge')}
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t('title-start')}{' '}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">{t('title-highlight')}</span>
          </h1>

          <p className="mx-auto max-w-xl py-6 text-lg text-base-content/70 lg:mx-0">
            {t('hero-description')}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/generate-resume" className="btn btn-primary btn-lg rounded-xl shadow-lg shadow-primary/25">
              {t('get-started')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 rtl:rotate-180" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/cover-letter" className="btn btn-outline btn-lg rounded-xl">
              {t('cover-letter-cta')}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-base-content/70 lg:justify-start">
            {['trust1', 'trust2', 'trust3'].map((key) => (
              <li key={key} className="flex items-center gap-1.5">
                <CheckIcon className="text-primary" /> {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Before / after preview */}
        <div className="relative mx-auto w-full max-w-md motion-safe:animate-fade-up [animation-delay:150ms]">
          <div className="card border border-base-300 bg-base-100 shadow-2xl shadow-primary/10">
            <div className="card-body gap-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">A</div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/5 rounded-full bg-base-content/80" />
                  <div className="h-2 w-3/5 rounded-full bg-base-content/20" />
                </div>
              </div>

              <div className="rounded-xl border border-error/30 bg-error/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-error">{t('preview.before')}</p>
                <p className="text-sm text-base-content/60 line-through decoration-error/40">{t('preview.before-text')}</p>
              </div>

              <div className="rounded-xl border border-success/40 bg-success/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-success">{t('preview.after')}</p>
                <p className="text-sm">{t('preview.after-text')}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-base-content/60">{t('preview.keywords')}</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'REST APIs', 'CI/CD', 'Agile'].map((kw) => (
                    <span key={kw} className="badge badge-primary badge-soft gap-1">✓ {kw}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section className="py-16">
        <SectionHeading eyebrow={t('features.eyebrow')} title={t('features.title')} />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <div key={n} className="card border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <div className="card-body">
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-primary-content shadow-md shadow-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="size-6" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={featureIcons[i]} />
                  </svg>
                </div>
                <h3 className="card-title">
                  {t(`features.feature${n}.title`)}
                </h3>
                <p className="text-base-content/70">
                  {t(`features.feature${n}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="rounded-3xl bg-base-200 px-6 py-16 md:px-12">
        <SectionHeading eyebrow={t('steps.eyebrow')} title={t('steps.title')} />
        <ol className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <li key={n} className="relative flex flex-col items-center text-center">
              {n < 3 && <div aria-hidden className="absolute top-7 hidden h-px w-full translate-x-1/2 bg-base-content/15 md:block rtl:-translate-x-1/2" />}
              <div className="relative mb-4 flex size-14 items-center justify-center rounded-2xl border border-base-300 bg-base-100 text-primary shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="size-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={stepIcons[i]} />
                </svg>
                <span className="badge badge-primary badge-sm absolute -end-2 -top-2">{n}</span>
              </div>
              <h3 className="font-semibold">{t(`steps.step${n}`)}</h3>
              <p className="mt-1 max-w-xs text-sm text-base-content/70">{t(`steps.step${n}-description`)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* pricing */}
      <Section className="py-16">
        <SectionHeading eyebrow={t('pricing.eyebrow')} title={t('pricing.heading')} />
        <div className="flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl bg-linear-to-br from-primary to-secondary p-px shadow-2xl shadow-primary/20">
            <div className="card rounded-[calc(1.5rem-1px)] bg-base-100">
              <div className="card-body items-center p-8 text-center">
                <span className="badge badge-primary badge-soft">{t('pricing.description')}</span>
                <h3 className="mt-3 text-6xl font-extrabold tracking-tight">{t('pricing.title')}</h3>
                <p className="text-base-content/70">{t('pricing.subtitle')}</p>
                <ul className="my-6 w-full space-y-3 text-start">
                  <li className="flex gap-2"><CheckIcon /> {t('pricing.1')}</li>
                  <li className="flex gap-2"><CheckIcon /> {t('pricing.2')}</li>
                  <li className="flex gap-2"><CheckIcon /> {t('pricing.3')}</li>
                </ul>
                <Link href="https://buy.stripe.com/test_5kQaEX7yX3Mp67CdQV6Zy00" className="btn btn-primary btn-lg btn-block rounded-xl">
                  {t('pricing.cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="mx-auto max-w-3xl py-16">
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <details key={n} className="collapse collapse-arrow border border-base-300 bg-base-100" name="faq">
              <summary className="collapse-title font-semibold">{t(`faq.q${n}`)}</summary>
              <div className="collapse-content text-base-content/70">
                <p>{t(`faq.a${n}`)}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="mb-16">
        <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-primary to-secondary px-6 py-14 text-center text-primary-content md:px-12">
          <div aria-hidden className="absolute -end-16 -top-16 -z-10 size-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('cta.title')}</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">{t('cta.description')}</p>
          <Link href="/generate-resume" className="btn btn-lg mt-8 rounded-xl border-0 bg-base-100 text-base-content hover:bg-base-200">
            {t('get-started')}
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
