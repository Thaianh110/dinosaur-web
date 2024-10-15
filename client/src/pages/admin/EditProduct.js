
import { apiCreateProducts, apiUpdateProducts } from 'apis';
import { Button, InputForm, MarkDownEditor,Select } from 'components';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getBase64, validate } from 'ultils/helper';

const EditProduct = ({editProducts,render,setEditProducts}) => {
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    reset({
      title: editProducts?.title || "",
      price: editProducts?.price || "",
      quantity: editProducts?.quantity || 0,
      color: editProducts?.color || "",
      category: editProducts?.category?.title || "",
      brand: editProducts?.brand?.toLowerCase() || "",
    });
     setPreview({
       thumb: editProducts?.thumb || "",
       images: editProducts?.images || [],
     });
    setPayload({description: typeof editProducts?.description === 'object' ? editProducts?.description.join(',') : editProducts?.description})
  },[editProducts])
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
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

const handleUpdateProduct = async(data) => {
    setLoading(true)
    setInvalidFields([]);
    const invalids = validate(payload,setInvalidFields)
    if(invalids === 0) {
      if(data.category) data.category = categories?.find(el => el.title === data.category)?._id
      let finalPayload = {...data,...payload}
      finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
      const formData= new FormData()
      for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1]) 
      finalPayload.images =data?.images?.length === 0 ? preview?.images: data.images;
      for(let image of finalPayload.images) formData.append('images', image); 
      const response = await apiUpdateProducts(formData,editProducts._id)
      setLoading(false)
      if(response.success){
        toast.success(response.message)
        render()
        setEditProducts(null)
      }else toast.error(response.message)
    }
}

useEffect(() => {
  if( watch('thumb') instanceof FileList && watch('thumb').length > 0)  handlePreviewThumb(watch("thumb")[0]);
}, [watch("thumb")]);

useEffect(() => {
  if (watch("images") instanceof FileList && watch("images").length > 0)
    handlePreviewImages(watch("images"));
}, [watch("images")]);

  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="p-4 border-b w-full flex bg-gray-300 justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Update Product</h1>
        <span className='text-primary hover:underline cursor-pointer' onClick={() => setEditProducts(null)}>cancel</span>
      </div>
      <div className='w-full px-4'>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Name products"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Required fill",
            }}
            style={`flex-auto flex-col mb-6`}
            placeholder="Name of product"
          />
          <div className="w-full flex gap-4 my-8">
            <InputForm
              label="Price"
              register={register}
              errors={errors}
              style={`flex-auto flex-col`}
              id="price"
              validate={{
                required: "Required fill",
              }}
              type="number"
              placeholder="Name of product"
            />
            <InputForm
              label="Quantity"
              register={register}
              errors={errors}
              style={`flex-auto flex-col`}
              id="quantity"
              validate={{
                required: "Required fill",
              }}
              placeholder="Name of product"
            />
            <InputForm
              label="Color"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Required fill",
              }}
              style={`flex-auto flex-col`}
              placeholder="Color of product"
            />
          </div>
          <div className="w-full flex gap-4 my-8">
            <Select
              label="category"
              register={register}
              id="category"
              errors={errors}
              style="flex-col w-full"
              fullWidth
              option={categories?.map((el) => ({
                code: el.title,
                value: el.title,
              }))}
              validate={{
                required: "Required fill",
              }}
            />
            <Select
              label="Brand"
              register={register}
              id="brand"
              fullWidth
              errors={errors}
              style="flex-col w-full"
              option={categories
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({ code: el.toLowerCase(), value: el }))}
            />
          </div>
          <MarkDownEditor
            name="description"
            label="Description"
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.description}
          />
          <div className="flex flex-col gap-2 mt-6">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              {...register("thumb")}
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
              {...register("images")}
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
                <div
                  key={index}
                  className="w-fit relative"
                >
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
            <Button type="submit">Tạo sản phẩm</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct