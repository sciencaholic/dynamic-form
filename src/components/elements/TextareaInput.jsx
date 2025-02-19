import React from 'react'

const TextareaInput = ({ id, value, required, disabled, placeholder, classes, handleInputChange, handleBlur }) => {
  return (
    <textarea
      id={id}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      rows="4"
      className={classes}
      value={value || ""}
      onChange={handleInputChange}
      onBlur={handleBlur}
    />
  )
}

export default TextareaInput