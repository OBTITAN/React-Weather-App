import React from 'react'

const WeatherDetails = ({weatherMeasure, data, imagePath, altImageTxt}) => {
  return (
    <div className= 'flex flex-col justify-center items-center mb-[50px] md:mb-0 text-white'>
        <img src= {imagePath} alt={altImageTxt} className='h-[70px] w-[70px] mb-3'/>
        <h1>
          {data? data : 'N/A'}
        </h1>
        <p className='font-extrabold text-2xl'>{weatherMeasure}</p>
    </div>
  )
}

export default WeatherDetails