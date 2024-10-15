import React from 'react'

const InputSelect = ({value, changeValue,options}) => {
  return (
    <select className='form-select text-sm' value={value} onChange={e => changeValue(e.target.value)}>
      {options?.map((el) => (
        <option key={el.toString()} value={el.value}>{ el.text}</option>
      ))}
    </select>
  )
}

export default InputSelect