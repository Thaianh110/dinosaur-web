import React, { useState, useEffect } from 'react'
import { AnimalCard } from '..'
import { apiGetAnimals } from '../../apis'

const Animal = () => {
  const [animal, setAnimals] = useState(null)
  const fetchAnimal = async () => {
    const response = await apiGetAnimals({ limit: 3, page: 1 })
    if (response.success) setAnimals(response.Animals)
  }
  useEffect(() => {
    fetchAnimal()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center relative z-[1]">
      <div className="flex flex-col justify-between w-full max-w-[1300px] gap-3 relative">
        <h1 className="text-[52px] font-semibold text-center mt-5 text-primary">Animals</h1>
        <p className="text-[20px] text-text1 font-semibold text-center mt-5 text-text-secondary mb-10">
          Khủng long luôn là đề tài nóng hỏi
          <br />
          thu hút những con người đam mê tìm hiểu về các động vật cổ đại
        </p>
        <div className="flex flex-wrap justify-center gap-12 w-full mt-5">
          {animal?.map((el) => (
            <AnimalCard
              image={el.images[0] || 'https://tse3.mm.bing.net/th?id=OIP.mhEjokf4cHBCeCsOqohUdwHaHa&pid=Api&P=0&h=220'}
              common_name={el.common_name}
              weight={el.weight}
              height={el.height}
              description={el.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Animal
