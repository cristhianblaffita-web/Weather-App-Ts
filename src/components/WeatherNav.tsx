import { getWeatherIcon } from "../utils/weatherCodes";
import { Search } from "lucide-react";

type WeatherNavProps = {
    city?: string;
    code?: number;
    date?: string;
    hour?: string;
    isDay?: boolean;
}

export default function WeatherNav({
    city = 'Unknown',
    code = 0,
    date = 'Unknown',
    hour = '00:00',
    isDay = true
}: WeatherNavProps) {
    const Icon = getWeatherIcon(code, isDay);

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
                    placeholder="Search city..."
                    minLength={2}
                    maxLength={30}
                    aria-label="Search city"
                />
               
            </div>
        </div>
    )
}