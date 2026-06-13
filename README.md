# Weather App TS
A global real-time weather application built with **React**, **TypeScript**, and **Tailwind CSS** using data from the **Open-Meteo API**.

The app allows users to search for cities worldwide, view current weather conditions, and explore hourly and daily forecasts with a dynamic interface that adapts according to the weather conditions and time of day.

---

# Deployment
Try the app yourself right now:
https://weather-app-ts-wheat.vercel.app/

---

# Tech Stack
- **React** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling
- **Open-Meteo APIs** - Weather and geocoding data
- **React Context API** - Global weather state management
- **localStorage** - Persist selected city preferences

---

# Project structure
``` bash 
src/
|____components/ # Reusable UI components
|
|____context/ # Global weather state management
|
|____hooks/ # Custom React hooks 
|
|____types/ # Shared TypeScript types
|
|____utils/ # Utility functions and helpers
```
---

### Core Features
- **Global weather search** - Search and view weather conditions for cities worldwide
- **Current weather conditions** - Display temperature, humidity, wind, cloud coverage and feels-like temperature
- **Hourly and daily forecasts** - View upcoming weather predictions
- **Dynamic weather UI** - Background-colors adapts based on location and time of day
- **Persistent preferences** - Keep the selected city using localStorage
 
 ---

## API
Weather data provided by:
**Open-Meteo Weather API**
https://open-meteo.com/

Geocoding data provided by:
**Open-Meteo Geocoding API**
https://open-meteo.com/en/docs/geocoding-api

 ---

## Installation

Clone the repository
```bash 
git clone https://github.com/cristhianblaffita-web/Weather-App-Ts.git
```

Navigate to the project
```bash
cd Weather-App-Ts
```

Install dependencies
```bash
npm i
```
Start the development server
```bash
npm run dev
```

---

## License
This project is open-source and available under the MIT License. 