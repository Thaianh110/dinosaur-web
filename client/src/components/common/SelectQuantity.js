import React, { memo } from 'react'

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center">
      <div onClick={() => handleChangeQuantity('tru')} className="text-[24px] cursor-pointer p-2 border-r-2 border-black">
        -
      </div>
      <input className="py-2 text-center outline-none w-[40px]" type="text" value={quantity} onChange={(e) => handleQuantity(e.target.value)} />
      <div onClick={() => handleChangeQuantity('cong')} className="text-[24px] cursor-pointer p-2 border-l-2 border-black">
        +
      </div>
    </div>
  )
}

export default memo(SelectQuantity)
