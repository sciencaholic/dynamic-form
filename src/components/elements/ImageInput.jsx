import React from 'react'

const ImageInput = ({ id, required, disabled, src, alt }) => {
  return (
    <input
      id={id}
      type="image"
      src={src}
      alt={alt}
      required={required}
      disabled={disabled}
      className={`cursor-pointer hover:opacity-80 transition-opacity ${disabled ? "opacity-75 cursor-not-allowed" : ""}`}
    />
  )
}

export default ImageInput