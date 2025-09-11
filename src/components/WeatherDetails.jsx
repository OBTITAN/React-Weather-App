import React from 'react'

const WeatherDetails = ({weatherMeasure, imagePath, altImageTxt}) => {
  return (
    <div className= 'flex flex-col justify-center items-center'>
        <img src= {imagePath} alt={altImageTxt} className='h-[70px] w-[70px] mb-3'/>
        <p>18</p>
        <p className='text-white font-extrabold text-2xl'>{weatherMeasure}</p>
    </div>
  )
}

export default WeatherDetails