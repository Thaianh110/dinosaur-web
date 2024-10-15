import React from 'react';
import { NavLink } from 'react-router-dom';
import { createSlug } from 'ultils/helper';
import { useSelector } from 'react-redux';
import { AiOutlineMenu } from 'react-icons/ai';

const SideBar = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className=" flex flex-col custom-box-navigate uppercase">
      <div className='flex px-2 py-2 text-[#FFD154] bg-slate-800 gap-2'>
        <span> <AiOutlineMenu size={24}/></span>
         <span className='uppercase'> ALL Colection</span>
      </div>
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? 'bg-main cursor-pointer text-primary px-5 pt-[15px] pb-[14px] text-sm '
              : 'py-4 pl-10 text-text1  hover:bg-primary'
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
