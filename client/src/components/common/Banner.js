import React from 'react'
import banner from 'assets/museum.jpg'
import { Tilt } from 'react-tilt'
const Banner = () => {
  return (
    <Tilt>
      <div className="w-full h-full">
        <img src={banner} alt="anh banner" className="w-full h-full object-cover" />
      </div>
    </Tilt>
  )
}

export default Banner
