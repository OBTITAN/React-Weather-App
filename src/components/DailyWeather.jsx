import React from 'react'
import WeatherCard from './WeatherCard'

const DailyWeather = ({weatherData}) => {
  return (
    <div className='flex justify-around flex-wrap'>
              <WeatherCard weatherIcon='Cloudy.svg' iconAltText='sun and cloud icon' data={weatherData.current?.cloudcover} label='cloudcover' />
              {
                weatherData.current?.is_day === 'yes' ?
                <WeatherCard weatherIcon='Sunny.svg' iconAltText='sun icon' data='Day' label='Day or Night?' />
                :
                  <WeatherCard weatherIcon='Night.svg' iconAltText='moon icon' data='Night' label='Day or Night?' />
              }
              <WeatherCard weatherIcon='Sunny.svg' iconAltText='thundercloud with rain icon' data={weatherData.current?.uv_index} label='UV Index'/>

              {
                weatherData.current?.temperature > 0 ?
                <WeatherCard weatherIcon='Sunny.svg' iconAltText='sun icon' data={weatherData.current?.temperature} label='Temperature in Farenheits' />
                :
                <WeatherCard weatherIcon='Snow.svg' iconAltText='snow icon' data={weatherData.current?.temperature} label='Temperature in Farenheits' />
              }
            </div>
  )
}

export default DailyWeather;