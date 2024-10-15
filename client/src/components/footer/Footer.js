import React from 'react'
import icons from '../../ultils/icons'

const { MdMail } = icons
const Footer = () => {
  return (
    <div className="w-full body-clip-path custom-bg-radient">
      <div className="h-[103px] w-full flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-text1">Sign up to newsletter</span>
            <small className="text-[13px] text-text2">Subcribe now and recieve weekly newsletter</small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full flex-1 bg-zinc-500 placeholder:opacity-50 outline-none text-text1 placeholder:text-text1 placeholder:italic"
              type="text"
              placeholder="Email address"
            />
            <div className="h-[56px] w-[56px] bg-zinc-500 rounded-r-full flex items-center text-text1 ">
              <MdMail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full flex items-center justify-center text-text1 text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">ABOUT US</h3>
            <span>
              <span>Address : </span>
              <span className="opacity-80">16 Nguyễn Ngọc Trai, Xuân Khánh, Ninh kiều, Cần Thơ</span>
            </span>
            <span>
              <span>Phone : </span>
              <span className="opacity-80">0337625771</span>
            </span>
            <span>
              <span>Mail : </span>
              <span className="opacity-80">thaianh@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">INFORMATION</h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today Deal's</span>
            <span>Contacts</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">WHO WE ARE</h3>
            <span>Help</span>
            <span>Free shipping</span>
            <span>FAQs</span>
            <span>Return </span>
            <span>Exchange</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]"># DINOSAUR WEBSITE</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
