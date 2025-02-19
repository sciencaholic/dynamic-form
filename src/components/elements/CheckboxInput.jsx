import React from 'react'

const CheckboxInput = ({ id, value, label, required, disabled, handleInputChange, handleBlur }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={!!value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        // from flowbite
        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
          ${disabled ? "cursor-not-allowed" : ""}`}
      />
      <label
        htmlFor={id}
        className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${disabled ? "cursor-not-allowed" : ""}`}
      >
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  )
}

export default CheckboxInput