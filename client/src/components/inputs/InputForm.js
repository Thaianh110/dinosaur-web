import clsx from 'clsx'
import React from 'react'

const InputForm = ({ label,readOnly, disabled,defaultValue, register, errors, id, validate, type = 'text', placeholder, fullWidth, style}) => {
  return (
    <div className={clsx('w-full flex h-[48px]', style)}>
      {label && (
        <label className="w-[20%] font-medium"htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx('form-input', fullWidth && 'w-[80%]')}
        readOnly={readOnly}
      />

      {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
    </div>
  )
}

export default InputForm
