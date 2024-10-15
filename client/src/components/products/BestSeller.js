import React from 'react'
import { useState, useEffect } from 'react'
import { apiGetProducts } from '../../apis/index'
import { CustomSlider } from 'components'
import { getNewProducts } from '../../store/product/asyncAction'
import { useDispatch, useSelector } from 'react-redux'

const tabs = [
  { id: 1, name: 'best seller' },
  { id: 2, name: 'new arrivals' }
]

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const [products, setProducts] = useState(null)
  const dispatch = useDispatch()

  const { newProducts } = useSelector((state) => state.products)

  const fetchProduct = async () => {
    const response = await apiGetProducts({ sort: '-sold' })
    if (response.success) {
      setBestSeller(response.products)
      setProducts(response.products)
    }
  }
  useEffect(() => {
    fetchProduct()
    dispatch(getNewProducts())
  }, [])
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSeller)
    if (activeTab === 2) setProducts(newProducts)
  }, [activeTab])
  return (
    <div>
      <div className="flex flex-wrap text-[20px] gap-8 pb-4 border-b-4 border-primary ">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase cursor-pointer ${activeTab === el.id ? 'text-primary' : 'text-text1'}`}
            onClick={() => setActiveTab(el.id)}>
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 ">
        <CustomSlider products={products} activeTab={activeTab} />
      </div>
    </div>
  )
}

export default BestSeller
