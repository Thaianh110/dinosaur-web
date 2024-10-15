import React from 'react'
import { Tilt } from 'react-tilt'

const AnimalCard = ({ common_name, weight, height, image, description }) => {
  return (
    <Tilt>
      <div className="w-full max-w-[500px] bg-[rgba(17,25,40,0.83)] border border-[rgba(255,255,255,0.125)] shadow-[0px_4px_24px_rgba(23,92,230,0.15)] rounded-[16px] p-[18px_36px]">
        <span className="text-text2">Một số khủng long tiêu biểu</span>
        <div className="w-full">
          <div className="text-[28px] font-semibold text-center text-text1 mb-5">{common_name}</div>
          <img src={image} alt="animal" className="w-[250px] object-contain p-4" />
          <div className="flex flex-col text-2 ">
            <div>{weight}</div>
            <div>{height}</div>
            <div className="flex h-4">{description}</div>
          </div>
        </div>
      </div>
    </Tilt>
  )
}

export default AnimalCard
