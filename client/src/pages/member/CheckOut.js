import React, { useEffect, useState } from 'react';
import payment from 'assets/payment.svg';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoney } from 'ultils/helper';
import { Button, Congratulation, InputForm, PayPal } from 'components';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCreateOrder } from 'apis';
import Swal from 'sweetalert2';
import { getCurrent } from 'store/user/asyncAction';
import path from 'ultils/path';
const CheckOut = () => {
  const { current } = useSelector((state) => state.user);
  const location = useLocation();
  const [optionPayment, setOptionPayment] = useState(null);
  const [isSuccess, setIsSucess] = useState(false)
  const navigate = useNavigate()
  const {selectedItems } = location.state || [];
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useForm();
  const address = watch('address');

  useEffect(() => {
    setValue('address', current?.address);
  }, [current]);

  // useEffect(() => {
  //   dispatch(getCurrent())
  // },[isSuccess])
 
  const handleSubmitOrder = async() => {
    const products = selectedItems.map(item => ({
      product: item._id,
      count: item.quantity,
      color: item.color
    }));

    const total = selectedItems.reduce(
      (sum, el) => sum + el.price * el.quantity,
      0
    );

    const orderBy = current?._id;
    const response = await apiCreateOrder({products,total,orderBy})
    console.log(response.success)
    if(response.success) {
      setIsSucess(true)
      setTimeout(() => {
        Swal.fire('Tuyệt vời!','Bạn đã đặt hàng thành công','success').then(() =>{
          navigate(`/${path.HOME}`)
        })
      },500)
    }
  }


  return (
    <div className="w-main mx-auto overflow-y-auto p-8 grid grid-cols-10 gap-6 justify-center items-center">
     {isSuccess && <Congratulation />}
      <div  className="w-full flex justify-center items-center col-span-2">
        <img src={payment} alt="" className="w-80 object-contain " />
      </div>
      <div className="flex w-full flex-col items-center col-span-8 gap-6">
        <h2 className="text-3xl font-bold">CheckOut</h2>
        <div className="w-full grid grid-cols-4 gap-2">
          <table className="table-auto h-fit col-span-2">
            <thead>
              <tr className="border bg-primary">
                <th className="text-center p-2">Product</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-center p-2">Price</th>
                <th className="text-center p-2">Thanh tien</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems?.map((el) => (
                <tr className="border" key={el._id}>
                  <td className="text-center p-2">{el.title}</td>
                  <td className="text-center p-2">{el.quantity}</td>
                  <td className="text-center p-2">{formatMoney(el.price)}</td>
                  <td className="text-center p-2">{formatMoney(el.price * el.quantity) + 'VND'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full flex-col gap-8 text-sm col-span-2">
            <div className="flex gap-3">
              <span className="font-bold">Subtotal:</span>
              <span className="text-primary">
                {formatMoney(
                  selectedItems?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)
                ) + ' VND'}
              </span>
            </div>
            <div>
              <InputForm
                label="Your address:"
                register={register}
                errors={errors}
                id="title"
                validate={{
                  required: 'Required fill'
                }}
                style={`flex-auto flex-col mb-6`}
                placeholder="Name of product"
              />
            </div>
            <div className="w-full flex flex-wrap gap-3 justify-between items-center">
              <div className="w-full">Chọn hình thức thanh toán:</div>
              <Button handleOnClick={() => setOptionPayment('offline')}>
                Thanh toán khi nhận hàng
              </Button>
              <Button handleOnClick={() => setOptionPayment('online')}>
                Thanh toán trực tuyến
              </Button>
            </div>
            {address && optionPayment === 'online' ? (
              <div className="w-full mx-auto">
                <PayPal
                  payload={{
                    products: selectedItems,
                    total: Math.round(
                      +selectedItems?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500
                    ),
                    orderBy: current?._id
                    // address
                  }}
                  amount={Math.round(
                    +selectedItems?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500
                  )}
                  setIsSucess = {setIsSucess}
                />
              </div>
            ) 
            : (<div className="w-full flex justify-center items-center mx-auto">
              <div className=' text-sm font-bold   bg-primary px-4 py-2 rounded-md ' onClick={handleSubmitOrder}>
                Đặt hàng
              </div>
            </div>)
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
