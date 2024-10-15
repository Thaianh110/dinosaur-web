import React from "react";
import logo from "../../assets/landscape-3969074_640.jpg";
import TypeWriter from "typewriter-effect";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../ultils/animate3d/motion";
import BgAnimationStyle from "../../ultils/animate3d/BgAnimationStyle";
import { Animal } from "../../components";
const Home = () => {
  return (
    <div>
      <div id="home"
        className="relative flex justify-center p-[80px_30px] z-[1]  md:p-[66px_16px] sm:p-[32px_16px] head-clip-path "
      >
        <div
          className="absolute flex top-[50%] right-0 bottom-0 left-[47%] max-w-[1360px] 
        overflow-hidden w-full h-full justify-end transform -translate-x-1/2 -translate-y-1/2"
        >
          <BgAnimationStyle />
        </div>

        <motion.div {...headContainerAnimation}>
          <div className=" flex justify-between relative items-center gap-10 w-full max-w-[1100px] md:flex-col">
            <div className="w-full order-1 md:order-2 md:mb-[30px] md:flex md:flex-col md:items-center ">
              <motion.div {...headTextAnimation}>
                <div className="text-text1 text-[32px] font-bold leading-[68px] md:text-center sm:text-[30px] sm:leading-7 sm:mb-2  ">
                  Wecome to 
                  <br />Dinosaur Website
                </div>
                <div className=" text-text1 text-[24px] flex gap-3 font-semibold leading-[68px] md:text-center sm:text-[30px] sm:leading-7 sm:mb-2 ">
                  Đây là website
                  <div className="cursor-pointer text-primary">
                    <TypeWriter
                      options={{
                        strings: "Động vật cổ đại",
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <div className="text-[20px] text-text2">
                Đây là website về động vật cổ đại cung cấp các thông tin về các loài động vật cổ đại. Ngoài ra website còn tích hợp bán một số mặt hàng như : Mô hình khủng long, sách khủng long, tranh ,ảnh ... .Rất vui khi các bạn đã đến website của chúng tôi
                </div>
              </motion.div>

              {/* <ResumeButton>Check Resume</ResumeButton> */}
            </div>
            <div className="ml-5 w-full order-2 flex justify-end md:order-1 md:flex-col md:justify-center md:items-center md:mb-20">
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <img
                    className=" w-[600px] object-contain border-4 border-primary rounded-full"
                    src={logo}
                    alt="Xin chao"
                  />
                </Tilt>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <Animal />
      </div>
  );
};

export default Home;
