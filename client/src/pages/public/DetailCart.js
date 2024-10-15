import { BreadCrumb, Button, SelectQuantity } from 'components';
import OrderItem from 'components/products/OrderItem';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { formatMoney } from 'ultils/helper';

const DetailCart = () => {
  const {currentCart } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div className="w-full ">
      <div className="h-[81px] w-full bg-white flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Cart</h3>
          {/* <BreadCrumb locate={location?.pathname} /> */}
        </div>
      </div>
      <div className=" flex flex-col border-primary border w-main mx-auto py-2">
        <div className="w-main mx-auto py-3 bg-primary font-bold grid grid-cols-10 ">
          <div className="col-span-6 w-full text-center ">Product</div>
          <div className="col-span-1 w-full text-center ">Quantity</div>
          <div className="col-span-3 w-full text-center ">Price</div>
        </div>

        {currentCart?.map((el) => (
          <OrderItem key={el.id} el={el} defaultQuantity={el.quantity}/>
        ))}
      </div>
      <div className="w-main mx-auto bg-white flex flex-col justify-center items-end gap-3 py-4 px-8">
        <div className="flex items-center gap-8 text-sm ">
          <span className='font-bold'>Subtotal:</span>
          <span className="text-primary">{formatMoney(currentCart?.reduce((sum,el ) => sum + Number(el?.price * el.quantity),0)) + ' VND'}</span>
        </div>
        <span className="text-xs ">Shipping , taxes, and discount caculated at checked</span>
        <Button>Mua hàng</Button>
      </div>
    </div>
  );
};

export default DetailCart;
