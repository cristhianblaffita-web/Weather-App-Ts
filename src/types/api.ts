export type CurrentWeatherResponse = {
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

export type HourlyWeatherResponse = {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
};

export type DailyWeatherResponse = {
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
    current: CurrentWeatherResponse;
    hourly_units: Record<any, string>;
    hourly: HourlyWeatherResponse;
    daily_units: Record<any, string>;
    daily: DailyWeatherResponse;
}

export type Place = {
    id: number;
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
};

export type GeocodingResponse = {
    results: Place[];
    generation_time: number;
};