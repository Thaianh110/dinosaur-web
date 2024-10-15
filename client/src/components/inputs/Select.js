import clsx from 'clsx'
import React from 'react'

const Select = ({label,option=[],register,errors,id,validate,style,fullWidth}) => {
  return (
    <div className={clsx('flex w-full',style)}>
      {label && (
        <label className='w-[20%]' htmlFor={id}>
          {label}
        </label>
      )}
      <select className={clsx('form-select', fullWidth && 'w-[130px] rounded-full', style)} id={id} {...register(id, validate)}>
        <option value="">--Chọn--</option>
        {option?.map((el) => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
    </div>
  )
}

export default Select