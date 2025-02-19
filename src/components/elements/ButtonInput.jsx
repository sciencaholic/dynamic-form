import React from 'react'

const ButtonInput = ({ id, type, label, disabled }) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      // from flowbite
      className={`text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none
        ${disabled ? "opacity-75 cursor-not-allowed bg-blue-700" : "hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}`}
    >
      {label}
    </button>
  )
}

export default ButtonInput