import React, { memo } from 'react'

const Countdown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[60px] border flex items-center justify-center bg-main rounded-sm flex-col">
      <span className="text-[18px] text-text1">{number}</span>
      <span className="text-xs text-text2">{unit}</span>
    </div>
  )
}

export default memo(Countdown)
