import React from 'react'

const WeatherDetails = ({weatherMeasure, imagePath, altImageTxt}) => {
  return (
    <div class= 'flex flex-col justify-center items-center'>
        <img src= {imagePath} alt={altImageTxt} class='h-[70px] w-[70px] mb-3'/>
        <p>API data here</p>
        <p class='text-white font-extrabold text-2xl'>{weatherMeasure}</p>
    </div>
  )
}

export default WeatherDetails