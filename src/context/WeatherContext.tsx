import { useDebounce } from "use-debounce";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGeocoding } from "../hooks/useGeocoding";
import { useWeather } from "../hooks/useWeather";
import { isDayTime } from "../utils/isDayTime";
import type { HourlyWeather, DailyWeather } from "../types/weather";
import type { CurrentWeatherResponse, WeatherResponse } from "../types/api";
import type { Place, GeocodingResponse } from "../types/api";

type WeatherContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    cities: GeocodingResponse | null;
    selectedCity: Place | null;
    handleSelect: (city: Place) => void;
    weather: WeatherResponse | null;
    hourlyWeather: HourlyWeather[];
    dailyWeather: DailyWeather[];
    currentWeather: CurrentWeatherResponse | null;
    loading: boolean;
    error: string | null;
};

const DEFAULT_CITY: Place = {
    id: 2950159,
    name: 'Berlin',
    latitude: 52.52437,
    longitude: 13.41053,
    country_code: 'DE',
    country: 'Deutschland'
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [search, setSearch] = useState('');

    const [selectedCity, setSelectedCity] = useState<Place | null>(() => {
        try {
            const stored = localStorage.getItem('selectedCity');
            
            return stored ? JSON.parse(stored) : DEFAULT_CITY;
        } catch(error) {
            return DEFAULT_CITY;
        }
    });

    useEffect(() => {
        if (selectedCity) {
            localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
        }
    }, [selectedCity]);

    const [debouncedSearch] = useDebounce(search, 300);

    const { cities } = useGeocoding(debouncedSearch);
    

    function handleSelect(city: Place) {
        setSelectedCity(city);
    }

    const coords = useMemo(
        () => ({
            latitude: selectedCity?.latitude ?? null,
            longitude: selectedCity?.longitude ?? null
        }), [selectedCity]
    );

    const { weather, loading, error } = useWeather(coords);

    const currentWeather = weather ? weather.current : null;

    const hourlyWeather = useMemo(() => {
        if (!weather) return [];

        const currentHour = weather.current.time.slice(0, 13);
    
        const startIndex = weather.hourly.time.findIndex(time => time.slice(0, 13) === currentHour);

        return weather.hourly.time.map((time, index) => ({
            time,
            code: weather.hourly.weather_code[index],
            temperature: weather.hourly.temperature_2m[index],
            isDay: isDayTime(time, weather.daily.sunrise, weather.daily.sunset)
        })).slice(startIndex, startIndex + 7);
    }, [weather]);


    const dailyWeather = useMemo(() => {
        if (!weather) return [];

        return weather.daily.time.map((time, index) => ({
            time,
            code: weather.daily.weather_code[index],
            temp_max: weather.daily.temperature_2m_max[index],
            temp_min: weather.daily.temperature_2m_min[index],
        })).filter((_, index: number) => index < 7)
    }, [weather]);

    return (
        <WeatherContext.Provider
            value={{
                search,
                setSearch,
                cities,
                selectedCity,
                handleSelect,
                weather,
                currentWeather,
                hourlyWeather,
                dailyWeather,
                loading,
                error
            }}
        >
            {children}
        </WeatherContext.Provider>
    )
}

export function useWeatherContext() {
    const context = useContext(WeatherContext);

    if (!context) {
        throw new Error(
          'useWeatherContext must be used within a WeatherProvider'
        );
    }
    return context;
}