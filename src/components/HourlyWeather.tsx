import { getWeatherIcon } from "../utils/weatherCodes";

export type HourlyWeatherProps = {
    time?: string;
    code?: number;
    temperature?: number;
}

function HourlyCard ({
    time = '00:00',
    code = 0,
    temperature = 0,
    isDay = true
}: HourlyWeatherProps & { isDay?: boolean }) {
    const Icon = getWeatherIcon(code, !!isDay);

    return (
        <div className="min-w-24 w-24 bg-card/40 border border-border/20 rounded-2xl flex flex-col flex-nowrap p-4 items-center justify-center gap-4 text-text-primary">
            <span className="text-sm text-text-secondary flex text-nowrap">{time}</span>
            <Icon />
            <span className="text-md font-medium">{temperature}°</span>
        </div>
    )
}

export default function HourlyWeather ({
    weatherList
}:{
    weatherList: HourlyWeatherProps[]
}) {
    return (
        <div className="grid grid-cols-1 bg-card-elevated/20 rounded-2xl border border-border/20 p-4 shadow-sm">
            <span className="font-normal text-text-primary m-2">Hourly weather</span>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-2">
                {weatherList.map((item:HourlyWeatherProps, index: number) => (
                    <HourlyCard
                        key={item.time}
                        time={index === 0 ? "Now" : item.time}
                        code={item.code}
                        temperature={Math.floor(item.temperature ?? 0)}
                    />
                ))}
            </ul>
        </div>
    )
}