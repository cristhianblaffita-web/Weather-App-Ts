import { useEffect, useState } from "react";

export type CurrentWeather = {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: boolean;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
};

export type HourlyWeather = {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
};

export type DailyWeather = {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[]
}

export type WeatherResponse = {
    utc_offset_seconds: number;
    timezone: string;
    current_units: Record<any, string>;
    current: CurrentWeather;
    hourly_units: Record<any, string>;
    hourly: HourlyWeather;
    daily_units: Record<any, string>;
    daily: DailyWeather;
}

export function useWeather({latitude, longitude}:{latitude: number | null, longitude: number | null}) {
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (latitude == null || longitude == null) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,cloud_cover,wind_speed_10m&timezone=auto`);

                const data: WeatherResponse = await response.json();

                setWeather(data);
            } catch(err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, [latitude, longitude]);

    return { weather, loading, error };
}