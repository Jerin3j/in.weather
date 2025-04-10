import { WeatherData } from '@/utils/types';
import { fetchWeatherData } from '@/utils/weather';
import React, { useEffect, useState } from 'react'
import { CurrentWeather } from './current-weather';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react';
import { WeatherDetails } from './weather-details';
import { WeatherForcast } from './weather-forecast';

export const WeatherDashboard = ({searchedCity}: {searchedCity: string}) => {

    const [data, setData] = useState<WeatherData>();
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchWeather = async (location: string) => {
        try {
          const res = await fetchWeatherData(location);
          setData(res);
          setError("");
        } catch (err: any) {
          setError(err.message);
        }
      };
  
      if (searchedCity) {
        fetchWeather(searchedCity);
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = `${pos.coords.latitude},${pos.coords.longitude}`;
            fetchWeather(loc);
          },
          () => {
            fetchWeather("Chennai"); // default 
          }
        );
      }
    }, [searchedCity]);

    console.log("data", data)


  return (
    <div className="p-4 space-y-4">
    {error && <p className="text-red-500">{error}</p>}
    {data && (
      <div className="space-y-4 h-screen px-20">
      <div className="flex gap-2 items-center justify-between mx-4">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        </div>
        <div className='grid grid-row-2 gap-8'>

        <CurrentWeather location={data.location} current={data.current} />
        <div className='grid gap-6 md:grid-cols-2 items-start'>
        <WeatherDetails current={data.current} forecast={data.forecast}/>
        <WeatherForcast forecast={data.forecast}/>
        </div>
      </div>
      </div>
    )}
  </div>
  )
}
