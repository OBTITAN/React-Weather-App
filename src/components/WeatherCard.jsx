import React from 'react'
//Each weather card gives the general warning for the day
const WeatherCard = ({weatherIcon, iconAltText, data,label}) => {
  return (
    <div className='bg-gray-700 h-60 w-50 rounded-4xl flex flex-col justify-center items-center m-5 p-5 space-y-3 text-white font-bold'>
      <p className='text-2xl font-extrabold'>{data? data : "Data not available"}</p>
      <img src={weatherIcon} alt={iconAltText} className='h-[70px] w-[70px]'/>
      <p>{label}</p>
    </div>
  )
}

export default WeatherCard