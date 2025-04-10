import { useState } from "react"
import { Header } from "./components/Header"
import { ThemeProvider } from "./components/theme-provider"
import { WeatherDashboard } from "./components/weather-dashboard"

function App() {

  const [searchedCity, setSearchedCity] = useState<string | any>()


  return (
    <div className="bg-gradient-to-br from-background to-muted">
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Header  onSearch={setSearchedCity} />
       <WeatherDashboard searchedCity={searchedCity}/>
     </ThemeProvider>
    </div>
  )
}

export default App
