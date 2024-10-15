import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomeShopping, Home, Public, Login, Blog, DetailProduct, Products, Service, FAQ, FinalRegister, ResetPassword, DetailCart, Animal } from './pages/public'
import { AdminLayout,CreateProduct,Dashboard,ManageProduct,ManageUser,ManageOrder} from 'pages/admin'
import {CheckOut, History, MemberLayout,MyCart,Personal, WishList} from 'pages/member'
import path from './ultils/path'
import { getCategories } from './store/app/asyncAction'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Cart } from 'components'
import { showCart } from 'store/app/appSlice'
import ManageCoupon from 'pages/admin/ManageCoupon'

function App() {
  const dispatch = useDispatch()
  const {isShowCart} = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <div className="w-full">
     {isShowCart && 
      <div onClick={() => dispatch(showCart())} className='absolute inset-0 bg-overlay z-20 flex justify-end'>
        <Cart />
      </div>
     }
      <Routes>
        {/*route for public*/}
        <Route path={path.CHECKOUT} element={<CheckOut />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ANIMAL} element={<Animal />} />
          <Route path={path.HOMESHOPPING} element={<HomeShopping />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.PRODUCT} element={<Products />} />
          <Route path={path.OUR_SERVICE} element={<Service />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        {/*route for admin*/}
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_COUPON} element={<ManageCoupon />} />

        </Route>
        {/*route for member*/}
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<MyCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<WishList />} />
        </Route>
        {/*route for login*/}
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App
