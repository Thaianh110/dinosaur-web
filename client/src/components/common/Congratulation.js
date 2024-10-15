import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
const Congratulation = () => {
  const { width , heght} = useWindowSize()
  return (
    <Confetti width={width} height={heght} />
  )
}

export default Congratulation