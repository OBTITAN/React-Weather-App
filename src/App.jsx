import { useState } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'

function App() {
  let currentDate = new Date().toLocaleDateString();
  const weatherState = 'Cloudy';

  return(
    <div>
          <div class = 'bg-[hans-RdwLQlo5AYc-unsplash.jpg]'>
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
                :(<p>no image at the time</p>)}
              </div>
            </div>

            <div class='bg-[#D3D3D3] p-20 rounded-4xl h-70 flex justify-around items-center space-x-3'>
                 <WeatherDetails weatherMeasure = 'Wind' imagePath = 'fast-wind.svg' altImageTxt = 'Wind Image'/>

                 <WeatherDetails weatherMeasure = 'Humidity' imagePath = 'humidity.svg' altImageTxt = 'Humidity Image'/>

                 <WeatherDetails weatherMeasure = 'Rain' imagePath = 'precepitation.svg' altImageTxt = 'Precipitation Image'/>

            </div>



        </div>
  )
}

export default App
