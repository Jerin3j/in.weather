import { WeatherData } from '@/utils/types';
import { fetchWeatherData } from '@/utils/weather';
import React, { useEffect, useState } from 'react'
import { CurrentWeather } from './current-weather';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react';
import { WeatherDetails } from './weather-details';

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
            fetchWeather("Chennai"); // default fallback
          }
        );
      }
    }, [searchedCity]);

    console.log("data", data)

    const handleRefresh = () => {

    }

  return (
    <div className="p-4 space-y-4">
    {error && <p className="text-red-500">{error}</p>}
    {data && (
      <div className="space-y-4 h-screen px-10">
      <div className="flex gap-2 items-center justify-between mx-4">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
            <RefreshCcw className={`size-4 ${data.current ? '': 'animate-spin'}`}/>
        </Button>
        </div>
        <div>

        <CurrentWeather location={data.location} current={data.current} />
        <WeatherDetails current={data.current} forecast={data.forecast}/>
      </div>
      </div>
    )}
  </div>
  )
}
