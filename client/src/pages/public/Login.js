import React, { useState, useCallback, useEffect } from 'react'
import bglogin from '../../assets/login.jpg'
import { Button, InputFields } from '../../components'
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis'
import Swal from 'sweetalert2'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { headContainerAnimation, headContentAnimation } from '../../ultils/animate3d/motion'
import { validate } from 'ultils/helper'
import path from '../../ultils/path'
import { login } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { apiFinalRegister } from '../../apis'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: ''
  })
  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: ''
    })
  }
  const [isVerifyEmail, setIsVerifyEmail] = useState(false)
  const [token, setToken] = useState('')
  const [invalidFields, setInvalidFields] = useState([])
  const [email, setEmail] = useState('')
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('redirect'));
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    if (response.success) {
      toast.success(response.mes, { theme: 'colored' })
    } else {
      toast.info(response.mes, { theme: 'colored' })
    }
  }

  useEffect(() => {
    resetPayload()
  }, [isRegister])

  useEffect(() =>{

  }
  )
  //SUBMIT

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload
    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload)
        if (response.success) {
          setIsVerifyEmail(true)
        } else {
          Swal.fire('Failed', response.message, 'error')
        }
      } else {
        const rs = await apiLogin(data)
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData
            }))
            searchParams.get('redirect') ? navigate(searchParams.get('redirect')) :navigate(`/${path.HOME}`)
        } else {
          Swal.fire('Failed', rs.message, 'error')
        }
      }
    }
  }, [payload, isRegister])
  const finalRegister = async () => {
    const response = await apiFinalRegister(token)
    if (response.success) {
      Swal.fire('Congratulation', response.message, 'success').then(() => {
        setIsRegister(false)
        resetPayload()
      })
    } else {
      Swal.fire('Failed', response.message, 'error')
    }
    setIsVerifyEmail(false)
    setToken('')
  }
  return (
    <div className="w-screen h-screen relative ">
      <motion.div {...headContainerAnimation}>
        {isVerifyEmail && (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-10 flex flex-col justify-center items-center py-8 ">
            <div className="bg-white w-[500px] rounded-md p-8">
              <h4>Vui lòng kiểm tra mã đăng ký qua email bạn vừa đăng ký</h4>
              <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className="p-2 border rounded-md outline-none" />
              <button type="button" className="px-4 py-2 font-semibold bg-primary text-text1 rounded-md ml-4" onClick={finalRegister}>
                Submit
              </button>
            </div>
          </div>
        )}

        {isForgotPassword && (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-10 flex flex-col items-center py-8 ">
            <div className="flex flex-col ">
              <label htmlFor="email" className="text-text2">
                Nhập email của bạn để lấy lại mật khẩu
              </label>
              <input
                type="text"
                id="email"
                className="max-w-[400px] border-b-2 outline-none"
                placeholder="EXP: thaianh@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex items-center justify-end gap-4">
                <Button handleOnClick={handleForgotPassword}>Xác nhận</Button>
                <Button handleOnClick={() => setIsForgotPassword(false)}>Về trang chủ</Button>
              </div>
            </div>
          </div>
        )}
        <img src={bglogin} alt="" className="w-full h-full object-cover" />

        <div className="absolute top-0 bottom-0 left-1/2 right-1/2 items-center justify-center flex">
          <motion.div {...headContentAnimation}>
            <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] ">
              <h1 className="text-[24px] font-main text-primary mb-8">{isRegister ? 'Register' : 'Login'}</h1>
              {isRegister && (
                <div className="flex items-center gap-2">
                  <InputFields
                    fullWidth
                    value={payload.firstname}
                    setValue={setPayload}
                    nameKey="firstname"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                  <InputFields
                    fullWidth
                    value={payload.lastname}
                    setValue={setPayload}
                    nameKey="lastname"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                </div>
              )}
              <InputFields
                fullWidth
                value={payload.email}
                setValue={setPayload}
                nameKey="email"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              {isRegister && (
                <InputFields
                  fullWidth
                  value={payload.mobile}
                  setValue={setPayload}
                  nameKey="mobile"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              )}
              <InputFields
                fullWidth
                value={payload.password}
                setValue={setPayload}
                nameKey="password"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                type="password"
              />
              <Button handleOnClick={handleSubmit} fw>
                {isRegister ? 'Register' : 'Login'}
              </Button>
              <div className="w-full flex items-center justify-between my-2 text-sm">
                {!isRegister && (
                  <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsForgotPassword(true)}>
                    Forgot your account?
                  </span>
                )}
                {!isRegister && (
                  <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsRegister(true)}>
                    Create account?
                  </span>
                )}
                {isRegister && (
                  <span className="text-blue-500 hover:underline cursor-pointer w-full text-center" onClick={() => setIsRegister(false)}>
                    Back Login
                  </span>
                )}
              </div>
              <Link className="text-blue-500 hover:underline cursor-pointer" to={`/${path.HOME}`}>
                Về trang chủ
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
