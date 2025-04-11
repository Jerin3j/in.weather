export const fetchCountries = async()=> {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries")

    if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
    
      return res.json();
}