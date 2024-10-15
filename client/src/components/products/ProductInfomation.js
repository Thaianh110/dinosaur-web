import React, { useState, useCallback } from 'react'
import { productInfoTabs } from 'ultils/contants'
import { Button, VoteBar, VoteOptions, Comment } from 'components'
import { renderStartFromNumber } from 'ultils/helper'
import { apiRatings } from 'apis'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from 'ultils/path'
import { useNavigate } from 'react-router-dom'

const ProductInfomation = ({ totalRating, rating, nameProduct, pid, rerender }) => {
  const navigate = useNavigate()
  const [openVote, setOpenVote] = useState(false)
  const [activedTabs, setActivedTabs] = useState(1)
  const { isLoggedIn } = useSelector((state) => state.user)
  const RatingClick = useCallback(() => {
    if (!isLoggedIn) {
      Swal.fire({
        text: 'Login',
        cancelButtonText: 'Huy bo',
        showCancelButton: true,
        confirmButtonText: 'Đăng nhập ngay',
        title: 'oops'
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`)
        }
      })
    }else{
      setOpenVote(prev => !prev)
    }
  },[isLoggedIn])

  return (
    <div>
      {openVote &&  <VoteOptions nameProduct={nameProduct} pid={pid} rerender={rerender} onClose={() => setOpenVote(false)}/>}
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            onClick={() => setActivedTabs(el.id)}
            className={`py-2 px-4 cursor-pointer ${activedTabs === el.id ? 'bg-white border border-b-0' : 'bg-gray-200'} `}
            key={el.id}>
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border bg-white p-4">
        {productInfoTabs.some((el) => el.id === activedTabs) && productInfoTabs.find((el) => el.id === activedTabs)?.content}
      </div>
      <div className="flex flex-col py-8 mx-4">
        <div className="flex ">
          <div className="flex-4 border-red-500 border flex-col flex items-center justify-center mx-4 ">
            <span>{`${totalRating}/5`}</span>
            <span className="flex items-center gap-1">
              {renderStartFromNumber(totalRating)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span>{`Tổng đánh giá ${rating?.length}`}</span>
          </div>
          <div className="flex-6 border flex gap-1 flex-col p-4 ">
            {Array.from(Array(5).keys())
              .reverse()
              .map((el) => (
                <VoteBar key={el} number={el + 1} ratingTotal={rating?.length} ratingCount={rating?.filter((i) => i.star === el + 1)?.length} />
              ))}
          </div>
        </div>
        <div className="p-4 flex items-center justify-center flex-col gap-2">
          <span>Bạn đánh giá sao về sản phẩm này</span>
          <Button handleOnClick={RatingClick}>Đánh giá ngay</Button>
        </div>
        <div className="flex flex-col gap-4">
          {rating?.map((el) => (
            <Comment
              key={el.id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductInfomation
