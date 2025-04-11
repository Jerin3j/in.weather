import { WeatherData } from '@/utils/types'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type WeatherDetailsProps = {
    current : WeatherData["current"],
    forecast : WeatherData["forecast"],
}
  

export const WeatherDetails = ({current, forecast}: WeatherDetailsProps) => {

  const { wind_dir, wind_degree, pressure_mb } = current;
  const { sunrise, sunset } = forecast.forecastday[0].astro;

  
  const details = [
    {
      title: "Sunrise",
      value: sunrise,
      icon: Sunrise,
      color: "text-orange-500",
    },
    { 
      title: "Sunset", 
      value: sunset, 
      icon: Sunset,
      color: "text-blue-500" 
      },
    {
      title: "Wind Direction",
      value: `${wind_dir} (${Math.round(wind_degree)})°`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${pressure_mb} mb`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Weather Details
        </CardTitle>
      </CardHeader>
    <CardContent>
      <div className='grid gap-6 sm:grid-cols-2'>
        {details.map(detail=> (
          <div key={detail.title}
          className='flex items-center gap-3 rounded-lg border p-4'>
            <detail.icon className={`size-5 ${detail.color}`}/>
            <div>
              <p className="text-sm font-medium leading-none">{detail.title}</p>
              <p className='text-sm text-muted-foreground'>{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
            </Card>
  )
}
