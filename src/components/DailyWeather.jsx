import React from 'react'
import WeatherCard from './WeatherCard'

const DailyWeather = ({weatherData}) => {
  return (
    <div className='flex justify-around flex-wrap'>
              <WeatherCard weatherIcon='Cloudy.svg' iconAltText='sun and cloud icon' data={weatherData.currentConditions?.cloudcover} label='cloudcover' />

              {
                weatherData.currentConditions?.datetimeEpoch < weatherData.currentConditions?.sunsetEpoch ?
                <WeatherCard weatherIcon='Sunny.svg' iconAltText='sun icon' data='Day' label='Day or Night?' />
                :
                  <WeatherCard weatherIcon='Night.svg' iconAltText='moon icon' data='Night' label='Day or Night?' />
              }

              <WeatherCard weatherIcon='Sunny.svg' iconAltText='thundercloud with rain icon' data={weatherData.currentConditions?.uvindex} label='UV Index'/>

              {
                weatherData.currentConditions?.temp > 0 ?
                <WeatherCard weatherIcon='Sunny.svg' iconAltText='sun icon' data={weatherData.currentConditions?.temp} label='Temperature in Farenheit' />
                :
                <WeatherCard weatherIcon='Snow.svg' iconAltText='snow icon' data={weatherData.currentConditions?.temp} label='Temperature in Farenheit' />
              }
            </div>
  )
}

export default DailyWeather;