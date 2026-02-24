import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherInDays = ({ weatherData }) => {

  const data = [
    {
      name: weatherData[1]?.datetime,
      UV: weatherData[1]?.uvindex,
      temp: weatherData[1]?.temp,
      wind: weatherData[1]?.windspeed,
      humidity: weatherData[1]?.humidity,
      CloudCover: weatherData[1]?.cloudcover
    },

    {
      name: weatherData[2]?.datetime,
      UV: weatherData[2]?.uvindex,
      temp: weatherData[2]?.temp,
      wind: weatherData[2]?.windspeed,
      humidity: weatherData[2]?.humidity,
      CloudCover: weatherData[2]?.cloudcover
    },

    {
      name: weatherData[3]?.datetime,
      UV: weatherData[3]?.uvindex,
      temp: weatherData[3]?.temp,
      wind: weatherData[3]?.windspeed,
      humidity: weatherData[3]?.humidity,
      CloudCover: weatherData[3]?.cloudcover
    },

    {
      name: weatherData[4]?.datetime,
      UV: weatherData[4]?.uvindex,
      temp: weatherData[4]?.temp,
      wind: weatherData[4]?.windspeed,
      humidity: weatherData[4]?.humidity,
      CloudCover: weatherData[4]?.cloudcover
    },

    {
      name: weatherData[5]?.datetime,
      UV: weatherData[5]?.uvindex,
      temp: weatherData[5]?.temp,
      wind: weatherData[5]?.windspeed,
      humidity: weatherData[5]?.humidity,
      CloudCover: weatherData[5]?.cloudcover
    },

    {
      name: weatherData[6]?.datetime,
      UV: weatherData[6]?.uvindex,
      temp: weatherData[6]?.temp,
      wind: weatherData[6]?.windspeed,
      humidity: weatherData[6]?.humidity,
      CloudCover: weatherData[6]?.cloudcover
    },
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
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
        <XAxis dataKey="name" stroke="rgba(255,255,255,0.8)" tick={{ fill: 'rgba(255,255,255,0.8)' }} />
        <YAxis stroke="rgba(255,255,255,0.8)" tick={{ fill: 'rgba(255,255,255,0.8)' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: '12px',
            border: 'none',
            color: '#333',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px', color: '#fff' }} />
        <Line type="monotone" dataKey="temp" stroke="#e0f2fe" strokeWidth={3} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="UV" stroke="#fcd34d" strokeWidth={2} />
        <Line type="monotone" dataKey="wind" stroke="#cbd5e1" strokeWidth={2} />
        <Line type="monotone" dataKey="humidity" stroke="#6ee7b7" strokeWidth={2} />
        <Line type="monotone" dataKey="CloudCover" stroke="#fbcfe8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeatherInDays;