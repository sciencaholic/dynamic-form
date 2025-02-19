import React from 'react'

const BasicInput = ({ id, type, value, required, disabled, placeholder, validation, classes, handleInputChange, handleBlur }) => {
  return (
    <input
      id={id}
      type={type}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      className={classes}
      min={validation?.min}
      max={validation?.max}
      pattern={validation?.pattern}
    />
  )
}

export default BasicInput