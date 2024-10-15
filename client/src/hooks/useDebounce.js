import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
      

    const setTimeOutID = setTimeout(() => {
      setDebounceValue(value)
    }, ms)
        return () => {
          clearTimeout(setTimeOutID)
      }  
        
  }, [value, ms])
  return  debounceValue
}

export default useDebounce

//khi nhập thay đổi giá sẽ gọi api
// vấn đê khi dùng onchange là khi gõ 1 số thì sẽ gọi api 1 lần => gọi nhiều lần
// resolve : chỉ call api khi người dùng nhập xong
// thoi gian onchange

// tach value set cho onchange là price thanh 2 bien
// 1 bien de phuc vu ui , gõ tới đâu lưu tới đó
// 1 bién phục vụ ux , dùng để quyết định call api => setimeout => bien se dc gan sau 1 khoang time
