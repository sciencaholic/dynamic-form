import React from 'react'

const SelectDropdownInput = ({ id, options, value, required, disabled, placeholder, classes, handleInputChange, handleBlur }) => {
  return (
    <select
      id={id}
      required={required}
      disabled={disabled}
      value={value || ""}
      onChange={handleInputChange}
      onBlur={handleBlur}
      className={classes}
    >
      <option value="">{placeholder || "Select an option"}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectDropdownInput