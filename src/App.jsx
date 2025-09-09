import { useState, useEffect } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'
import WeatherCard from './components/WeatherCard';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL= `https://api.weatherstack.com/current`

 const API_DETAILS ={
    method: 'GET',
    header: {
      Authorization: `BEARER${API_KEY}`,
      accept: 'application/json',
    }
  }
 
function App() {
  const [weatherData, setWeatherData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (query) => {
  try{
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${query}`);

      if(!response.ok){
        console.log('Could not fetch weather data');
      }

      const data =  await response.json;

      console.log(data);

    } catch(error){
    console.error("Error fetching weather data:", error);
  } finally {
    setIsLoading(false);
  }
}

useEffect(() =>{
  fetchWeatherData('New York');
},[])

  let currentDate = new Date().toLocaleDateString();
  const weatherState = 'Cloudy';

  return(
    <div>
          <div>
            <p class='font-extrabold text-left text-4xl mb-10'>Welcome</p>
          </div>
          <div class='bg-[#D3D3D3] mb-5 p-10 rounded-4xl h-50 flex justify-center items-center space-x-3'>
              <div class='text-white text-left ml-1 mr-auto'>
                <p class='font-extrabold text-3xl'>Some city</p>
                <p>{currentDate}</p>
                <p class='font-bold'>{weatherState}</p>
                <h1>API TEMP DATA</h1>
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

             <div class='flex justify-items-start flex-wrap mb-5 ml-12 space-x-20 text-left text-lg font-extrabold'>
               <p>Today</p>
               <p>Tomorrow</p>
               <p>Next 3 Days</p>
            </div>

            <div class='flex justify-around flex-wrap'>
              <WeatherCard weatherIcon='sun-cloud-icon.svg' iconAltText='sun and cloud icon' />
              <WeatherCard weatherIcon='sun-cloud-fast-wind-icon.svg' iconAltText='sun and cloud with wind icon' />
              <WeatherCard weatherIcon='cloud-angled-rain-zap-icon.svg' iconAltText='thumdercloud with rain icon' />
              <WeatherCard weatherIcon='cloud-angled-zap-icon.svg' iconAltText='thundercloud icon' />
            </div>



        </div>
  )
}

export default App
