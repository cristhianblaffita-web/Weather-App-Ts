import { useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import type { Place } from "../hooks/useGeocoding";
import { getWeatherIcon } from "../utils/weatherCodes";
import { MapIcon, Search } from "lucide-react";

type WeatherNavProps = {
    city?: string;
    code?: number;
    date?: string;
    hour?: string;
    isDay?: boolean;
}

export function CityResults({results, handleSelect}:{results: Place[]; handleSelect: (city: Place) => void}) {
    if (!results || !results.length) return null;

    return (
        <ul className="absolute left-0 right-0 top-10 bg-card">
            {results.map(city => (
                <li
                    key={city.id}
                    className="flex overflow-auto gap-2 text-text-secondary cursor-pointer px-4 py-2 hover:bg-accent/20"
                    onMouseDown={() => handleSelect(city)}
                >
                    <MapIcon/>
                    <span>{city.country},</span>
                    <span className="text-nowrap">{city.name}</span>
                </li>
            ))}
        </ul>
    )
}

export default function WeatherNav({
    city = 'Unknown',
    code = 0,
    date = 'Unknown',
    hour = '00:00',
    isDay = true
}: WeatherNavProps) {
    const Icon = getWeatherIcon(code, isDay);

    const { search, setSearch, cities, handleSelect, loading } = useWeatherContext();

    const [inputActive, setInputActive] = useState(false);

    const showResults = inputActive && search.length > 1 && !!cities?.results?.length;

    return (
        <div className="weather-nav bg-card-elevated/20 grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-y-4 gap-x-4 rounded-2xl border border-border/40 p-4 shadow-sm">
            <div className="bg-card/50 border border-border/30 rounded-2xl p-2">
                <Icon className="text-text-primary" />
            </div>
            <div className="city-info grid grid-cols-1">
                <span className="text-2xl text-text-primary font-bold">{city}</span>
                <span className="text-xs text-text-secondary">{date} ~ {hour}</span>
            </div>

            <div className="col-span-2 relative grid grid-cols-[auto_1fr] gap-x-4 bg-card-elevated/20 border border-border/30 rounded-lg px-3 py-2">
                <Search className="text-accent-dark" />
                <input
                    className="focus:outline-0 text-sm text-text-secondary"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setInputActive(true)}
                    onBlur={() => setInputActive(false)}
                    placeholder="Search city..."
                    minLength={2}
                    maxLength={30}
                    aria-label="Search city"
                />
               
               {showResults && <CityResults results={cities.results} handleSelect={handleSelect} />}
            </div>
            {loading && <p>Loading</p>}
        </div>
    )
}