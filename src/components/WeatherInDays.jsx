
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherInDays = ({weatherData}) => {

  const data = [
  { name: weatherData[1]?.datetime, 
    UV: weatherData[1]?.uvindex, 
    temp: weatherData[1]?.temp, 
    wind: weatherData[1]?.windspeed, 
    humidity: weatherData[1]?.humidity,
    CloudCover: weatherData[1]?.cloudcover },

  { name: weatherData[2]?.datetime, 
    UV: weatherData[2]?.uvindex, 
    temp: weatherData[2]?.temp, 
    wind: weatherData[2]?.windspeed, 
    humidity: weatherData[2]?.humidity,
    CloudCover: weatherData[2]?.cloudcover },

  { name: weatherData[3]?.datetime, 
    UV: weatherData[3]?.uvindex, 
    temp: weatherData[3]?.temp, 
    wind: weatherData[3]?.windspeed, 
    humidity:weatherData[3]?.humidity,
    CloudCover: weatherData[3]?.cloudcover },

  { name: weatherData[4]?.datetime, 
    UV: weatherData[4]?.uvindex, 
    temp: weatherData[4]?.temp, 
    wind: weatherData[4]?.windspeed, 
    humidity:weatherData[4]?.humidity,
    CloudCover: weatherData[4]?.cloudcover },

  { name: weatherData[5]?.datetime, 
    UV: weatherData[5]?.uvindex, 
    temp: weatherData[5]?.temp, 
    wind: weatherData[5]?.windspeed, 
    humidity: weatherData[5]?.humidity,
    CloudCover: weatherData[5]?.cloudcover },

  { name: weatherData[6]?.datetime, 
    UV: weatherData[6]?.uvindex, 
    temp: weatherData[6]?.temp, 
    wind: weatherData[6]?.windspeed, 
    humidity: weatherData[6]?.humidity,
    CloudCover: weatherData[6]?.cloudcover },
];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#34A8FF" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="UV" stroke="#FF8C00" />
        <Line type="monotone" dataKey="wind" stroke="#8be9fd" />
        <Line type="monotone" dataKey="humidity" stroke="#00FF99" />
        <Line type="monotone" dataKey="CloudCover" stroke="#FF69B4" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeatherInDays;