import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../../components'
import StarCanvas from '../../ultils/canvas/Star'
const Public = () => {
  return (
    <div className="bg-main overflow-x-hidden relative ">
      {/* <StarCanvas /> */}
      <Header />
      <div className="w-full flex justify-center items-center relative z-[1] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default memo(Public)
