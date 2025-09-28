import React from 'react'
import WeatherCard from './WeatherCard'

const DailyWeather = ({weatherData}) => {
  return (
    <div className='flex justify-around flex-wrap'>
      <WeatherCard 
        weatherIcon='Cloudy.svg' 
        iconAltText='sun and cloud icon' 
        data={weatherData?.cloudcover} 
        label='Cloud Cover' 
      />

      {
        weatherData?.datetimeEpoch < weatherData?.sunsetEpoch ?
        <WeatherCard 
          weatherIcon='Sunny.svg' 
          iconAltText='sun icon' 
          data='Day' 
          label='Day or Night?' 
        /> :
        <WeatherCard 
          weatherIcon='Night.svg' 
          iconAltText='moon icon' 
          data='Night' 
          label='Day or Night?' 
        />
      }

      <WeatherCard 
        weatherIcon='Sunny.svg' 
        iconAltText='UV index icon' 
        data={weatherData?.uvindex} 
        label='UV Index'
      />

      {
        (weatherData?.temp ?? 0) > 0 ?
        <WeatherCard 
          weatherIcon='Sunny.svg' 
          iconAltText='sun icon' 
          data={weatherData?.temp} 
          label='Temperature in Fahrenheit' 
        /> :
        <WeatherCard 
          weatherIcon='Snow.svg' 
          iconAltText='snow icon' 
          data={weatherData?.temp} 
          label='Temperature in Fahrenheit' 
        />
      }
    </div>
  )
}

export default DailyWeather