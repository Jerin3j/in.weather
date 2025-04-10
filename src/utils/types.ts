export interface WeatherData {
    location: {
      name: string
      region: string
      country: string
      localtime: string
    }
    current: {
      temp_c: number
      temp_f: number
      condition: {
        text: string
        icon: string
      }
      wind_kph: number
      wind_dir: string
      wind_degree: number
      pressure_mb: number
      humidity: number
      feelslike_c: number
      feelslike_f: number
    }
    forecast: {
      forecastday: ForecastDay[]
    }
  }
  
  export interface ForecastDay {
    date: string
    day: {
      maxtemp_c: number
      mintemp_c: number
      avgtemp_c: number
      condition: {
        text: string
        icon: string
      }
    }
    astro: {
      sunrise: string
      sunset: string
    }
    hour: HourlyForecast[]
  }
  
  export interface HourlyForecast {
    time: string
    temp_c: number
    condition: {
      text: string
      icon: string
    }
  }
  