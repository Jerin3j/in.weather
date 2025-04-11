import { WeatherData } from '@/utils/types';
import { fetchWeatherData } from '@/utils/weather';
import { useEffect, useState } from 'react'
import { CurrentWeather } from './current-weather';
import { WeatherDetails } from './weather-details';
import { WeatherForcast } from './weather-forecast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { SkeltonLoader } from './skelton-loader';

export const WeatherDashboard = ({searchedCity}: {searchedCity: string}) => {

    const [data, setData] = useState<WeatherData>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<"" | "location-denied" | "invalid-city">("");
  
    useEffect(() => {
      const fetchWeather = async (location: string) => {
        try {
          const res = await fetchWeatherData(location);
          setData(res);
          setLoading(false)
          setError("");
        } catch (err: any) {
          setError('invalid-city');
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
            setError('location-denied')
          }
        );
      }
    }, [searchedCity]);

    console.log("data", data)

  return (
    <div className="p-4 space-y-4">
       {error === "invalid-city" && (
      <Alert variant="destructive">
        <AlertTitle>Invalid City Name</AlertTitle>
        <AlertDescription>
          Please enter a valid location. We couldn't find the weather for this city.
        </AlertDescription>
      </Alert>
    )}
    
    {error === "location-denied" && (
      <Alert variant="destructive">
        <AlertTitle>Location Access Denied</AlertTitle>
        <AlertDescription>
        Location access was denied. Please enable it or manually enter location to see weather updates for your current location.
        </AlertDescription>
      </Alert>
    )}

    {loading ? (
      <SkeltonLoader/>
    ) : (
      data && (
        <div className="space-y-4 md:px-20 mb-10">
        <div className="flex gap-2 items-center justify-between mx-4">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          </div>
          <div className='grid grid-row-2 gap-8'>
  
          <CurrentWeather location={data.location} current={data.current} />
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 items-start'>
          <WeatherDetails current={data.current} forecast={data.forecast}/>
          <WeatherForcast forecast={data.forecast}/>
          </div>
        </div>
        </div>
      )
    )}
  </div>
  )
}
