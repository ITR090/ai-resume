import React from 'react'

function TextArea({onTextAreaChange, className = '', ...props}) {
  return (
    <textarea
          {...props}
          name="jobDescription"
          rows="8"
          className={`textarea w-full rounded-xl px-4 py-3 text-sm leading-relaxed resize-y min-h-40 focus:outline-primary ${className}`}
          onChange={onTextAreaChange}
        ></textarea>
  )
}

export default TextArea
