import {
    Sun,
    CloudSun,
    Cloud,
    Cloudy,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudHail,
    Moon, 
    CloudMoon ,
    type LucideIcon,
  } from 'lucide-react';
  

type WeatherData = {
    label: string;
  icon?: LucideIcon;
  iconDay?: LucideIcon;
  iconNight?: LucideIcon;
};

export const weatherCodes: Record<number, WeatherData> = {
    0: {
      label: 'Clear sky',
      iconDay: Sun,
      iconNight: Moon,
    },
    1: {
      label: 'Mainly clear',
      iconDay: CloudSun,
      iconNight: CloudMoon,
    },
    2: {
      label: 'Partly cloudy',
      iconDay: CloudSun,
      iconNight: CloudMoon,
    },
    3: {
      label: 'Overcast',
      iconDay: Cloudy,
      iconNight: Cloudy,
    },
  
    45: {
      label: 'Fog',
      iconDay: CloudFog,
      iconNight: CloudFog,
    },
    48: {
      label: 'Depositing rime fog',
      iconDay: CloudFog,
      iconNight: CloudFog,
    },
  
    51: {
      label: 'Light drizzle',
      iconDay: CloudDrizzle,
      iconNight: CloudDrizzle,
    },
    53: {
      label: 'Moderate drizzle',
      icon: CloudDrizzle,
    },
    55: {
      label: 'Dense drizzle',
      icon: CloudDrizzle,
    },
    56: {
      label: 'Light freezing drizzle',
      icon: CloudDrizzle,
    },
    57: {
      label: 'Dense freezing drizzle',
      icon: CloudDrizzle,
    },
  
    61: {
      label: 'Slight rain',
      iconDay: CloudRain,
      iconNight: CloudRain,
    },
    63: {
      label: 'Moderate rain',
      icon: CloudRain,
    },
    65: {
      label: 'Heavy rain',
      icon: CloudRain,
    },
    66: {
      label: 'Freezing rain',
      icon: CloudRain,
    },
    67: {
      label: 'Heavy freezing rain',
      icon: CloudRain,
    },
  
    71: {
      label: 'Slight snow fall',
      iconDay: CloudSnow,
      iconNight: CloudSnow,
    },
    73: {
      label: 'Moderate snow fall',
      icon: CloudSnow,
    },
    75: {
      label: 'Heavy snow fall',
      icon: CloudSnow,
    },
    77: {
      label: 'Snow grains',
      icon: CloudSnow,
    },
  
    80: {
      label: 'Slight rain showers',
      iconDay: CloudRain,
      iconNight: CloudRain,
    },
    81: {
      label: 'Moderate rain showers',
      icon: CloudRain,
    },
    82: {
      label: 'Violent rain showers',
      icon: CloudRain,
    },
  
    85: {
      label: 'Slight snow showers',
      iconDay: CloudSnow,
      iconNight: CloudSnow,
    },
    86: {
      label: 'Heavy snow showers',
      icon: CloudSnow,
    },
  
    95: {
      label: 'Thunderstorm',
      iconDay: CloudLightning,
      iconNight: CloudLightning,
    },
    96: {
      label: 'Thunderstorm with slight hail',
      icon: CloudHail,
    },
    99: {
      label: 'Thunderstorm with heavy hail',
      iconDay: CloudHail,
      iconNight: CloudHail,
    },
  };

export function getWeatherIcon(code: number, isDay: boolean): LucideIcon {
  const data = weatherCodes[code];
  if (!data) return Cloud;
  if (isDay) return data.iconDay ?? data.icon ?? Cloud;
  return data.iconNight ?? data.icon ?? Moon;
}