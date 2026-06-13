'use client';
export default function FileUpload({onFileChange}) {

  return (
    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className="w-12 h-12 mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16V4m0 0l-4 4m4-4l4 4M4 16.5A2.5 2.5 0 006.5 19h11a2.5 2.5 0 002.5-2.5v-1A2.5 2.5 0 0017.5 13H17a4 4 0 10-8 0h-.5A2.5 2.5 0 006 15.5v1z"
          />
        </svg>

        <p className="text-xs text-gray-400">
          PDF
        </p>
      </div>

      <input type="file" className="hidden" onChange={onFileChange} />
    </label>
  );

}