import { useState, useEffect } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'
import WeatherCard from './components/WeatherCard';
import Search from './components/Search';
import Spinner from './components/Spinner';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL= `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`

 
function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const weatherInfo = "";


  const fetchWeatherData = async (locationQuery) => {
      try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}${locationQuery}?unitGroup=us&key=${API_KEY}&contentType=json`);
 
      if (!response.ok) {
        setError('Could not fetch weather data');
        console.log(response.status, response.statusText);
      } else {
        const data = await response.json();
        setWeatherData(data);
        weatherInfo = data.currentConditions;
        console.log(data);
        setError('');
      }

    } catch (error) {
      setError('An error occurred while fetching weather data');
      console.log(error);

    } finally {
      setIsLoading(false);
    }
}



useEffect(() =>{
  if(location){
    fetchWeatherData(location);
  }
},[location])


  let currentDate = new Date().toLocaleDateString();

  return(
    <div>
          <div>
            <p className='font-extrabold text-left text-4xl mb-10'>Welcome</p>
          </div>

          <div className="mb-10">
            <Search setSearchTerm={setLocation}/>
          </div>

          <div className='bg-[#D3D3D3] mb-5 p-10 rounded-4xl h-50 flex justify-center items-center space-x-3'>

              {isLoading? (<Spinner />)
              : error? (<p className='text-red-500 font-bold'>{error}</p>)
              :(
                <div className='text-white text-left ml-1 mr-auto'>
                <div className='font-extrabold text-3xl'>
                  {weatherData.resolvedAddress}
                </div>
                <p>{currentDate}</p>
                <p className='font-bold'>{weatherData.currentConditions?.conditions}</p>
                <h1>{weatherData.currentConditions?.temp} °F</h1>
              </div>
              
              )

              }

              <div className=',mr-3 ml-auto'>
                {
                  (<img src='Cloudy.svg' alt='cloudy' className='h-[100px] w-[100px]'/>)
                }
              </div>
            </div>

            <div className='bg-[#D3D3D3] p-20 mb-7 rounded-4xl h-70 flex justify-around items-center space-x-3'>
                 <WeatherDetails weatherMeasure = 'Wind' imagePath = 'fast-wind.svg' altImageTxt = 'Wind Image'/>

                 <WeatherDetails weatherMeasure = 'Humidity' imagePath = 'humidity.svg' altImageTxt = 'Humidity Image'/>

                 <WeatherDetails weatherMeasure = 'Rain' imagePath = 'precepitation.svg' altImageTxt = 'Precipitation Image'/>
            </div>

             <div className='flex justify-items-start flex-wrap mb-5 ml-12 space-x-20 text-left text-lg font-extrabold'>
               <p>Today</p>
               <p>Tomorrow</p>
               <p>Next 3 Days</p>
            </div>

            <div className='flex justify-around flex-wrap'>
              <WeatherCard weatherIcon='sun-cloud-icon.svg' iconAltText='sun and cloud icon' />
              <WeatherCard weatherIcon='sun-cloud-fast-wind-icon.svg' iconAltText='sun and cloud with wind icon' />
              <WeatherCard weatherIcon='cloud-angled-rain-zap-icon.svg' iconAltText='thumdercloud with rain icon' />
              <WeatherCard weatherIcon='cloud-angled-zap-icon.svg' iconAltText='thundercloud icon' />
            </div>



        </div>
  )
}

export default App
