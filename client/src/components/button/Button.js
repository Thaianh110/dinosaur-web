import React from 'react'

const Button = ({type, children, handleOnClick, style, fw }) => {
  return (
    <button
      type={type || 'button'}
      className={style ? style : `px-4 py-2 my-2 rounded-md text-white bg-primary text-semibold cursor-pointer ${fw ? 'w-full' : 'w-fit'}`}
      onClick={() => {
        handleOnClick && handleOnClick()
      }}>
      <span>{children}</span>
    </button>
  )
}

export default Button
