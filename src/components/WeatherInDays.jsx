
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherInDays = () => {

  const data = [
  { name: 'Monday', UV: 4000, temp: 2400, wind: 2400, humidity: 2000 },
  { name: 'Tuesday', UV: 3000, temp: 1398, wind: 2210, humidity: 2900 },
  { name: 'Wednesday', UV: 2000, temp: 7000, wind: 2290, humidity: 3000 },
  { name: 'Thursday', UV: 2780, temp: 3908, wind: 2000, humidity: 1000 },
  { name: 'Friday', UV: 1890, temp: 4800, wind: 2181, humidity: 1500 },
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
        <Line type="monotone" dataKey="temp" stroke="#FF0000" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="UV" stroke="#00FF00" />
        <Line type="monotone" dataKey="wind" stroke="#0000FF" />
        <Line type="monotone" dataKey="humidity" stroke="#FFA500" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeatherInDays;