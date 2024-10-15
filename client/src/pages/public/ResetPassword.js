import React, { useState } from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import {apiResetPassword} from '../../apis/user'
import { toast } from 'react-toastify'
const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const {token} = useParams()

  const handleResetPassword = async() => {
    const response = await apiResetPassword({password,token})
    
    if(response.success) {
      toast.success(response.mes,{theme: 'colored'})
   }else {
     toast.info(response.mes, {theme: 'colored'})
   }
  }
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay z-10 flex flex-col items-center py-8 ">
      <div className="flex flex-col ">
        <label htmlFor="password" className="text-text2">
          Nhập password mới của bạn
        </label>
        <input
          type="text"
          id="password"
          className="max-w-[400px] border-b-2 outline-none"
          placeholder="EXP: thaianh@gmail.com"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end gap-4">
          <Button handleOnClick={handleResetPassword}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword