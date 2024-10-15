import React, { useEffect, useState, useCallback } from 'react'
import { apiGetAllUser, apiUpdateUserByAdmin, apiDeleteUserByAdmin } from 'apis'
import moment from 'moment'
import { InputFields, Pagination, InputForm, Select, Button } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { blockUser, roleUser } from 'ultils/contants'
const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    mobile: '',
    role: '',
    phone: '',
    isBlocked: ''
  })

  const [user, setUser] = useState(null)
  const [queries, setQueries] = useState({
    q: ''
  })
  const [update, setUpdate] = useState(null)

  const rerender = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const [editElm, setEditElm] = useState(null)
  const [params] = useSearchParams()

  const fetchUsers = async (params) => {
    const response = await apiGetAllUser({ ...params, limit: 2 })
    if (response.success) setUser(response)
  }
  useEffect(() => {
    if (editElm) {
      reset({
        email: editElm.email,
        firstname: editElm.firstname,
        lastname: editElm.lastname,
        mobile: editElm.mobile,
        role: editElm.role
      })
    }
  }, [editElm, reset])

  const queriesDebounce = useDebounce(queries.q, 800)

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries)
  }, [queriesDebounce, params, update])

  const handleUpdateUser = async (data) => {
    const response = await apiUpdateUserByAdmin(data, editElm._id)
    if (response.success) {
      setEditElm(null)
      rerender()
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  const handleDeleteUser = async(uid) => {
    Swal.fire({
      title: "Xoá người dùng?",
      text: "Bạn muốn xoá người này chứ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteUserByAdmin(uid);
        if (response.success) {
          rerender();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  }

  return (
    <div className="w-full">
      <h1 className="h-[75px] px-4 flex justify-between items-center text-3xl font-bold border-b-2">
        <span> Manage User</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputFields nameKey={'q'} value={queries.q} setValue={setQueries} style={'w400'} placeholder="Tìm kiếm user" isHideLabel />
        </div>
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold text-white bg-gray-500 text-[13px] border border-blue-300">
            <tr className="text-lg">
              <th className="px-4 py-2 ">#</th>
              <th className="px-4 py-2 ">email address</th>
              <th className="px-4 py-2 ">họ </th>
              <th className="px-4 py-2 ">tên</th>
              <th className="px-4 py-2 ">role</th>
              <th className="px-4 py-2 ">sdt</th>
              <th className="px-4 py-2 ">status</th>
              <th className="px-4 py-2 ">created At</th>
              <th className="px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.users?.map((el, index) => (
              <tr className="bg-gray-100 border border-blue-400" key={el._id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <span>{el.email}</span>
                </td>
                <td className="py-2 px-4 ">
                  <span>{el.lastname}</span>
                </td>
                <td className="py-2 px-4 ">
                  <span>{el.firstname}</span>
                </td>
                <td className="py-2 px-4">
                  <span>{roleUser.find((role) => role.code === el.role)?.value}</span>
                </td>
                <td className="py-2 px-4">
                  <span>{el.mobile}</span>
                </td>
                <td className="py-2 px-4">
                  <span>{el.isBlocked ? 'Block' : 'Active'}</span>
                </td>
                <td className="py-2 px-4">{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                <td className="py-2 px-4">
                  <span onClick={() => setEditElm(el)} className="text-orange-600 px-2 hover:underline cursor-pointer ">
                    Edit
                  </span>
                  <span onClick={() => handleDeleteUser(el._id)} className="text-orange-600 px-2 hover:underline cursor-pointer ">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editElm && (
          <div className="absolute top-0 right-0 bottom-0 w-[500px] bg-gray-200">
            <form onSubmit={handleSubmit(handleUpdateUser)}>
              <div>
                <span className="text-lg font-medium capitalize text-left">chỉnh sửa người dùng</span>
                <td className=" flex flex-col gap-7 my-8 capitalize ">
                  <tr className="text-left px-4">
                    <InputForm
                      register={register}
                      defaultValue={editElm?.email}
                      fullWidth
                      errors={errors}
                      id={'email'}
                      label={'email'}
                      validate={{
                        required: 'required fill',
                        pattern: {
                          value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                          message: 'Invalid email address'
                        }
                      }}
                    />
                  </tr>
                  <tr className=" text-left px-4">
                    <InputForm
                      register={register}
                      defaultValue={editElm?.lastname}
                      fullWidth
                      errors={errors}
                      id={'lastname'}
                      label={'lastname'}
                      validate={{ required: 'required fill' }}
                    />
                  </tr>
                  <tr className="text-left px-4">
                    <InputForm
                      register={register}
                      defaultValue={editElm?.firstname}
                      fullWidth
                      errors={errors}
                      id={'firstname'}
                      label={'firstname'}
                      validate={{ required: 'required fill' }}
                    />
                  </tr>
                  <tr className="text-left px-4">
                    <Select
                      register={register}
                      defaultValue={editElm?.role}
                      label={'role'}
                      errors={errors}
                      id={'role'}
                      fullWidth
                      validate={{
                        required: 'required fill'
                      }}
                      option={roleUser}
                    />
                  </tr>
                  <tr className="text-left px-4">
                    <InputForm
                      register={register}
                      defaultValue={editElm?.mobile}
                      fullWidth
                      label={'mobile'}
                      errors={errors}
                      id={'mobile'}
                      validate={{
                        required: 'required fill',
                        pattern: {
                          value: /^[62|0]+\d{9}/gi,
                          message: 'Invalid phone number'
                        }
                      }}
                    />
                  </tr>
                  <tr className="text-left flex px-4">
                    <Select
                      register={register}
                      defaultValue={editElm?.isBlocked}
                      label={'isBlocked'}
                      errors={errors}
                      fullWidth
                      id={'isBlocked'}
                      validate={{
                        required: 'required fill'
                      }}
                      option={blockUser}
                    />
                  </tr>
                </td>
              </div>
              <div className="flex gap-5 justify-center items-center">
                <Button type="submit"> Cập nhật</Button>
                <Button handleOnClick={() => setEditElm(null)}> Huỷ bỏ</Button>
              </div>
            </form>
          </div>
        )}
        <div className="w-full text-right">
          <Pagination totalCount={user?.counts} />
        </div>
      </div>
    </div>
  )
}

export default ManageUser
