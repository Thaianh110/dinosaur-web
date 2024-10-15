import React,{useEffect, useRef} from 'react'
import { AiFillStar } from 'react-icons/ai'

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
    const percentRef = useRef()
  useEffect(() => {
      const percent = Math.round((ratingCount * 100) / ratingTotal) || 0
        percentRef.current.style.cssText = `right: ${100 - percent}%`
        
    },[ratingCount,ratingTotal])
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex w-[10%] justify-center items-center gap-2 text-sm">
        <span>{number}</span>
        <AiFillStar color="red" />
      </div>
      <div className="w-[75%]">
        <div className="relative w-full h-[6px] rounded-md bg-gray-300">
          <div ref={percentRef} className="absolute inset-0 bg-red-600 rounded-md"></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end">{`${ratingCount || 0} reviewer`}</div>
    </div>
  )
}

export default VoteBar
