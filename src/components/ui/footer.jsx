import React from 'react'
import Link from 'next/link';
import {useTranslations} from 'next-intl';

export default function Footer() {

  const t = useTranslations('nav');

  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p className="text-base-content/70">
          © {new Date().getFullYear()} ResumeAI. {t('rights')}
        </p>
        <nav className="flex gap-6">
          <Link href="/generate-resume" className="link link-hover">{t('generate-resume')}</Link>
          <Link href="/cover-letter" className="link link-hover">{t('cover-letter')}</Link>
        </nav>
      </div>
    </footer>
  )
}
