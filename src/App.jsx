import { useState } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'
import WeatherCard from './components/WeatherCard';

function App() {
  let currentDate = new Date().toLocaleDateString();
  const weatherState = 'Cloudy';

  return(
    <div>
          <div>
            <p class='font-extrabold text-left text-4xl mb-10'>Welcome</p>
          </div>
          <div class='bg-[#D3D3D3] mb-5 p-10 rounded-4xl h-50 flex justify-center items-center space-x-3'>
              <div class='text-white text-left ml-1 mr-auto'>
                <p>{currentDate}</p>
                <p class='font-bold'>{weatherState}</p>
                <h1> Exact Temp would be here</h1>
              </div>

              <div class=',mr-3 ml-auto'>
                {weatherState == 'Cloudy'
                ?(<img src='Cloudy.svg' alt='cloudy' class='h-[100px] w-[100px]'/>)
                :weatherState == 'Sunny'
                ?(<img src='Sunny.svg' alt='sunny' class='h-[100px] w-[100px]'/>)
                :weatherState == 'Rainy'
                ?(<img src='Rainy.svg' alt='rainy' class='h-[100px] w-[100px]'/>)
                :(<img src='Cloudy.svg' alt='cloudy' class='h-[100px] w-[100px]'/>)
                }
              </div>
            </div>

            <div class='bg-[#D3D3D3] p-20 mb-7 rounded-4xl h-70 flex justify-around items-center space-x-3'>
                 <WeatherDetails weatherMeasure = 'Wind' imagePath = 'fast-wind.svg' altImageTxt = 'Wind Image'/>

                 <WeatherDetails weatherMeasure = 'Humidity' imagePath = 'humidity.svg' altImageTxt = 'Humidity Image'/>

                 <WeatherDetails weatherMeasure = 'Rain' imagePath = 'precepitation.svg' altImageTxt = 'Precipitation Image'/>
            </div>

             <div class='flex justify-items-start mb-5 ml-12 space-x-20 text-left text-lg font-extrabold'>
               <p>Today</p>
               <p>Tomorrow</p>
               <p>Next 3 Days</p>
            </div>

            <div class='min-sm:columns-1 min-sm:mx-auto md:flex md:justify-around '>
              <WeatherCard weatherIcon='sun-cloud-icon.svg' iconAltText='sun and cloud icon' />
              <WeatherCard weatherIcon='sun-cloud-fast-wind-icon.svg' iconAltText='sun and cloud with wind icon' />
              <WeatherCard weatherIcon='cloud-angled-rain-zap-icon.svg' iconAltText='thumdercloud with rain icon' />
              <WeatherCard weatherIcon='cloud-angled-zap-icon.svg' iconAltText='thundercloud icon' />
            </div>



        </div>
  )
}

export default App
