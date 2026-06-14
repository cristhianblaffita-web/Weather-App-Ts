import { useEffect } from "react";

export function useWeatherTheme(isDay: boolean | undefined) {
    useEffect(() => {
        if (isDay === undefined) return;

        const html = document.documentElement;

        html.classList.toggle('dark', !isDay);
      }, [isDay]);
}