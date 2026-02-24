import React from 'react'
//Each weather card gives the general warning for the day
const WeatherCard = ({ weatherIcon, iconAltText, data, label }) => {
  return (
    <div className='weather-card bg-white/10 backdrop-blur-md border border-white/20 shadow-xl h-60 w-50 rounded-3xl flex flex-col justify-center items-center m-4 p-5 space-y-4 text-white font-medium hover:bg-white/20 transition-all duration-300 hover:-translate-y-2'>
      <p className='text-3xl font-bold'>{data ? data : "N/A"}</p>
      <img src={weatherIcon} alt={iconAltText} className='h-[80px] w-[80px] drop-shadow-lg' />
      <p className='text-center text-sm text-white/80'>{label}</p>
    </div>
  )
}

export default WeatherCard