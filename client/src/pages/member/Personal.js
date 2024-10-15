
import { Button, InputForm } from 'components';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import avatar from 'assets/Dinosaur.png'
import { apiUpdateUser } from 'apis';
import { toast } from 'react-toastify';
import { getCurrent } from 'store/user/asyncAction';
const Personal = () => {
  const {current} = useSelector(state => state.user)
  const {
    register,
    formState: { errors,isDirty},
    reset,
    handleSubmit,
    watch
  } = useForm();
  const dispatch = useDispatch()
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      email: current?.email,
      avatar: current?.avatar,
      mobile: current?.mobile,
    });
  },[current])

  const handleUpdateInfo = async(data) => {
    const formData = new FormData()
    if(data.avatar.length > 0) formData.append('avatar',data.avatar[0])
    delete data.avatar;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const response = await apiUpdateUser(formData)
    console.log(response);
    if(response.success) {
      dispatch(getCurrent())
      toast.success(response.message);
    }else toast.error(response.message)
  }
  return (
    <div className="w-full relative px-4 gap-3">
      <header className="text-3xl font-semibold py-4 border-b border-blue-400 ">
        Thông tin cá nhân
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfo)}
        className="w-4/5 mx-auto py-8 flex justify-between gap-8"
      >
        <div className="w-3/4 flex flex-col mx-auto  gap-4 relative ">
          <div className="w-[80%] flex flex-col gap-4 py-5">
            <InputForm
              label="First name"
              register={register}
              errors={errors}
              style="flex-col my-3"
              id="firstname"
              validate={{
                required: 'Required fill'
              }}
            />
            <InputForm
              label="Last name"
              register={register}
              errors={errors}
              style="flex-col my-3"
              id="lastname"
              validate={{
                required: 'Required fill',
                
              }}
            />
            <InputForm
              label="email address"
              register={register}
              errors={errors}
              style="flex-col my-3"
              id="email"
              validate={{
                required: 'Required fill',
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  message: 'Invalid email address'
                }
              }}
            />
            <InputForm
              label="Phone"
              register={register}
              errors={errors}
              style="flex-col my-3"
              id="mobile"
              validate={{
                required: 'Required fill',
                pattern: {
                  value:/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
                  message: 'Invalid phone number'
                }
              }}
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium">Account Status:</span>
              <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium">Account role:</span>
              <span>{+current?.role === 2002 ? 'Admin' : 'User'}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium">Account Status:</span>
              <span>{`Ngày tạo tài khoản: ${moment(current?.createdAt).format(
                'DD/MM/YYYY'
              )}`}</span>
            </div>
            <div className="flex justify-end w-full mt-2">
              {isDirty && <Button type="submit">Cập nhật thông tin </Button>}
            </div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-4 justify-center items-center">
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt=""
              className="w-60 h-60 object-cover rounded-full"
            />
          </label>
          <input type="file" id="file" {...register('avatar')} hidden/>
          <span className="font-medium">Profile images</span>
        </div>
      </form>
    </div>
  );
}

export default Personal