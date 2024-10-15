import React from 'react'

const ProductExtraInfo = ({ icon, title, sub }) => {
  return (
    <div className="flex items-center p-3  gap-4 mb-[10px] border">
      <span className="p-2 bg-gray-500 rounded-full flex items-center justify-center text-white">{icon}</span>
      <div className="flex flex-col text-sm ">
        <span className="font-medium">{title}</span>
        <span>{sub}</span>
      </div>
    </div>
  )
}

export default ProductExtraInfo
