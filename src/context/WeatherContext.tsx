import { useDebounce } from "use-debounce";
import { createContext, useContext, useMemo, useState } from "react";
import { useGeocoding, type GeocodingResponse, type Place } from "../hooks/useGeocoding";
import { useWeather, type WeatherResponse } from "../hooks/useWeather";

type WeatherContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    cities: GeocodingResponse | null;
    selectedCity: Place | null;
    handleSelect: (city: Place) => void;
    weather: WeatherResponse | null;
    loading: boolean;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const DEFAULT_CITY: Place = {
        id: 2950159,
        name: 'Berlin',
        latitude: 52.52437,
        longitude: 13.41053,
        country_code: 'DE',
        country: 'Deutschland'
    };

    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState<Place | null>(DEFAULT_CITY);

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

    const { weather, loading } = useWeather(coords);

    return (
        <WeatherContext.Provider
            value={{
                search,
                setSearch,
                cities,
                selectedCity,
                handleSelect,
                weather,
                loading
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