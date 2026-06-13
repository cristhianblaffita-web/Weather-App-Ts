import { formatDate } from "../utils/formatDate";
import { getWeatherIcon } from "../utils/weatherCodes";
import { type DailyWeather } from "../context/WeatherContext";

function DailyCard ({
    time = '00:00',
    code = 0,
    temp_max = 0,
    temp_min = 0
}: DailyWeather) {
    const Icon = getWeatherIcon(code, true);
    return (
        <div className="grid grid-cols-3 p-2">
            <span className="text-sm">{time}</span>
            <Icon />
            <div className="grid grid-cols-2">
                <span>{temp_max}°</span>
                <span className="text-accent">{temp_min}°</span>
            </div>
        </div>
    )
}

export default function DailyWeather ({
    weatherList
}: {
    weatherList: DailyWeather[]
}) {
    return (
        <div className="grid grid-cols-1] gap-y-2 bg-card-elevated/20 rounded-2xl border border-border/20 p-4 text-text-primary shadow-sm">
            <span className="font-md ">Daily weather</span>
            <ul className="grid grid-cols-1 gap-y-4">
                {weatherList.map((item, index) => (
                    <DailyCard 
                        key={item.time}
                        time={index === 0 ? "Today" : formatDate(item.time).shortDate}
                        code={item.code}
                        temp_max={Math.floor(item.temp_max)}
                        temp_min={Math.floor(item.temp_min)}
                    />
                ))}
            </ul>
        </div>
    )
}