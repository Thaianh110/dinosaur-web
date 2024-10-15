import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiAddProductInCart, apiGetProduct, apiGetProducts } from '../../apis';
import {
  BreadCrumb,
  Button,
  SelectQuantity,
  ProductExtraInfo,
  ProductInformation,
  CustomSlider
} from 'components';
import { formatMoney, formatPrice, renderStartFromNumber } from '../../ultils/helper';
import Slider from 'react-slick';
import { productExtraInfo } from '../../ultils/contants';
import DOMPurify from 'dompurify';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import path from 'ultils/path';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const { pid } = useParams();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [varriant, setVarriant] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: '',
    thumb: '',
    color: '',
    images: [],
    price: ''
  });

  console.log(currentProduct)

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
  };
  const fetchProduct = async () => {
    const response = await apiGetProducts({});
    if (response.success) {
      setRelatedProduct(response.productData);
    }
  };
  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        title: product?.varriants?.find((el) => el._id === varriant)?.title,
        color: product?.varriants?.find((el) => el._id === varriant)?.color,
        price: product?.varriants?.find((el) => el._id === varriant)?.price,
        thumb: product?.varriants?.find((el) => el._id === varriant)?.thumb,
        images: product?.varriants?.find((el) => el._id === varriant)?.images
      });
    }else {
      setCurrentProduct({
        title: product?.title,
        color: product?.color,
        price: product?.price,
        thumb: product?.thumb,
        images: product?.images || []
      });
    }
  }, [varriant,product]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    if (pid) {
      fetchProductData();
    }
  }, [update]);

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProduct();
    }
    window.scrollTo(0, 0);
  }, [pid]);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (signal) => {
      if (signal === 'tru' && quantity === 1) return;
      if (signal === 'tru') setQuantity((prev) => +prev - 1);
      if (signal === 'cong') setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  
  const handleAddToCart = async () => {
    if (!current) {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        text: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
        icon: 'info',
        cancelButtonText: 'Huỷ bỏ',
        showCancelButton: true,
        confirmButtonText: 'Go login'
      }).then(async (rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({ redirect: location.pathname }).toString()
          });
      });
    }
    const response = await apiAddProductInCart({
      pid,
      quantity,
      color: currentProduct.color || product?.color,
      price: currentProduct.price || product?.price,
      thumb: currentProduct.thumb || product?.thumb,
      title: currentProduct.title || product?.title
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(getCurrent());
    }
    else toast.error(response.message);
  };

  return (
    <div className="w-full">
      <div className="h-[81px] w-full bg-white flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-semibold uppercase">{currentProduct?.title || product?.category?.title}</h3>
          <BreadCrumb
            title={currentProduct?.title || product?.title}
            category={product?.category?.title}
          />
        </div>
      </div>
      <div className=" bg-text1 w-main m-auto mt-4 flex ">
        <div className="w-2/5 flex flex-col gap-4 justify-center items-center">
          {/* <div className="h-[458px] w-[458px]">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: product?.images[0]
                },
                largeImage: {
                  src: product?.images[0],
                  width: 1200,
                  height: 1200
                }
              }}
            />
          </div> */}
          <img
            src={
              currentProduct?.thumb ||
              currentImage ||
              'https://tse3.mm.bing.net/th?id=OIP.mhEjokf4cHBCeCsOqohUdwHaHa&pid=Api&P=0&h=220'
            }
            alt="product"
            className="h-[358px] w-[410px] border object-contain"
          />
          <div className="w-[458px]">
            <Slider className="image-slide flex gap-2 justify-between items-center" {...settings}>
              {currentProduct?.images.length === 0 &&
                product?.images?.map((el) => (
                  <div key={el} className="">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-image"
                      className=" cursor-pointer w-[130px] h-[130px] border border-black object-cover "
                    />
                  </div>
                ))}
              {currentProduct?.images.length > 0 &&
                currentProduct?.images?.map((el) => (
                  <div key={el} className="">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-image"
                      className=" cursor-pointer w-[130px] h-[130px] border border-black object-cover "
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-8 m-2 ">
          <div className="flex items-center justify-between">
            <h2 className="text-[32px] font-semibold">{`${formatMoney(
              formatPrice(currentProduct?.price || product?.price)
            )} VND`}</h2>
            <span>{`Kho: ${product?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStartFromNumber(product?.totalRating)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="italic text-red-600">{`(Đã bán : ${
              currentProduct?.sold || product?.sold
            })`}</span>
          </div>
          <ul className="list-item text-sm">
            {product?.description && (
              <div
                className="text-sm line-clamp-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description)
                }}
              ></div>
            )}
          </ul>
          <div className="my-4 flex items-center gap-4 ">
            <span className="font-bold">Color</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                onClick={() => setVarriant(null)}
                className={clsx(
                  'flex items-center gap-2 border cursor-pointer',
                  !varriant && 'border-red-500'
                )}
              >
                <img
                  src={product?.thumb}
                  alt="thumb"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="flex flex-col">
                  <span>{product?.color}</span>
                  <span>{product?.price}</span>
                </span>
              </div>
              {product?.varriants?.map((el) => (
                <div
                  onClick={() => setVarriant(el._id)}
                  className={clsx(
                    'flex items-center gap-2 border cursor-pointer',
                    varriant === el._id && 'border-red-500'
                  )}
                >
                  <img src={el?.thumb} alt="thumb" className="w-10 h-10 rounded-md object-cover" />
                  <span className="flex flex-col">
                    <span className="text-sm uppercase">{el?.color}</span>
                    <span className="text-sm">{el?.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleChangeQuantity={handleChangeQuantity}
                handleQuantity={handleQuantity}
              />
            </div>
            <Button handleOnClick={handleAddToCart} fw>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtraInfo.map((el) => (
            <ProductExtraInfo key={el.id} title={el.title} icon={el.icon} sub={el.sub} />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-2 bg-white">
        <ProductInformation
          rerender={rerender}
          totalRating={product?.totalRating}
          rating={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
        />
      </div>
      <div className="bg-white w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-primary">
          Other Product
        </h3>
        <CustomSlider products={relatedProduct} />
      </div>
      <div className="h-[300px] w-full bg-text1"></div>
    </div>
  );
};

export default DetailProduct;
