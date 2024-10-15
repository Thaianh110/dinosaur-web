import React, { useEffect, useRef, useState } from 'react'
import logo from 'assets/Dinosaur.png'
import { voteOptions } from 'ultils/contants'
import { AiFillStar } from 'react-icons/ai'
import {Button}from 'components'
import { apiRatings } from 'apis'

const VoteOptions = ({nameProduct,pid,rerender,onClose }) => {
  const modalref = useRef()
  const [score, setScore] = useState(null)
  const [comment, setComment] = useState('')
  const handleSubmitVote = async() => {
    if (!comment || !score) {
      alert('bạn chưa điền đủ')
      return
    }
    await apiRatings({ star: score, comment, pid,updatedAt:Date.now()})
    rerender()
    onClose()
  }
  useEffect(() => {
    modalref.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [])

  return (
    <div className="absolute z-10 inset-0 bg-overlay flex justify-center items-center">
      <div ref={modalref} className=" bg-gray-100 flex-col flex justify-center items-center">
        <div className="w-[500px]">
          <img src={logo} className="h-[120px] mb-4 w-[500px] object-bottom object-cover" alt="" />
          <h2 className="text-center text-lg py-3 font-bold  ">Đánh giá sản phẩm {nameProduct}</h2>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Vui lòng cho tôi biết suy nghĩ của bạn về sản phẩm này.."
            className="form-textarea h-[100px] w-full placeholder:italic placeholder:text-sm placeholder:text-gray-400"></textarea>
        </div>
        <div className="w-full flex flex-col gap-4 my-4">
          <p>Hãy cho tôi biết cảm nhận của bạn về sản phẩm này</p>
          <div className="flex justify-center items-center gap-4">
            {voteOptions.map((el) => (
              <div
                onClick={() => setScore(el.id)}
                className="w-[80px] bg-slate-200 rounded-full h-[80px] flex items-center flex-col justify-center gap-1"
                key={el.id}>
                {Number(score) && score >= el.id ? <AiFillStar color="yellow" size={20} /> : <AiFillStar color="gray" size={20} />}

                <span>{el.text}</span>
              </div>
            ))}
          </div>
        </div>
        <Button fw handleOnClick={() => handleSubmitVote()}>
          Submit
        </Button>
        <span onClick={onClose} className="bg-slate-50 h2 cursor-pointer gap-3">
          Trở về
        </span>
      </div>
    </div>
  )
}

export default VoteOptions
