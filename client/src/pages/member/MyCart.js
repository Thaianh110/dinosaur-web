import { BreadCrumb, Button, SelectQuantity } from 'components';
import OrderItem from 'components/products/OrderItem';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { formatMoney } from 'ultils/helper';
import path from 'ultils/path';

const MyCart = () => {
  const { currentCart } = useSelector((state) => state.user);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate()

  const handleSelectItem = (item,isChecked) => {
    let selected = [...selectedItems]; 
    if (isChecked) {
      const index = selected.findIndex(
        (sleitem) => sleitem._id === item._id
      );

      if (index !== -1) {
        // Cập nhật sản phẩm với số lượng mới
        selected[index] = item;
      } else {
        // Thêm sản phẩm mới vào danh sách
        selected.push(item);
      }
    } else {
      // Xóa sản phẩm khỏi danh sách đã chọn
      selected = selected.filter(
        (selectedItem) => selectedItem._id !== item._id
      )
    }
    setSelectedItems(selected);
  }
  const handleClickCheckout= () => {
    if(selectedItems.length > 0) {
      navigate(`/${path.CHECKOUT}`, { state: { selectedItems } })
    }
  }

  return (
    <div className="w-full ">
      <div className="h-[81px] w-full bg-white flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase text-2xl">Giỏ hàng của tôi</h3>
        </div>
      </div>
      <div className="flex flex-col border-primary border w-main mx-auto ">
        <div className="w-main mx-auto py-3 bg-primary font-bold grid grid-cols-11 ">
          <div className="col-span-1 w-full text-center">Chọn</div>
          <div className="col-span-5 w-full text-center">Sản phẩm</div>
          <div className="col-span-1 w-full text-center">Số lượng</div>
          <div className="col-span-3 w-full text-center">Giá</div>
        </div>

        {currentCart?.map((el) => (
          <div key={el._id} className="grid grid-cols-11 items-center">
            <OrderItem el={el} defaultQuantity={el.quantity} onSelectItem={handleSelectItem}/>
          </div>
        ))}
      </div>
      <div className="w-main mx-auto bg-white flex flex-col justify-center items-end gap-3 py-4 px-8">
        <div className="flex items-center gap-8 text-sm ">
          <span className="font-bold">Tổng cộng:</span>
          <span className="text-primary">{formatMoney(selectedItems?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0) ) + ' VND'}</span>
        </div>
        <span className="text-xs ">Phí vận chuyển, thuế và chiết khấu sẽ được tính khi thanh toán</span>
        <div
          className={`px-4 py-2 ${selectedItems.length === 0 ? 'bg-gray-300' : 'bg-primary'} rounded-md text-text1`}
          onClick={() => handleClickCheckout()}
        >
          Mua hàng
        </div>
      </div>
    </div>
  );
};

export default MyCart;
