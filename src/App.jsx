import { useState, useEffect } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'
import WeatherCard from './components/WeatherCard';
import Search from './components/Search';
import Spinner from './components/Spinner';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL= `http://api.weatherstack.com/current`

 
function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchWeatherData = async (locationQuery) => {
      try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${locationQuery}`);
 
      if (!response.ok) {
        setError('Could not fetch weather data');
        console.log(response.status, response.statusText);
      } else {
        const data = await response.json();
        setWeatherData(data);
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

const getWeatherIcon = (description) => {
  if (!description) return 'Sunny.svg';
  
  description = description.toLowerCase();
  
  if (description.includes('sunny') || description.includes('clear')) {
    return 'Sunny.svg';
  } else if (description.includes('rain') || description.includes('drizzle') || description.includes('shower')) {
    return 'Rain.svg';
  } else if (description.includes('thunder') || description.includes('storm') || description.includes('lightning')) {
    return 'Scattered-thunderstorm.svg';
  } else if (description.includes('wind') || description.includes('gust') || description.includes('breezy')) {
    return 'Wind.svg';
  } else if (description.includes('cloudy') || description.includes('overcast') || description.includes('cloud')) {
    return 'Cloudy.svg';
  } else if (description.includes('fog') || description.includes('mist')) {
    return 'Fog.svg';
  } else if (description.includes('snow')) {
    return 'Snow.svg';
  } else if (description.includes('sleet')) {
    return 'Sleet.svg';
  } else if (description.includes('hail')) {
    return 'Hail.svg';
  } else {
    return 'Sunny.svg';
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
          <div className='text-white text-center mb-10'>
            <p className='font-extrabold text-4xl'>Weather App</p>
          </div>

          <div className="mb-10">
            <Search setSearchTerm={setLocation}/>
          </div>
          {location == null
          ? (<div className='text-center text-2xl font-bold text-white'>Please enter a location to get the weather information</div>)
          :
          (
          <div className='max-w-screen mx-auto'>


          <div className='bg-gray-700 mb-5 p-10 rounded-4xl h-100  md:h-50 flex justify-center items-center  flex-wrap space-x-3'>
              {isLoading? (<Spinner />)
              : error? (<p className='text-red-500 font-bold'>{error}</p>)
              :(
                <div className='flex justify-between items-center w-full'>
                  <div className='text-white text-left ml-1 mr-auto'>
                  <div className='font-extrabold text-3xl'>
                    {weatherData.location?.name}, {weatherData.location?.country} 
                  </div>
                  <p>{currentDate}</p>
                  <p className='font-bold'>{weatherData.current?.weather_descriptions[0]}</p>
                  <h1>{weatherData.current?.temperature} °F</h1>
                </div>

                <div className=',mr-3 ml-auto'>
                 <img 
                    src={getWeatherIcon(weatherData.current?.weather_descriptions[0])}
                    alt={weatherData.current?.weather_descriptions[0] || 'weather icon'}
                    className='h-[100px] w-[100px]'
                  />
                </div>

              </div>
              
              )

              }

            </div>

            <div className='bg-gray-700 p-20 mb-7 rounded-4xl h-160 md:h-70 flex justify-center items-center space-x-3'>
              {isLoading? (<Spinner />)
              : error? (<p className='text-red-500 font-bold'>{error}</p>)
              :(
                <div className='md:flex md:justify-around md:items-center md:space-y-0 md:w-full  '>
                    <WeatherDetails weatherMeasure = 'Wind' data = {weatherData.current?.wind_speed} imagePath = 'Wind.svg' altImageTxt = 'Wind Image'/>

                    <WeatherDetails weatherMeasure = 'Humidity' data = {weatherData.current?.humidity} imagePath = 'Drizzle.svg' altImageTxt = 'Humidity Image'/>

                    <WeatherDetails weatherMeasure = 'Rain' data = {weatherData.current?.precip} imagePath = 'Rain.svg' altImageTxt = 'Precipitation Image'/>
                </div>
              )
              }
            </div>

             <div className='flex justify-center items-center flex-wrap mb-5  space-x-20 text-white text-center text-lg font-extrabold'>
               <p className='hover:text-gray-600 dark:hover:text-blue-600'>Today</p>
               <p className='hover:text-gray-600 dark:hover:text-blue-600'>Tomorrow</p>
               <p className='hover:text-gray-600 dark:hover:text-blue-600'>Next 3 Days</p>
            </div>

            {isLoading? (<Spinner />)
              : error? (<p className='text-red-500 font-bold'>{error}</p>)
              :(
            <div className='flex justify-around flex-wrap'>
              <WeatherCard weatherIcon='Cloudy.svg' iconAltText='sun and cloud icon' data={weatherData.current?.cloudcover} label='cloudcover' />
              {
                weatherData.current?.is_day === 'yes' ?
                <WeatherCard weatherIcon='Sunny.svg' iconAltText='sun icon' data='Day' label='Day or Night?' />
                :
                  <WeatherCard weatherIcon='Night.svg' iconAltText='moon icon' data='Night' label='Day or Night?' />
              }
              <WeatherCard weatherIcon='Sunny.svg' iconAltText='thundercloud with rain icon' data={weatherData.current?.uv_index} label='UV Index'/>
              <WeatherCard weatherIcon='Severe-thunderstorm.svg' iconAltText='thundercloud icon' data={weatherData.current?.temperature} label='Temperature' />
            </div>
              )
            }



            
          </div>
          
       )}

        </div>
  )
}

export default App
