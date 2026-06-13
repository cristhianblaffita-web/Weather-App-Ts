export type WeatherNavProps = {
    city: string;
    code: number;
    date: string;
    hour: string;
    isDay: boolean;
}

export type WeatherVar = {
    value: number | string,
    unit?: string,
};

export type CurrentWeather = {
    temperature: number;
    wind: WeatherVar;
    humidity: WeatherVar;
    apparent_temp: WeatherVar;
    cloud_coverage: number;
};

export type HourlyWeather = {
    time: string;
    code: number;
    temperature: number;
    isDay: boolean;
};

export type DailyWeather = {
    time: string;
    code: number;
    temp_max: number;
    temp_min: number;
};