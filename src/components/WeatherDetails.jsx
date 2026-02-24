import React from 'react'

const WeatherDetails = ({ weatherMeasure, data, imagePath, altImageTxt }) => {
  return (
    <div className='flex flex-col justify-center items-center p-6 text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl w-full md:w-[200px] hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'>
      <img src={imagePath} alt={altImageTxt} className='h-[60px] w-[60px] mb-4 drop-shadow-md' />
      <h1 className='text-3xl font-bold mb-1'>
        {data ? data : 0}
      </h1>
      <p className='font-medium text-lg text-white/80'>{weatherMeasure}</p>
    </div>
  )
}

export default WeatherDetails