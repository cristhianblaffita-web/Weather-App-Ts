import { Cloud, Droplet, Thermometer, Wind, type LucideIcon } from "lucide-react";
import { getCloudCoverage } from "../utils/cloudCoverage";
import type { CurrentWeather, WeatherVar } from "../types/weather";

type CurrentVarCardProps = WeatherVar & {
    style: 'inner' | 'outer';
    title: string;
    icon: LucideIcon;
};

function WeatherVarCard({
    style,
    icon,
    title,
    value,
    unit
}: CurrentVarCardProps) {
    const Icon = icon;

    const innerCard = (
        <div className="w-full h-full grid grid-cols-[auto_1fr] justify-self-end items-center justify-center text-nowrap gap-x-4 md:max-lg:bg-card/30 md:max-lg:rounded-2xl md:max-lg:border md:max-lg:border-border/40 md:max-lg:p-4">
            <div className="bg-card/50 border border-border/40 row-span-2 p-4 rounded-2xl flex items-center justify-center">
                <Icon />
            </div>
            <nav className="text-sm text-text-secondary">{title}</nav>
            <nav className="text-sm">{value}{unit}</nav>
        </div>
    )

    const outerCard = (
        <div className="info-card bg-card-elevated/20 grid grid-cols-[auto_1fr] items-center gap-x-4 border border-border/40 rounded-2xl p-4 shadow-sm">
            <div className="row-span-2">
                <Icon className="size-12" />
            </div>
            <nav>{title}</nav>
            <nav className="font-bold">{value}{unit}</nav>
        </div>
    )
    return (
        <>
            {style === 'inner' ? innerCard : outerCard}
        </>
    )
}

export default function CurrentWeather({
    temperature = 0,
    wind = { value: 0, unit: 'km/h' },
    humidity = { value: 0, unit: '%' },
    apparent_temp = { value: 0, unit: '°' },
    cloud_coverage = 0
}: CurrentWeather) {
    return (
        <div className="grid grid-cols-1 gap-y-2 text-text-primary">

            <div className="bg-card-elevated/20 grid grid-cols-[1fr_auto] md:grid-cols-2 items-center justify-center gap-x-4 rounded-2xl border border-border/40 p-4 shadow-sm">
                <div className="current-temperature  flex items-start justify-center text-text-primary">
                    <span className="font-bold text-9xl">{Math.floor(temperature)}</span>
                    <span className="text-6xl">°</span>
                </div>

                <div className="flex flex-col justify-start items-start gap-4 md:max-lg:flex-row">
                    <WeatherVarCard
                        style="inner"
                        icon={Thermometer}
                        title="Feels like"
                        value={Math.floor(Number(apparent_temp.value))}
                        unit={apparent_temp.unit}
                    />

                    <WeatherVarCard
                        style="inner"
                        icon={Droplet}
                        title='Humidity'
                        value={humidity.value}
                        unit={humidity.unit}
                    />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <WeatherVarCard
                    style="outer"
                    icon={Cloud}
                    title="Cloud coverage"
                    value={getCloudCoverage(cloud_coverage)}
                />

                <WeatherVarCard
                    style="outer"
                    icon={Wind}
                    title='Wind'
                    value={wind.value}
                    unit={wind.unit}
                />
            </div>
        </div>
    )
}