import React from 'react'

const RadioInput = ({ id, options, value, required, disabled, handleInputChange, handleBlur }) => {
  return (
    <div className={`space-y-2 ${disabled ? "opacity-75" : ""}`}>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            id={`${id}-${index}`}
            name={id}
            value={option}
            checked={value === option}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            // from flowbite
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600
              ${disabled ? "cursor-not-allowed" : ""}`}
          />
          <label
            htmlFor={`${id}-${index}`}
            className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${disabled ? "cursor-not-allowed" : ""}`}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}

export default RadioInput