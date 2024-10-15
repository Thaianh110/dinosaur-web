import { apiRemoveProductInCart } from 'apis';
import Button from 'components/button/Button';
import React from 'react'
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showCart } from 'store/app/appSlice';
import { getCurrent } from 'store/user/asyncAction';
import { formatMoney } from 'ultils/helper';
import icons from 'ultils/icons';
import path from 'ultils/path';

const { MdDelete} = icons
const Cart = () => {
  const dispatch = useDispatch()
  const {currentCart } = useSelector(state => state.user)
  const navigate = useNavigate()

  const removeProductInCart = async(pid,color) => {
    const response = await apiRemoveProductInCart(pid,color)
    if(response.success) {
      dispatch(getCurrent())
    }else toast.error(response.message)
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className='w-[400px] grid grid-rows-10 h-screen bg-slate-800 text-text-1 p-6'>
      <header className='row-span-1 h-full p-4 border-b font-bold text-2xl flex justify-between items-center'>
          <span className='text-text1'>Giỏ hàng của bạn</span>
          <span onClick={() => dispatch(showCart())}
           className='cursor-pointer'><ImCancelCircle size={32} color='white'/> </span>
      </header>
      <section className='row-span-7 py-8 h-full flex flex-col gap-3 max-h-full overflow-y-auto'>
        {!currentCart && <span className='text-3xl'>Giỏ hàng của bạn chưa có</span>}
        {currentCart && currentCart?.map((el) => (
          <div key={el._id} className='flex justify-between text-text1'>
            <div className='flex gap-2 '>
            <img src={el?.thumb} alt="thumb" className='w-16 h-16 object-cover' />
            <div className='flex flex-col '>
              <span className='text-primary uppercase'>{el?.title}</span>
              <span className='text-xs'>{el?.color}</span>
              <span className='text-base'>{`${formatMoney(el?.price)} VND`}</span>
            </div>
            </div>
            <span onClick={() => removeProductInCart(el?.product?._id,el.color)} className='h-8 w-8 hover:bg-gray-700 cursor-pointer flex justify-end items-center '>
              <MdDelete size={32}/>
            </span>
          </div>
        ))}
      </section>
      <div className='row-span-2 h-full flex flex-col justify-between'>
        <div className='flex justify-between mt-2 items-center text-text1 border-t '>
          <span className='text-lg'>Tổng cộng:</span>
          <span>{formatMoney(currentCart.reduce((sum,el ) => sum + Number(el?.price * el.quantity),0))}</span>
        </div>
        <span className='text-center italic text-text2 text-xs'>Đây là giá sơ bộ. Chi tiết giá giảm, phí ship,...trong trang giỏ hàng </span>
        <Button handleOnClick={() =>{
          dispatch(showCart())
           navigate(`/${path.MEMBER}/${path.MY_CART}`)
        }} style={`w-full bg-primary py-2 px-4 text-text1 text-nm`}>Đến trang giỏ hàng</Button>
      </div>
    </div>
  )
}

export default Cart