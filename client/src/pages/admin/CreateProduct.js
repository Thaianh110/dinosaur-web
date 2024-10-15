import React, { useCallback, useEffect, useState } from 'react'
import { Button, InputForm, Loading, MarkDownEditor, Select } from 'components'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getBase64, validate } from 'ultils/helper'
import { toast } from 'react-toastify'
import { apiCreateProducts } from 'apis'
const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app)
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm()
  
  const [preview, setPreview] = useState({
    thumb: null,
    images:[]
  })
  const [loading, setLoading] = useState(false)
  const [hoverElm, setHoverElm] = useState(null)
  const [payload, setPayload] = useState({
    description: '',
  })
  const [invalidFields, setInvalidFields] = useState([])
  
  const handlePreviewThumb = async(file) => {
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({...prev,thumb:base64Thumb}))
  }
  const handlePreviewImages = async(files) => {
    const imagesPreview = []
    for(let file of files) {
      if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
        toast.warning('Không đúng định dạng file')
        return
      }
      const base64 = await getBase64(file)
      imagesPreview.push({name:file.name,path:base64})

    }
    setPreview(prev => ({...prev,images:imagesPreview}))
    
  }
  // const handleRemoveImage =(name) => {
  //   const files = {...watch('images')}
  //   reset({
  //     images: files?.filter(el => el.name !== name)
  //   })
  //   if(preview.images?.some(el => el.name === name)) setPreview(prev => ({...prev,images:prev.images?.filter(el => el.name != name)}))
  // }
  const changeValue = useCallback((e) => {
      setPayload(e)
    },[payload])
  useEffect(() => {
    handlePreviewThumb(watch('thumb')[0])
  },[watch('thumb')])

  useEffect(() => {
    handlePreviewImages(watch('images'))
  },[watch('images')])

  const handleCreateProduct =async(data) => {
    setLoading(true)
    setInvalidFields([]);
    // const invalids = validate(payload,setInvalidFields)
    // if(invalids === 0) {
      if(data.category) data.category = categories?.find(el => el._id === data.category)?._id
      const finalPayload = {...data,...payload}
      const formData= new FormData()
      for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1])
      if(finalPayload.thumb) formData.append('thumb',finalPayload.thumb[0])
      if(finalPayload.images) {
        for(let image of finalPayload.images) formData.append('images',image)
      }
      const response = await apiCreateProducts(formData)
      setLoading(false)
      if(response.success){
        toast.success(response.message)
        reset()
        setPayload({
          thumb: '',
          image: []
        })
      }else toast.error(response.message)
    // } 
    
  }

  return (
 <>   
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold border-b-2 ">
        <span>Create Product</span>
      </h1>
       {loading ? <Loading /> :
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            label="Name products"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: 'Required fill',
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
                required: 'Required fill',
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
                required: 'Required fill',
              }}
              placeholder="Name of product"
            />
            <InputForm
              label="Color"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: 'Required fill',
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
                code: el._id,
                value: el.title,
              }))}
              validate={{
                required: 'Required fill',
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
                ?.find((el) => el._id === watch('category'))
                ?.brand?.map((el) => ({ code: el, value: el }))}
            />
          </div>
          <MarkDownEditor
            name="description"
            label="Description"
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <div className='flex flex-col gap-2 mt-6'>
            <label className='font-semibold' htmlFor="thumb">Upload thumb</label>
            <input  {...register('thumb', {required: 'Need fill'})} type="file" id="thumb"/>
            {errors['thumb'] && <small className="text-xs text-red-500">{errors['thumb']?.message}</small>}
          </div>
         {preview.thumb &&  <div className='my-3'>
            <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain'/>
          </div>}
          <div className='flex flex-col gap-2 my-6'>
            <label className='font-semibold' htmlFor="images">Upload image of product</label>
            <input  {...register('images', {required: 'Need fill'})} type="file" id="images" multiple/>
            {errors['images'] && <small className="text-xs text-red-500">{errors['images']?.message}</small>}
          </div>
          {preview.images.length > 0 &&  <div className='my-3 flex w-full gap-3 flex-wrap'>
            {preview.images?.map((el,index) => (
              <div onMouseEnter={() => setHoverElm(el.name)}
              onMouseLeave={() => setHoverElm(null)}
              key={index} className='w-fit relative'>
                <img  src={el.path} alt="images" className='w-[150px] object-cover'/>
                {/* {hoverElm === el.name && <div 
                onClick={() => handleRemoveImage(el.name)}
                className='absolute animate-scale-up-center inset-0 bg-overlay flex items-center justify-center'>
                  <IoTrashBinSharp size={32} color='white'/>
                  </div>} */}
              </div>
            ))}
          </div>}
         <div className='mt-6'>
        <Button type="submit">Tạo sản phẩm</Button>
         </div>
        </form>
      </div> }
    </div>
 
  </>
  )
}

export default CreateProduct
