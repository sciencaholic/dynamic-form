import React from 'react'

const FileInput = ({ id, required, disabled, handleFileChange, handleBlur }) => {
  return (
    <input
      id={id}
      type="file"
      onChange={handleFileChange}
      onBlur={handleBlur}
      required={required}
      disabled={disabled}
      // from flowbite
      className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
        ${disabled ? "opacity-75 cursor-not-allowed" : ""}`}
    />
  )
}

export default FileInput