import { apiAddVarriantProducts } from "apis";
import Button from "components/button/Button";
import InputForm from "components/inputs/InputForm";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helper";

const CustomVarriant = ({ customVarriant, render, setCustomVarriant }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const [preview, setPreview] = useState({
    thumb: "",
    images: [],
  });
  useEffect(() => {
    reset({
      title: customVarriant?.title,
      color: customVarriant?.color,
      price: customVarriant?.price,
    });
  }, [customVarriant]);

  const handleAddVarriants = async(data) => {
    if(data.color === customVarriant.color) Swal.fire('Lỗi!','Màu sắc chưa thay đổi','info')
    else{
        const formData = new FormData()
        for(let i of Object.entries(data)) formData.append(i[0],i[1])
        if(data.thumb) formData.append('thumb',data.thumb[0])
        if(data.images) {
        for(let image of data.images) formData.append('images',image)
      }
       console.log(formData);
      const response = await apiAddVarriantProducts(formData,customVarriant._id)
      if(response.success){
        toast.success(response.message)
        reset()
        setPreview({thumb: '',images: []})
      }else toast.error(response.message)
    }
  };
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("Không đúng định dạng file");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="p-4 border-b w-full flex bg-gray-300 justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Custom Varriant of Product
        </h1>
        <span
          className="text-primary hover:underline cursor-pointer"
          onClick={() => setCustomVarriant(null)}
        >
          cancel
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handleAddVarriants)}
        className="p-4 flex flex-col gap-4 w-full"
      >
        <div className="flex w-full gap-4 items-center">
          <InputForm
            label="Title Product"
            register={register}
            errors={errors}
            id="title"
            style="flex-auto focus:outline-none"
            validate={{
              required: "Required fill",
            }}
            placeholder="Tilte of varriant"
          />
        </div>
        <div className="flex gap-4 items-center">
          <InputForm
            label="Price varriant"
            register={register}
            errors={errors}
            style={`flex-auto flex-col`}
            id="price"
            validate={{
              required: "Required fill",
            }}
            type="number"
            placeholder="Price of varriant"
          />
          <InputForm
            label="Color"
            register={register}
            errors={errors}
            style={`flex-auto flex-col`}
            id="color"
            validate={{
              required: "Required fill",
            }}
            placeholder="color of varriant"
          />
        </div>
        <div>
          <div className="flex flex-col gap-2 mt-6">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              {...register("thumb", { required: "Need fill" })}
              type="file"
              id="thumb"
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-3">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 my-6">
            <label className="font-semibold" htmlFor="images">
              Upload image of product
            </label>
            <input
              {...register("images", { required: "Need fill" })}
              type="file"
              id="images"
              multiple
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-3 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, index) => (
                <div key={index} className="w-fit relative">
                  <img
                    src={el}
                    alt="images"
                    className="w-[150px] object-cover"
                  />
                  {/* {hoverElm === el.name && <div 
                onClick={() => handleRemoveImage(el.name)}
                className='absolute animate-scale-up-center inset-0 bg-overlay flex items-center justify-center'>
                  <IoTrashBinSharp size={32} color='white'/>
                  </div>} */}
                </div>
              ))}
            </div>
          )}
          <div className="mt-6">
            <Button type="submit">Thêm biến thể</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomVarriant;
