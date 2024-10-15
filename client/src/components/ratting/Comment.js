import React from 'react'
import moment from 'moment'
import { renderStartFromNumber } from '../../ultils/helper'
const Comment = ({ image, name = 'Unknown', updatedAt, comment, star }) => {
  return (
    <div className="flex gap-4">
      <div className="px-2 flex">
        <img
          src={
            image ||
            'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg'
          }
          alt=""
          className="w-[45px] h-[45px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto ">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs italic">{moment(updatedAt)?.fromNow()}</span>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-4 border py-2 bg-gray-200">
          <span className="flex items-center gap-2">
            <span className="font-semibold">Đánh giá:</span>
            <span className="flex items-center gap-1">
              {renderStartFromNumber(star)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold"> Bình Luận:</span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Comment
