import React from 'react'
import { renderStartFromNumber, formatMoney } from 'ultils/helper'

const ProductsCard = ({ price, title, image, totalRating }) => {
  return (
    <div className="w-full text-text1 gap-3 px-[10px] mb-[20px]">
      <div className="flex custom-box-navigate">
        <img src={image} alt="products" className="w-[120px] h-[120px] object-contain p-2" />
        <div className="flex flex-col p-2 items-start ">
          <span className="line-clamp-1 capitalize text-lg">{title}</span>
          <span>{`${formatMoney(price)} VNĐ`}</span>
          <span className="flex h-4">
            {renderStartFromNumber(totalRating, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard
