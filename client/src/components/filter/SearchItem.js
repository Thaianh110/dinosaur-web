import React, { useEffect, useState } from 'react'
import icons from '../../ultils/icons'
import { colors } from '../../ultils/contants'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import path from '../../ultils/path'
import { apiGetProducts } from '../../apis'
import useDebounce from '../../hooks/useDebounce'

const { FaAngleDown } = icons
const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [selected, setSelected] = useState([])
  const [price, setPrice] = useState({
    from: '',
    to: ''
  })
  const [bestPrice, setBestPrice] = useState(null)
  const { category } = useParams()
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value)
    if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value))
    else setSelected((prev) => [...prev, e.target.value])
    changeActiveFilter(null)
  }
  const fetchHigherPriceProdutc = async () => {
    const response = await apiGetProducts({ sort: '-price', limit: 1 })
    if (response.success) setBestPrice(response.products[0]?.price)
  }

  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of param) queries[i[0]] = i[1]
    if (selected.length > 0) {
      queries.color = selected.join(',')
      queries.page = 1
    } else delete queries.color
    navigate({
      pathname: `/${path.HOMESHOPPING}/${category}`,
      search: createSearchParams(queries).toString()
    })
  }, [selected])
  useEffect(() => {
    if (type === 'input') fetchHigherPriceProdutc()
  }, [type])
  useEffect(() => {
    if (price.from && price.to && price.from > price.to) alert('Gia khong duoc cao hon')
  }, [price])

  const debouncePriceFrom = useDebounce(price.from, 500)
  const debouncePriceTo = useDebounce(price.to, 500)
  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of param) queries[i[0]] = i[1]
    if (Number(price.from) > 0) queries.from = price.from
    else delete queries.from
    if (Number(price.to) > 0) queries.to = price.to
    else delete queries.to
    queries.page = 1
    navigate({
      pathname: `/${path.HOMESHOPPING}/${category}`,
      search: createSearchParams(queries).toString()
    })
  }, [debouncePriceFrom, debouncePriceTo])

  return (
    <div
      className="p-3 cursor-pointer text-xs relative border gap-6 bg-gray-100 flex items-center justify-between"
      onClick={() => changeActiveFilter(name)}>
      <span className="capitalize">{name}</span>
      <FaAngleDown />
      {activeClick === name && (
        <div className="bg-gray-50 absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 min-w-[150px] ">
          {type === 'checkbox' && (
            <div className="p-2">
              <div className="p-2 items-center flex justify-between gap-8">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected([])
                    changeActiveFilter(null)
                  }}
                  className="underline cursor-pointer hover:text-primary">
                  reset
                </span>
              </div>
              <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-3">
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      value={el}
                      onClick={handleSelect}
                      id={el}
                      checked={selected.some((selectitem) => selectitem === el)}
                      className='class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === 'input' && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-2 items-center flex justify-between gap-8">
                <span className="whitespace-nowrap">{`Giá cao nhât là ${Number(bestPrice).toLocaleString()} VND`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setPrice({ from: '', to: '' })
                    changeActiveFilter(null)
                  }}
                  className="underline cursor-pointer hover:text-primary">
                  reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from"> From</label>
                  <input
                    className="p-2 border"
                    type="number"
                    value={price.from}
                    id="from"
                    onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to"> to</label>
                  <input
                    className="p-2 border"
                    type="number"
                    value={price.to}
                    id="to"
                    onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchItem
