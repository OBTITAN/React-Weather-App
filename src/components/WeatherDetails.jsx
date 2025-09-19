import React from 'react'

const WeatherDetails = ({weatherMeasure, data, imagePath, altImageTxt}) => {
  return (
    <div className= 'flex flex-col justify-center items-center mb-[50px] md:mb-0'>
        <img src= {imagePath} alt={altImageTxt} className='h-[70px] w-[70px] mb-3'/>
        <p>
          {data? data : 'No Data Available'}
        </p>
        <p className='text-white font-extrabold text-2xl'>{weatherMeasure}</p>
    </div>
  )
}

export default WeatherDetails