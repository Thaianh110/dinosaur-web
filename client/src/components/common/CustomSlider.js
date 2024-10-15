import React, { memo } from 'react'
import Slider from 'react-slick'
import { Product } from 'components'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const CustomSlider = ({ products, activeTab }) => {
  return (
    <>
      {products && (
        <Slider className="custom-slide" {...settings}>
          {products?.map((el) => (
            <Product key={el._id} productData={el} isNew={activeTab === 1 ? false : true} />
          ))}
        </Slider>
      )}
    </>
  )
}

export default memo(CustomSlider)
