import React from 'react'
import clsx from 'clsx'
const InputFields = ({ value, setValue, nameKey, type, invalidFields, placeholder, setInvalidFields, style, fullWidth,isHideLabel }) => {
  return (
    <div className={clsx('flex flex-col relative', fullWidth && 'w-full')}>
      {!isHideLabel && value?.trim() !== '' && (
        <label className="text-[12px] animate-slide-top-sm bg-white absolute top-0 left-[8px] block px-1" htmlFor={nameKey}>
          {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        </label>
      )}
      <input
        type={type || 'text'}
        className={clsx('px-4 py-2 rounded-sm border w-full mt-2 outline-none', style)}
        placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-red-500 text-xs font-main px-2">{invalidFields.find((el) => el.name === nameKey)?.mes}</small>
      )}
    </div>
  )
}

export default InputFields
