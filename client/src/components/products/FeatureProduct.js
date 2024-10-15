import React, { useState, useEffect } from 'react'
import { ProductCard } from 'components'
import museum from 'assets/museum.jpg'
import anh1 from 'assets/museum-4206805_640.jpg'
import anh2 from 'assets/landscape-3969074_640.jpg'
import { apiGetProducts } from 'apis'
const FeatureProduct = () => {
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    const response = await apiGetProducts({ limit: 9, page: 1 })
    if (response.success) setProducts(response.products)
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main text-text1">
        FEARTURE PRODUCT
      </h3>
      <div className="grid grid-cols-3 grid-rows-3 mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el.id}
            image={
              el.thumb ||
              'https://tse3.mm.bing.net/th?id=OIP.mhEjokf4cHBCeCsOqohUdwHaHa&pid=Api&P=0&h=220'
            }
            title={el.title}
            totalRating={el.totalRating}
            price={el.price}
          />
        ))}
      </div>
      <div className="grid grid-rows-2 grid-cols-4 gap-2">
        <img src={anh2} alt="" className="w-full object-cover col-span-2 row-span-1" />
        <img src={anh1} alt="" className="w-full object-cover col-span-2 row-span-1" />
        <img src={museum} alt="" className="w-full object-cover col-span-4 row-span-2" />
      </div>
    </div>
  );
}

export default FeatureProduct
