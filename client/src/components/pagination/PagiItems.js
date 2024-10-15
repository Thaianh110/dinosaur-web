import React, { useEffect } from 'react'
import clsx from 'clsx'
import { createSearchParams, useNavigate, useSearchParams,useLocation } from 'react-router-dom'
const PagiItems = ({ children }) => {
    const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const handlePagination = () => {
        const queries = Object.fromEntries([...params])
        if (Number(children)) queries.page = children
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString()
        })
    }
    useEffect(() => {

    },[])

    return (
      <button
        type="button"
        disabled={!Number(children)}
        onClick={handlePagination}
        className={clsx(
          'w-10 h-10 flex justify-center ',
          !Number(children) && 'items-end pb-2',
          Number(children) && 'items-center hover:rounded-full  hover:bg-slate-500',
          params.get('page') === +children && 'rounded-full bg-primary',
          !+params.get('page') && +children === 1 && 'rounded-full bg-primary'
        )}>
        {children}
      </button>
    )
}

export default PagiItems
