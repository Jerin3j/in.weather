const API_KEY = '56e22c3eaee54417a3364000251004';

export const fetchWeatherData = async (location: string) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return res.json();
};
