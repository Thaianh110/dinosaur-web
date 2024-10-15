import React from 'react'
import { Navigate, Outlet } from 'react-router-dom' 
import path from 'ultils/path'
import { useSelector } from 'react-redux'
import { MemberSideBar } from 'components'
const MemberLayout = () => {

    const { isLoggedIn, current } = useSelector(state => state.user)
    if(!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />

  return (
    <div className="flex w-full min-h-screen relative">
      <div className="w-[300px] top-0 bottom-0 flex-none fixed">
        <MemberSideBar />
      </div>
      <div className="w-[300px]"></div>
      <div className="flex-auto text-sm bg-gray-300">
        <Outlet />
      </div>
    </div>
  );
}

export default MemberLayout