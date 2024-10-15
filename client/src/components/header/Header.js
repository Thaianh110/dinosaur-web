import React, { useEffect, useState } from 'react';

import logo from 'assets/Dinosaur.png';
import icons from 'ultils/icons';
import { Link, useNavigate } from 'react-router-dom';
import path from 'ultils/path';
import { navigation, popupAfterLogin } from 'ultils/contants';
import { NavLink } from 'react-router-dom';
import { getCurrent } from 'store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import { logout, clearMessage } from 'store/user/userSlice';
import Swal from 'sweetalert2';
import { showCart } from 'store/app/appSlice';
const { FaUser, AiOutlineMenu, IoLogOutOutline, FaShoppingCart } = icons;
const Header = () => {
  const [popup, setPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (mes)
      Swal.fire('OOps', mes, 'info').then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);
  return (
    <div className="bg-main w-full flex justify-center items-center sticky top-0 z-10 ">
      <div className=" w-main border-b-2 border-primary max-w-main flex justify-center h-[120px] items-center sticky px-6 z-10">
        {/* logo */}
        <Link className="w-fit mx-4 block gap-4" to={`/${path.HOMESHOPPING}`}>
          <img src={logo} alt="ảnh logo" className=" w-[110px] object-contain max-w-[110px]" />
        </Link>

        <div className="w-full py-2 text-[16px] text-text1 flex items-center justify-end">
          {/* left container*/}
          <div className="h-full mr-4 hidden items-center cursor-pointer text-text1 md:block md:hover:text-primary">
            <AiOutlineMenu size={32} onClick={() => setIsOpen(!isOpen)} color="inherit" />
          </div>
          <div className="w-full flex justify-center items-center gap-3 list-none md:hidden text-sm ">
            {navigation.map((el) => (
              <NavLink
                to={el.path}
                key={el.id}
                className={({ isActive }) =>
                  isActive ? 'px-3 hover:text-primary capitalize text-primary' : 'px-3 hover:text-primary capitalize'
                }
              >
                {el.value}
              </NavLink>
            ))}
          </div>
          <ul
            className={`w-full bg-slate-800 hidden mt-10 gap-4 list-none items-start p-3.5 py-6 px-10 absolute top-20 left-0 rounded-b-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition-all duration-600 ease-in-out ${
              isOpen ? 'translate-y-0 opacity-100 z-[1000]' : 'translate-y-full opacity-0 z-[-1000]'
            } bg-opacity-60 md:flex md:flex-col`}
          >
            {isOpen &&
              navigation.map((el) => (
                <NavLink
                  to={el.path}
                  onClick={() => setIsOpen(!isOpen)}
                  key={el.id}
                  className={({ isActive }) =>
                    isActive ? 'pr-12 hover:text-primary text-primary' : 'pr-12 hover:text-primary'
                  }
                >
                  {el.value}
                </NavLink>
              ))}
          </ul>
        </div>
        <div className=" flex items-center h-full ">
          <div onClick={() => dispatch(showCart())} className="flex justify-center items-center py-3 relative mr-10">
            <FaShoppingCart className="text-text1 cursor-pointer mr-3" size={35} />
            <span className="text-red-500 absolute top-0 right-0 text-lg font-semibold">{`${
              current?.cart?.length || 0
            }`}</span>
          </div>
          <div className="flex flex-col justify-center ">
            {isLoggedIn && current ? (
              <div className="flex justify-between items-center ">
                {/* fix cho nay hien popup nhan vao de  */}

                <div
                  onClick={() => setPopup(!popup)}
                  className="flex justify-center relative mr-3 items-center"
                >
                  <div className="text-text1 hover:text-primary flex flex-col items-center ">
                    <FaUser className="text-text1 mt-3 hover:text-primary" size={32} />
                    <span className="">{`${current?.lastname}`}</span>
                  </div>
                  {popup && (
                    <div className="absolute bg-[rgba(0,0,0,0.4)] top-full pt-6 bottom-0 w-[200px] h-fit">
                      {popupAfterLogin.map((el) => (
                        <div className="flex justify-center items-center ">
                          {current.role === 2003 && (
                            <Link
                              to={el.path}
                              className=" text-text1 px-4 py-2 gap-2 flex justify-center items-center  hover:text-primary"
                            >
                              <span>{el.icon}</span>
                              <span>{el.text}</span>
                            </Link>
                          )}
                          {current.role === 2002 && (
                            <NavLink
                              to={el.path}
                              className="text-text1 px-4 py-2 gap-2 flex justify-center items-center  hover:text-primary"
                            >
                              <span>{el.icon}</span>
                              <span>{el.text}</span>
                            </NavLink>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="ml-3" onClick={() => dispatch(logout())}>
                  <IoLogOutOutline className="text-text1 cursor-pointer " size={35} />
                </div>
              </div>
            ) : (
              <Link to={`/${path.LOGIN}`} className="text-text1 hover:text-primary py-3">
                <FaUser className="text-text1 hover:text-primary my-3" size={32} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* <Link
            to={`/${path.LOGIN}`}
            className=" w-full items-center flex-col justify-center flex cursor-pointer mt-10 mr-10"
          >
            <FaUser className="text-text1 hover:text-primary " size={32} />
            {isLoggedIn ? (
              <span className="text-text1 hover:text-primary py-3">
                {`${current?.lastname}`}
              </span>
            ) : (
              <span className="text-text1 hover:text-primary py-3">Login</span>
            )}
          </Link>
          {isLoggedIn && (
            <span onClick={() => dispatch(logout)} >
              <IoLogOutOutline
                className="text-text1 hover:text-primary cursor-pointer "
                size={35}
              />
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
