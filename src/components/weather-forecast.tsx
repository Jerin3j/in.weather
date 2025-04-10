import { WeatherData } from '@/utils/types'
import { format } from 'date-fns'
import { Card } from './ui/card'

type WeatherForcastProps = {
  forecast: WeatherData["forecast"]
}

export const WeatherForcast = ({ forecast }: WeatherForcastProps) => {
  // Take first 5 forecast days
  const dailyForecast = forecast.forecastday.slice(0, 3)
  const formatTemp = (temp: number) => `${Math.round(temp)}°`


  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-3 md:mb-0">
      {dailyForecast.map((day, index) => (
        <Card
          key={index}
          className="w-[70%] md:w-1/3 h-60 md:h-auto rounded-xl bg-muted p-4 flex flex-col items-center justify-center text-center"
        >
          <p className="font-semibold text-sm">
            {format(new Date(day.date), 'EEE, dd MMM')}
          </p>
          <img
            src={`https:${day.day.condition.icon}`}
            alt={day.day.condition.text}
            className="w-12 h-12"
          />
          <p className="text-sm">{day.day.condition.text}</p>
          <p className="text-lg font-bold">{formatTemp(day.day.avgtemp_c)}C</p>
          <p className="text-xs text-muted-foreground">
            Max: {day.day.maxtemp_c}° / Min: {day.day.mintemp_c}°
          </p>
        </Card>
      ))}
    </div>
  )
}
