import type { HourlyWeather, DailyWeather } from "../hooks/useWeather";
import type { HourlyWeatherProps } from "../components/HourlyWeather";
import type { DailyWeatherProps } from "../components/DailyWeather";

export function getHourlyList(weather: HourlyWeather, limit: number = 7, currentTime: string) {
    const startIndex = weather.time.findIndex(time => time === currentTime);

    return weather.time.map((itemTime, index: number): HourlyWeatherProps => {
        return {
            time: itemTime,
            temperature: weather.temperature_2m[index],
            code: weather.weather_code[index]
        }
    }).slice(startIndex, startIndex + limit);
}

export function getDailyList(weather: DailyWeather, limit: number = 7) {
    return weather.time.map((itemTime, index: number): DailyWeatherProps => {
        return {
            time: itemTime,
            code: weather.weather_code[index],
            temp_max: weather.temperature_2m_max[index],
            temp_min: weather.temperature_2m_min[index]
        }
    }).filter((_, index: number) => index < limit);
}