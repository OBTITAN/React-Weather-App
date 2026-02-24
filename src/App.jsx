import { useState, useEffect, useRef } from 'react'
import './App.css'
import WeatherDetails from './components/WeatherDetails'
import Search from './components/Search';
import Spinner from './components/Spinner';
import DailyWeather from './components/DailyWeather';
import WeatherInDays from './components/WeatherInDays';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayWeatherPerDate, setdisplayWeatherPerDate] = useState(0);

  const containerRef = useRef(null);

  const fetchWeatherData = async (locationQuery) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}${locationQuery}?key=${API_KEY}&unitGroup=us&include=current&include=days&elements=datetime,datetimeEpoch,temp,humidity,windspeed,precip,uvindex,cloudcover,conditions,sunsetEpoch,sunriseEpoch&contentType=json`);

      if (!response.ok) {
        setError('Could not fetch weather data');
        console.log(response.status, response.statusText);
      } else {
        const data = await response.json();
        console.log(data);
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

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location])

  useGSAP(() => {
    if (weatherData && weatherData.currentConditions) {
      gsap.fromTo('.stagger-animate',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, { dependencies: [weatherData], scope: containerRef });

  useGSAP(() => {
    gsap.fromTo('.header-animate',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, { scope: containerRef });

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

  const getBackgroundGradient = (description) => {
    if (!description) return 'from-blue-500 to-cyan-500';

    description = description.toLowerCase();

    if (description.includes('sunny') || description.includes('clear')) {
      return 'from-sky-400 to-amber-200';
    } else if (description.includes('rain') || description.includes('drizzle') || description.includes('shower')) {
      return 'from-slate-700 to-slate-900';
    } else if (description.includes('thunder') || description.includes('storm') || description.includes('lightning')) {
      return 'from-indigo-900 to-slate-900';
    } else if (description.includes('cloudy') || description.includes('overcast') || description.includes('cloud')) {
      return 'from-gray-400 to-slate-600';
    } else if (description.includes('snow') || description.includes('sleet') || description.includes('hail')) {
      return 'from-blue-200 to-slate-400';
    }
    return 'from-blue-500 to-cyan-500';
  }

  let currentDate = new Date().toLocaleDateString();
  const bgClass = getBackgroundGradient(weatherData.currentConditions?.conditions);

  return (
    <div ref={containerRef} className={`min-h-[100vh] min-w-[100vw] w-full transition-all duration-1000 bg-gradient-to-br ${bgClass} p-5 absolute top-0 left-0 overflow-y-auto overflow-x-hidden m-0`}>
      <div className='max-w-6xl mx-auto'>
        <div className='text-white text-center mb-10 header-animate'>
          <p className='font-black text-5xl tracking-tight drop-shadow-md py-4'>Weather App</p>
        </div>

        <div className="mb-10 header-animate">
          <Search setSearchTerm={setLocation} />
        </div>

        {location == null ? (
          <div className='text-center text-3xl font-bold text-white drop-shadow-md mt-20 header-animate px-4'>
            Please enter a location to get the weather information
          </div>
        ) : (
          <div className='w-full px-4'>

            {/* Top Widget */}
            <div className='stagger-animate bg-white/10 border border-white/20 backdrop-blur-md mb-8 p-8 md:p-12 rounded-[2rem] shadow-xl min-h-40 flex justify-center items-center flex-wrap gap-4 transition-all'>
              {isLoading ? (<Spinner />)
                : error ? (<p className='text-red-300 font-bold text-xl'>{error}</p>)
                  : (
                    <div className='flex flex-col md:flex-row justify-between items-center w-full'>
                      <div className='text-white text-center md:text-left max-w-lg'>
                        <div className='font-extrabold text-4xl mb-2 drop-shadow-md'>
                          {weatherData.resolvedAddress}
                        </div>
                        <div className='font-medium text-xl text-white/80 mb-4'>
                          {weatherData.timezone}
                        </div>
                        <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 text-lg'>
                          <span className='bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold'>{currentDate}</span>
                          <span className='font-bold bg-white/10 px-4 py-1.5 rounded-full border border-white/10'>{weatherData.currentConditions?.conditions}</span>
                        </div>
                        <h1 className='text-7xl md:text-8xl mt-6 font-black drop-shadow-lg tracking-tighter'>{Math.round(weatherData.currentConditions?.temp)}°</h1>
                      </div>

                      <div className='mt-8 md:mt-0'>
                        <img
                          src={getWeatherIcon(weatherData.currentConditions?.conditions)}
                          alt={weatherData.currentConditions?.conditions || 'weather icon'}
                          className='h-[180px] w-[180px] md:h-[220px] md:w-[220px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-500'
                        />
                      </div>
                    </div>
                  )}
            </div>

            {/* Middle Widgets */}
            <div className='stagger-animate bg-white/10 border border-white/20 backdrop-blur-md p-8 mb-8 rounded-[2rem] shadow-xl flex justify-center items-center min-h-48'>
              {isLoading ? (<Spinner />)
                : error ? (<p className='text-red-300 font-bold text-xl'>{error}</p>)
                  : (
                    <div className='flex flex-wrap justify-around items-center w-full gap-6'>
                      <WeatherDetails weatherMeasure='Wind' data={weatherData.currentConditions?.windspeed} imagePath='Wind.svg' altImageTxt='Wind' />
                      <WeatherDetails weatherMeasure='Humidity' data={weatherData.currentConditions?.humidity} imagePath='Drizzle.svg' altImageTxt='Humidity' />
                      <WeatherDetails weatherMeasure='Rain' data={weatherData.currentConditions?.precip} imagePath='Rain.svg' altImageTxt='Precipitation' />
                    </div>
                  )}
            </div>

            {/* Tabs */}
            <div className='stagger-animate flex justify-center flex-wrap mb-8 gap-4 text-white text-lg font-bold'>
              <button
                className={`px-8 py-3 rounded-full transition-all duration-300 border ${displayWeatherPerDate === 0 ? 'bg-white/30 border-white/50 shadow-lg scale-105' : 'bg-white/5 border-transparent hover:bg-white/20 hover:scale-105'}`}
                onClick={() => setdisplayWeatherPerDate(0)}
              >
                Today
              </button>

              <button
                className={`px-8 py-3 rounded-full transition-all duration-300 border ${displayWeatherPerDate === 1 ? 'bg-white/30 border-white/50 shadow-lg scale-105' : 'bg-white/5 border-transparent hover:bg-white/20 hover:scale-105'}`}
                onClick={() => setdisplayWeatherPerDate(1)}
              >
                Tomorrow
              </button>

              <button
                className={`px-8 py-3 rounded-full transition-all duration-300 border ${displayWeatherPerDate === 2 ? 'bg-white/30 border-white/50 shadow-lg scale-105' : 'bg-white/5 border-transparent hover:bg-white/20 hover:scale-105'}`}
                onClick={() => setdisplayWeatherPerDate(2)}
              >
                Next 6 Days
              </button>
            </div>

            {/* Bottom Content */}
            <div className='stagger-animate pb-10'>
              {isLoading ? (
                <div className='flex justify-center'><Spinner /></div>
              ) : error ? (
                <p className='text-red-300 text-center font-bold'>{error}</p>
              ) : displayWeatherPerDate === 0 ? (
                <DailyWeather weatherData={weatherData.currentConditions} />
              ) : displayWeatherPerDate === 1 ? (
                <DailyWeather weatherData={weatherData.days?.[1]} />
              ) : (
                <div className='bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-[2rem] shadow-xl w-full'>
                  <WeatherInDays weatherData={weatherData.days} />
                </div>
              )
              }
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default App
