import React, { useEffect, useState, memo } from 'react'
import icons from 'ultils/icons'
import { apiGetProducts } from 'apis'
import { renderStartFromNumber, formatMoney, secondsToHMS } from 'ultils/helper'
import { CountDown } from 'components'
import moment from 'moment/moment'

const { IoStarSharp, AiOutlineMenu } = icons
let idInterval
const DealDaily = () => {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [dealDaily, setDealDaily] = useState(null)
  const [expireTime, setExpireTime] = useState(false)

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: 1,
      totalRating: 5
    })
    // Math.round(Math.random()*10)
    if (response.success) {
      setDealDaily(response.products[0])
      const today = `${moment().format('MM/DD/YYYY')} 0:00:00`
      const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
      const number = secondsToHMS(seconds)
      setHour(number.h)
      setMinute(number.m)
      setSecond(number.s)
    } else {
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
  }

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  }, [expireTime])

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1)
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1)
          setSecond(59)
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1)
            setMinute(59)
            setSecond(59)
          } else {
            setExpireTime(!expireTime)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }
  }, [second, minute, hour, expireTime])

  return (
    <div className="w-full border flex-auto">
      <div className="w-full flex justify-between items-center p-4">
        <span className="flex-1 flex justify-center">
          <IoStarSharp size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-text1 justify-center">DEAL DAILY</span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={dealDaily?.images[0] || 'https://tse3.mm.bing.net/th?id=OIP.mhEjokf4cHBCeCsOqohUdwHaHa&pid=Api&P=0&h=220'}
          alt=""
          className="w-full object-contain"
        />
        <span className="flex h-4">
          {renderStartFromNumber(dealDaily?.totalRating, 20)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span>{`${formatMoney(dealDaily?.price)} VNĐ`}</span>
      </div>
      <div className="px-4 mt-4 mb-8">
        <div className="flex justify-center items-center gap-2 mb-4">
          <CountDown unit={'Hours'} number={hour} />
          <CountDown unit={'Minutes'} number={minute} />
          <CountDown unit={'Seconds'} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center 
        w-full bg-main hover:bg-primary
        text-text1 font-medium py-2">
          <AiOutlineMenu />
          <span>option</span>
        </button>
      </div>
    </div>
  )
}

export default memo(DealDaily)
