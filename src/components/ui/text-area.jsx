import React from 'react'

function TextArea({onTextAreaChange, classname, ...props}) {
  return (
    <textarea
          {...props}
          name="jobDescription"
          rows="5"
          placeholder="Job Description..."
          className="w-full rounded-xl border px-4 py-3 text-sm resize-none"
          onChange={onTextAreaChange}
        ></textarea>
  )
}

export default TextArea
