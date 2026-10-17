'use client';
import React, { useState } from 'react'
import {useTranslations} from 'next-intl';
import MarkdownView from './markdown-view';

const PLACEHOLDER = /\[[^\]\n]{1,40}\](?!\()/;

export default function ResultPanel({ title, content, helper, isLoading, loadingText }) {

  const t = useTranslations('result');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const hasContent = Boolean(content) && !isLoading;

  return (
    <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/60 px-5 py-3">
        <h2 className="flex items-center gap-2 font-semibold">
          <span className={`size-2 rounded-full ${hasContent ? 'bg-success' : isLoading ? 'animate-pulse bg-warning' : 'bg-base-content/25'}`} aria-hidden="true" />
          {title}
        </h2>
        <div className="flex gap-1">
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleCopy} disabled={!hasContent}>
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-success" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
            )}
            {copied ? t('copied') : t('copy')}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.print()} disabled={!hasContent}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {t('save-pdf')}
          </button>
        </div>
      </div>

      {hasContent && PLACEHOLDER.test(content) && (
        <div className="flex items-start gap-2 border-b border-base-300 bg-warning/10 px-5 py-2 text-sm">
          <mark className="mt-0.5 rounded bg-warning/25 px-1 text-inherit">[ ]</mark>
          <span>{t('placeholders-hint')}</span>
        </div>
      )}

      <div className="min-h-72 p-6" aria-live="polite" aria-busy={isLoading}>
        {isLoading ? (
          <div>
            <p className="mb-5 flex items-center gap-2 text-sm text-base-content/70">
              <span className="loading loading-dots loading-sm text-primary" />
              {loadingText}
            </p>
            <div className="space-y-3">
              <div className="skeleton h-6 w-1/2" />
              <div className="skeleton h-4 w-1/3" />
              <div className="skeleton mt-6 h-4 w-1/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton mt-6 h-4 w-1/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
            </div>
          </div>
        ) : content ? (
          <div className="print-area text-base-content">
            <MarkdownView content={content} />
          </div>
        ) : (
          <div className="flex min-h-60 flex-col items-center justify-center text-center text-base-content/50">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor" className="size-8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <p className="max-w-xs">{helper}</p>
          </div>
        )}
      </div>
    </div>
  )
}
