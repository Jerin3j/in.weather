import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";
import { fetchCountries } from "@/utils/countries";

export const Header = ({ onSearch }: { onSearch: (city: string) => void }) => {
  const [location, setLocation] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && location.trim()) {
      onSearch(location.trim());
      setFilteredCities([]);
    }
  };

  useEffect(() => {
    async function getCountries() {
      const res = await fetchCountries();

      const allCities = res.data
        .map((country: any) => country.cities)
        .flat();
      setCities(allCities);
    }

    getCountries();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-2xl py-4 md:px-4">
      <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
        <a href="/">
          <h1 className="font-bold text-2xl">
            In.<span className="text-blue-400">weather</span>
          </h1>
        </a>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative w-full max-w-xs">
            <Input
              placeholder="Enter city"
              value={location}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                const input = e.target.value;
                setLocation(input);

                if (input.trim().length > 0) {
                  const matches = cities.filter((city: string) =>
                    city.toLowerCase().includes(input.toLowerCase())
                  );
                  setFilteredCities(matches.slice(0, 10)); 
                } else {
                  setFilteredCities([]);
                }
              }}
            />

            {filteredCities.length > 0 && (
              <ul className="absolute top-full left-0 w-full z-50 mt-1 bg-black/25 rounded-lg shadow-lg">
                <li className="p-0">
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setLocation(city);
                        setFilteredCities([]);
                        onSearch(city);
                      }}
                      className="px-4 py-2 hover:bg-muted cursor-pointer"
                    >
                      {city}
                    </div>
                  ))}
                </li>
              </ul>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
