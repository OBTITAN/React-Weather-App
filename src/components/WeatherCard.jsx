import React from 'react'
//Each weather card gives the general warning for the day
const WeatherCard = ({weatherIcon, iconAltText}) => {
  return (
    <div className='bg-gray-700 h-60 w-50 rounded-4xl flex flex-col justify-center items-center m-5 p-5 space-y-3'>
      <p>Stuff</p>
      <img src={weatherIcon} alt={iconAltText} className='h-[70px] w-[70px]'/>
      <p>Some temperature in degrees celcuis</p>
    </div>
  )
}

export default WeatherCard