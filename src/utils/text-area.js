import React from 'react'

function Textarea({onTextAreaChange}) {
  return (
    <textarea
          name="jobDescription"
          rows="5"
          placeholder="Job Description..."
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
          onChange={onTextAreaChange}
        ></textarea>
  )
}

export default Textarea
