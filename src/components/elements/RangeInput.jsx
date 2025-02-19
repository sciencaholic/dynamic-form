import React from 'react'

const RangeInput = ({ id, required, disabled, value, validation, handleInputChange, handleBlur }) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <input
          id={id}
          type="range"
          min={validation?.min || 0}
          max={validation?.max || 100}
          value={value || validation?.min || 0}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          // from flowbite
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700 ${disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
        />
        <span className={`text-sm text-gray-600 dark:text-gray-300 min-w-[2rem] ${disabled ? "opacity-75" : ""}`}>
          {value || validation?.min || 0}
        </span>
      </div>
      <div className={`flex justify-between text-xs text-gray-500 ${disabled ? "opacity-75" : ""}`}>
        <span>{validation?.min || 0}</span>
        <span>{validation?.max || 100}</span>
      </div>
    </div>
  )
}

export default RangeInput