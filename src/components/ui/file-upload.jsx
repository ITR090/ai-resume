'use client';
import React, { useState } from 'react'
import {useTranslations} from 'next-intl';

function FileUpload({onFileChange, className = '', ...props}) {

  const t = useTranslations('file-upload');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    setFileName(e.target.files?.[0]?.name || '');
    onFileChange?.(e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer.files?.length) return;
    // Same shape as an input change event, so callers can keep reading e.target.files
    handleChange({ target: { files: e.dataTransfer.files } });
  };

  return (
    <label
      {...props}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors focus-within:outline-2 focus-within:outline-primary
        ${isDragging ? 'border-primary bg-primary/10' : fileName ? 'border-success bg-success/5' : 'border-base-content/20 bg-base-100 hover:border-primary hover:bg-primary/5'}
        ${className}`}
    >
      <div className={`mb-4 flex size-14 items-center justify-center rounded-full ${fileName ? 'bg-success/15 text-success' : 'bg-primary/10 text-primary'}`}>
        {fileName ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-7" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm-1.5 12 2.25 2.25 4.5-4.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-7" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
        )}
      </div>

      {fileName ? (
        <>
          <p className="max-w-full truncate font-medium" dir="auto">{fileName}</p>
          <p className="mt-1 text-sm text-base-content/60">{t('replace')}</p>
        </>
      ) : (
        <>
          <p className="font-medium">
            <span className="text-primary">{t('click')}</span> {t('or-drag')}
          </p>
          <p className="mt-1 text-sm text-base-content/60">{t('pdf-only')}</p>
        </>
      )}

      <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={handleChange} />
    </label>
  )
}

export default FileUpload
