import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./ui/input";

export const Header = ({ onSearch }: { onSearch: (city: string) => void }) => {
    const [location, setLocation] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && location.trim()) {
        onSearch(location.trim())
      }
    }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-2xl py-4 md:px-4">
      <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
        <a href="/">
          <h1 className="font-bold text-2xl">
            In.
            <span className="text-blue-400">weather</span>
          </h1>
        </a>
        <div className="flex items-center space-x-2 md:space-x-4">
        <Input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-w-xs"
        />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
