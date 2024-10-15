import React, { Fragment, useState } from 'react'
import logo from 'assets/Dinosaur.png'
import { adminSidebar } from 'ultils/contants'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import path from 'ultils/path'
const AdminSideBar = () => {
    const navigate = useNavigate()
  const [actived, setActived] = useState([])
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === +tabID)) setActived((prev) => prev.filter((el) => el !== +tabID))
    else setActived((prev) => [...prev, tabID])
  }
  const activedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-100 font-medium bg-gray-500 '
  const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-100 font-medium hover:bg-gray-400'
  return (
    <div className=" bg-zinc-800 h-screen py-4 ">
        <div onClick={() => navigate(`/${path.HOME}`)}  className="flex flex-col justify-center items-center p-4 gap-2">
        <img src={logo} alt="" className="w-[200px] object-bottom h-[50px] object-cover" />
        <span>Admin Workspace</span>
        </div>
      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === 'SINGLE' && (
              <NavLink to={el.path} className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActiveStyle)}>
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === 'PARENT' && (
              <div onClick={() => handleShowTabs(el.id)} className="py-2 flex flex-col gap-2 text-gray-100 font-medium text-sm">
                <div className="flex items-center justify-between px-4 py-2 gap-2 hover:bg-gray-400">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === +el.id) ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
                </div>
                {actived.some((id) => id === +el.id) && (
                  <div className="flex flex-col pl-6">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActiveStyle)}>
                        <span>{item.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default AdminSideBar
