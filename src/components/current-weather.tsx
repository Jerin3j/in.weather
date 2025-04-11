import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { WeatherData } from "@/utils/types";
import { ArrowDown, Droplets, Wind } from "lucide-react";

type CurrentWeatherProps = {
    current : WeatherData["current"],
    location : WeatherData["location"],
}
  
export const CurrentWeather = ({current, location}: CurrentWeatherProps) => {
    
    const highResIcon = current.condition.icon.replace("64x64", "128x128");

    const formatTemp = (temp: number) => `${Math.round(temp)}°`
  return (
    <Card className="overflow-hidden w-full mx-auto">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-end gap-1">
                        <h2 className="text-2xl font-bold tracking-tighter">{location?.name}</h2>
                        {location?.region && (
                            <span className="text-muted-foreground">
                                , {location.region},
                            </span>
                        )}
                            <p className="text-sm text-muted-foreground">
                                {location.country}
                             </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-7xl font-bold tracking-tighter">{formatTemp(current.temp_c)}</p>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(current.feelslike_c)}</p>
        
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Droplets className="size-4 text-blue-500"/>
                        <div className="space-y-0 5">
                            <p className="text sm font-medium">Humidity</p>
                            <p className="text sm text-muted-foreground">{current.humidity}%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wind className="size-4 text-blue-500"/>
                        <div className="space-y-0 5">
                            <p className="text sm font-medium">Wind Speed</p>
                            <p className="text sm text-muted-foreground">{current.wind_kph} m/s</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                    <img 
                      src={`https:${highResIcon}`}
                      className="w-full h-full object-contain mb-4"
                    />
                    <div className="absolute bottom-0 text-center">
                        <p className="font-medium capitalize">
                            {current.condition.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
