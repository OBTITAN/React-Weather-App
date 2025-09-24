import { useState, useEffect } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'
import Search from './components/Search';
import Spinner from './components/Spinner';
import DailyWeather from './components/DailyWeather';
import WeatherInDays from './components/WeatherInDays';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL= `http://api.weatherstack.com/current`

 
function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [weatherTomorrowData, setWeatherTomorrowData] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayWeatherPerDate, setdisplayWeatherPerDate] = useState(0);

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

/*
const fetchTomorrowWeatherData = async (locationQuery) => {
      try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${locationQuery}&forecast_days=2`);
 
      if (!response.ok) {
        setError('Could not fetch weather data');
        console.log(response.status, response.statusText);
      } else {
        const data = await response.json();
        setWeatherTomorrowData(data);
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
    fetchTomorrowWeatherData(location);
  }
},[location])
*/

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

                <div className='mr-3 ml-auto'>
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

             <div className='flex  ml-10  flex-wrap mb-5  space-x-10 text-white text-center text-lg font-extrabold'>
               <button className='hover:text-gray-600 dark:hover:text-blue-600' onClick={() => {
                setdisplayWeatherPerDate(0);
                }}
                >
                  Today</button>

               <button className='hover:text-gray-600 dark:hover:text-blue-600' onClick={() => {
                setdisplayWeatherPerDate(1);
                 }}
                 >
                  Tomorrow</button>

               <button className='hover:text-gray-600 dark:hover:text-blue-600 ' onClick={() => {
                setdisplayWeatherPerDate(2);
                }}
                >
                  Next 3 Days</button>
            </div>

           {isLoading ? (
                <Spinner />
              ) : error ? (
                <p className='text-red-500 font-bold'>{error}</p>
              ) : displayWeatherPerDate === 0 ? (
                <DailyWeather weatherData={weatherData} />
              ) : displayWeatherPerDate === 1 ?
              (
                <DailyWeather weatherData={weatherData} />
              )
              : (
                <div className='bg-gray-700 p-10 rounded-4xl h-100 flex justify-center items-center space-x-3'>
                  <WeatherInDays />
                </div>
              )
            }



            
          </div>
          
       )}

        </div>
  )
}

export default App
