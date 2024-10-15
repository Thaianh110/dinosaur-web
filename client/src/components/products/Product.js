import React, { memo, useState } from 'react';
import { formatMoney } from 'ultils/helper';
import labelgreen from 'assets/label-green-transparent-image-png-11.png';
import labelyellow from 'assets/label-transparent-image-png-11.png';
import { renderStartFromNumber } from 'ultils/helper';
import { SelectOption } from 'components';
import icons from 'ultils/icons';
import { Link, useNavigate } from 'react-router-dom';
import path from 'ultils/path';
import { apiAddProductInCart } from 'apis';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from 'store/user/asyncAction';
import Swal from 'sweetalert2';

const { IoEyeSharp, FaHeart, BsFillBagHeartFill, BsFillCartCheckFill } = icons;

const Product = ({ productData, isNew }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const handleClickOption = async(e, flag) => {
    e.stopPropagation();
    if (flag === 'CART') {
      if (!current) {
        Swal.fire({
          title: 'Bạn chưa đăng nhập',
          text: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
          icon: 'info',
          cancelButtonText: 'Huỷ bỏ',
          showCancelButton: true,
          confirmButtonText: 'Go login'
        }).then((rs) => {
          if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
        });
      }
      const response = await apiAddProductInCart({
        pid: productData._id,
        color: productData.color,
        quantity: 1,
        thumb: productData.thumb,
        title: productData.title,
        price: productData.price,
      });
      if (response.success) {
        toast.success(response.message);
        dispatch(getCurrent());
      } 
      else toast.error(response.message);
    }
    if (flag === 'WISTLIST') console.log('wishlist');
    if (flag === 'QUICK_VIEW') navigate(
      `/${path.HOMESHOPPING}/${productData?.category?.slug}/${productData?._id}/${productData?.title}`
    )
  };
  return (
    <div className="w-full text-base px-[11px]">
      <div
        onClick={() =>
          navigate(
            `/${path.HOMESHOPPING}/${productData?.category?.slug}/${productData?._id}/${productData?.title}`
          )
        }
        className="w-full border p-[15px] flex flex-col items-center custom-box-navigate "
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative flex justify-center  ">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <span title="wishlist" onClick={(e) => handleClickOption(e, 'WISHLIST')}>
                <SelectOption icon={<FaHeart />} />
              </span>
              <span title="view" onClick={(e) => handleClickOption(e, 'QUICK_VIEW')}>
                <SelectOption icon={<IoEyeSharp />} />
              </span>
              {current?.cart.some((el) => el.product._id === productData._id) ? (
                <span title="addcart" onClick={(e) => handleClickOption(e, 'CART')}>
                  <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                </span>
              ) : (
                <span title="cart" onClick={(e) => handleClickOption(e, 'CART')}>
                  <SelectOption icon={<BsFillBagHeartFill />} />
                </span>
              )}
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              'https://tse3.mm.bing.net/th?id=OIP.mhEjokf4cHBCeCsOqohUdwHaHa&pid=Api&P=0&h=220'
            }
            alt=""
            className="w-[274px] h-[274px] object-cover "
          />

          <img
            src={isNew ? labelgreen : labelyellow}
            alt=""
            className="absolute top-[-10px] right-[-27px] w-[80px] h-[35px] object-cover"
          />
          <span className="font-bold absolute text-text1 top-[-11px] right-[-7px]">
            {isNew ? 'New' : 'Hot'}
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full ">
          <span className="flex h-4">
            {renderStartFromNumber(productData?.totalRating, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span className="line-clamp-1 text-text1">{productData?.title}</span>
          <span className="text-text1">{`${formatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
