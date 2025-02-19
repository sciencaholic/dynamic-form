import React from 'react'

const ColorInput = ({ id, value, required, disabled, handleInputChange, handleBlur }) => {
  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="color"
        value={value || "#000000"}
        onChange={handleInputChange}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        className={`h-10 w-20 p-1 rounded ${disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
      />
      <span className={`text-sm text-gray-600 dark:text-gray-300 ${disabled ? "opacity-75" : ""}`}>
        {value || "#000000"}
      </span>
    </div>
  )
}

export default ColorInput