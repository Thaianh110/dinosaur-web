import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams, useSearchParams, createSearchParams } from 'react-router-dom'
import { BreadCrumb, Product, SearchItem, InputSelect, Pagination } from 'components'
import { apiGetProducts } from 'apis'
import Masonry from 'react-masonry-css'
import { sorts } from 'ultils/contants'
import path from 'ultils/path'
import { useSelector } from 'react-redux'

// const breakpointColumnsObj = {
//   default: 4,
//   1100: 3,
//   700: 2,
//   500: 1
// }

const Products = () => {
  const navigate = useNavigate()
  const [activeClick, setActiveClick] = useState(null)
  const [products, setProducts] = useState(null)
  const [sort, setSort] = useState('')
  const {categories} = useSelector(state => state.app)
  const { category } = useParams()
  const [params] = useSearchParams()

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts({...queries,category})
    if (response.success) setProducts(response)
  }

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    let priceQuery = {}
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }]
      }
      delete queries.price
    } else {
      if (queries.from) {
        queries.price = { gte: queries.from }
      }
      if (queries.to) {
        queries.price = { lte: queries.to }
      }
    }
    delete queries.to
    delete queries.from
    const q = { ...priceQuery, ...queries }
    fetchProductsByCategory(q)
    window.scrollTo(0, 0)
  }, [params])
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null)
      } else {
        setActiveClick(name)
      }
    },
    [activeClick]
  )
  const changeValue = useCallback(
    (value) => {
      setSort(value)
    },
    [sort]
  )
  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${path.HOMESHOPPING}/${category}`,
        search: createSearchParams({
          sort
        }).toString()
      })
    }
  }, [sort])


  return (
    <div className="w-main">
      <div className=" h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">{categories?.find(item => item?.slug === category)?.title }</h3>
          <BreadCrumb category={categories?.find(item => item?.slug === category)?.title} />
        </div>
      </div>
      <div className=" bg-gray-100 w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Lọc theo</span>
          <div className="flex items-center gap-4">
            <SearchItem name="Price" activeClick={activeClick} changeActiveFilter={changeActiveFilter} type="input" />
            <SearchItem name="Color" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
          </div>
        </div>
        <div className="w-1/5 flex flex-col">
          <span className="font-semibold text-sm"> Sort by</span>
          <div className="w-full bg-gray-100">
            <InputSelect changeValue={changeValue} value={sort} options={sorts} />
          </div>
        </div>
      </div>
      <div className="mt-8 w-main m-auto ">
        <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {products?.products?.map((el) => (
            <Product key={el._id} pid={el.id} productData={el} />
          ))}
        </Masonry>
      </div>
      <div className="w-main m-auto my-4 flex justify-center">
        <Pagination totalCount={products?.counts} />
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  )
}

export default Products
