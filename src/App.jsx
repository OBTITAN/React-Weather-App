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
  if (!description) return '/sun-cloud-icon.svg';
  
  description = description.toLowerCase();
  
  switch (true) {
    case description.includes('sunny') || description.includes('clear'):
      return '/sun-icon.svg';
      
    case description.includes('rain') || description.includes('drizzle') || description.includes('shower'):
      return '/cloud-angled-rain-zap-icon.svg';
      
    case description.includes('thunder') || description.includes('storm') || description.includes('lightning'):
      return '/cloud-angled-zap-icon.svg';
      
    case description.includes('wind') || description.includes('gust') || description.includes('breezy'):
      return '/sun-cloud-fast-wind-icon.svg';
      
    case description.includes('cloud') || description.includes('overcast'):
      return '/sun-cloud-icon.svg';
      
    case description.includes('fog') || description.includes('mist'):
      return '/cloud-fog-icon.svg';
      
    case description.includes('snow') || description.includes('sleet'):
      return '/cloud-snow-icon.svg';
      
    default:
      return '/sun-cloud-icon.svg';
  }
}

// Then in your img tag's src attribute (around line 90):
<img 
  src={getWeatherIcon(weatherData.current?.weather_descriptions[0])}
  alt={weatherData.current?.weather_descriptions[0] || 'weather icon'}
  className='h-[100px] w-[100px]'
/>



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


          <div className='bg-gray-700 mb-5 p-10 rounded-4xl h-100  md:h-50 flex justify-center items-center space-x-3'>
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
                    src={()=> getWeatherIcon(weatherData.current?.weather_descriptions[0])}
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

             <div className='flex justify-items-start flex-wrap mb-5 ml-12 space-x-20 text-white text-left text-lg font-extrabold'>
               <p className='hover:text-blue-600'>Today</p>
               <p className='hover:text-blue-600'>Tomorrow</p>
               <p className='hover:text-blue-600'>Next 3 Days</p>
            </div>

            <div className='flex justify-around flex-wrap'>
              <WeatherCard weatherIcon='Cloudy-clear at times.svg' iconAltText='sun and cloud icon' />
              <WeatherCard weatherIcon='Scattered-thunderstorm.svg' iconAltText='sun and cloud with wind icon' />
              <WeatherCard weatherIcon='Rain-and-thunderstorm.svg' iconAltText='thundercloud with rain icon' />
              <WeatherCard weatherIcon='Severe-thunderstorm.svg' iconAltText='thundercloud icon' />
            </div>
          </div>

              )}

        </div>
  )
}

export default App
