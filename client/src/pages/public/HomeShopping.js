import React, { memo } from "react";
import {
  Banner,
  SideBar,
  BestSeller,
  DealDaily,
  FeatureProduct,
  CustomSlider,
} from "components";
import { useSelector } from "react-redux";
import anh1 from "../../assets/label-green-transparent-image-png-11.png";

//?.filter(el => el.brand.lenght > 0) de o categories?.map
const HomeShopping = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-full flex items-center justify-center ">
    <div className="w-main relative z-[1] flex flex-col items-center justify-center ">
      <div className="w-main flex justify-center gap-2 ">
        <div className="flex flex-col w-[25%] flex-auto gap-5 ">
          <SideBar />
          <DealDaily />
        </div>
        <div className="flex flex-col w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8 w-main">
        <FeatureProduct />
      </div>
      <div className="my-8 w-main ">
        <h3 className="text-[20px] font-semibold py-[15px] text-text1 border-b-2 border-primary">
          New ARRIVAL
        </h3>
        <div className="mt-4 m-[10px]">
          <CustomSlider products={newProducts} />
        </div>
      </div>

      <div className="my-8 w-main ">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          HOT COLLECTION
        </h3>
        <div className="grid grid-cols-3 gap-6 mt-4 ">
          {categories?.map((el) => (
            <div key={el._id} className="w-full ">
              <div className="border flex gap-4 p-4 min-h-[202px]">
                <img
                  src={el?.image || anh1}
                  alt=""
                  className="w-[144px] h-[129px] object-contain"
                />
                <div className="flex-1 text-text1">
                  <h4 className="font-bold uppercase">{el?.title}</h4>
                  <ul className="text-sm">
                    {el?.brand?.map((item) => (
                      <span key={item} className="flex gap-2 items-center">
                        <li>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-8 w-full ">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">Blogs Post</h3>
      </div>
    </div>
    </div>
  );
};
export default memo(HomeShopping);
