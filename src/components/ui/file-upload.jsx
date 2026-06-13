'use client';
import React from 'react'
import Image from "next/image";
// icon
import fileicon from '../../../public/file.svg';

function FileUpload({onFileChange, classname, ...props}) {
  return (
    <label {...props} className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
       
        <Image src={fileicon} alt="Upload Icon" width={48} height={48} className="mb-4" />
        
        <p className="text-sm">
          PDF only
        </p>
        
      </div>

      <input type="file" className="hidden" onChange={onFileChange} />
    </label>
  )
}

export default FileUpload
