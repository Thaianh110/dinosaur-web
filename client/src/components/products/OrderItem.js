import SelectQuantity from 'components/common/SelectQuantity';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from 'store/user/userSlice';
import { formatMoney } from 'ultils/helper';

const OrderItem = ({ el, defaultQuantity = 1, onSelectItem }) => {
  const [quantity, setQuantity] = useState(() => defaultQuantity);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const handleQuantity = (number) => {
    if (number > 1) setQuantity(number);
  };
  const handleChangeQuantities = (signal) => {
    if (signal === 'tru' && quantity === 1) return;
    if (signal === 'tru') setQuantity((prev) => +prev - 1);
    if (signal === 'cong') setQuantity((prev) => +prev + 1);
  };
  const handleSelectItem = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    // Gọi callback để cập nhật danh sách sản phẩm đã chọn
    onSelectItem({ ...el, quantity }, checked);
  };

  // Mỗi khi quantity thay đổi, cập nhật giỏ hàng và thông báo lên component cha
  useEffect(() => {
    dispatch(updateCart({ pid: el._id, quantity, color: el.color }));

    if (isChecked) {
      // Nếu sản phẩm đang được chọn, gửi thông tin cập nhật lên cha
      onSelectItem({ ...el, quantity }, true);
    }
  }, [quantity, isChecked]);

  return (
    <>
      <div
        key={el._id}
        className="w-main py-4 border-b mx-auto bg-white font-bold grid grid-cols-10 "
      >
        <div className="col-span-6 w-full  ">
          <div className="flex px-7 gap-2 ">
            <input type="checkbox" checked={isChecked} onChange={handleSelectItem} />
            <img src={el.thumb} alt="thumb" className="w-32 h-32 object-cover" />
            <div className="flex flex-col ">
              <span className="text-primary uppercase">{el?.title}</span>
              <span className="text-sm w-fit border">{el.color}</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-full flex justify-center text-center h-full ">
          <div className="flex justify-center w-full items-center text-sm font-light">
            <SelectQuantity
              quantity={quantity}
              handleChangeQuantity={handleChangeQuantities}
              handleQuantity={handleQuantity}
            />
          </div>
        </div>
        <div className="col-span-3 w-full text-center flex justify-center  ">
          <span className="text-base flex justify-center items-center">{`${formatMoney(
            el?.price * quantity
          )} VND`}</span>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
