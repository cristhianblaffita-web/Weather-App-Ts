import { useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";
import WeatherNav from "./components/WeatherNav";
import { useWeatherContext } from "./context/WeatherContext";
import { formatDate } from "./utils/formatDate";
import { WeatherError, WeatherLoading } from "./components/WeatherStatus";

export default function App() {
  const {
    weather,
    currentWeather,
    hourlyWeather,
    dailyWeather,
    selectedCity: city,
    loading,
    error
  } = useWeatherContext();

  useEffect(() => {
    if (!currentWeather?.is_day) {
      document.getElementById('root')?.classList.add('dark');
    } else {
      document.getElementById('root')?.classList.remove('dark');
    }
  }, [weather]);


  const date = currentWeather ? formatDate(currentWeather.time) : null;

  return (
    <>
      {loading && <WeatherLoading />}
      {!loading && error && <WeatherError message={error} />}
      {!loading && !!weather && (
        <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-2 lg:gap-x-2">
          <div className="flex flex-col gap-2">
            <WeatherNav
              city={`${city?.name}, ${city?.country_code}`}
              date={date!.fullDate}
              hour={date!.hourOnly}
              code={currentWeather!.weather_code}
              isDay={currentWeather!.is_day}
            />
            <CurrentWeather
              temperature={currentWeather!.temperature_2m}
              apparent_temp={{ value: currentWeather!.apparent_temperature, unit: '°' }}
              humidity={{ value: currentWeather!.relative_humidity_2m, unit: weather.current_units.relative_humidity_2m }}
              wind={{ value: currentWeather!.wind_speed_10m, unit: weather.current_units.wind_speed_10m }}
              cloud_coverage={currentWeather!.cloud_cover}
            />
            <div className="max-lg:hidden h-full bg-card-elevated/20 rounded-2xl border border-border/20 p-4 shadow-sm"></div>
          </div>

          <div className="flex flex-col gap-2">
            <HourlyWeather weatherList={hourlyWeather} />
            <DailyWeather weatherList={dailyWeather} />
          </div>
        </div>
      )}
    </>
  )
}