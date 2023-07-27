# Weather App

Weather App is a weather forecasting application that allows users to search for locations, view current weather conditions, and get future forecasts.

## [Deploy](https://weather-forecast-aniamarkh.vercel.app/)

![screen-capture (4)](https://github.com/aniamarkh/weather-forecast/assets/93217444/5aa7e420-f8c2-435a-aff0-dc808bd00efd)

## Features

- **Search:** Type to see location suggestions. You get instant feedback if there are errors or no matches.

- **Save Locations:** You can save locations. They are stored in the browser's local storage and show up on the start screen above the search bar.

- **Current Conditions:** Select a location and see a detailed weather conditions such as temperature, humidity, wind speed, atmospheric pressure, and the UV index.

- **Next 24 Hours Forecast**: See the hourly forecast for the next 24 hours. Includes sunrise and sunset times.

- **UV Index Chart**: Displays a chart of the UV index for the current day and provides a clear overview of UV risk levels throughout the day.

- **3 Day Forecast:** Provides a concise 3-day weather forecast to help users plan ahead.

- **Accessibility**: All important information can be read by screen readers and the app is navigable using keyboard tabs.

- **Mobile-first approach**: app is optimized for mobile devices but also works well on larger screens.

## Technologies Used

- **Vite, Vue.js, TypeScript**.
- **[Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)**: Used to provide location search suggestions as users type in the search bar.
- **[WeatherAPI](https://www.weatherapi.com/)**: Provides detailed weather data for the application.
- **[vue-echarts](https://vue-echarts.dev/)**: Used to create the UV index chart.
- **Vuex**: Used for state management. I used it to practice, even though Pinia might be a preferred choice. It handles selected and saved locations and saves them between sessions using localStorage.
- **Scss**
- **Axios**

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

`git clone https://github.com/aniamarkh/weather-forecast.git`

2. Install the dependencies:

`npm install`

3. Run the application:

`npm run dev`

This will start the local development server. You can then navigate to localhost:5173 in your browser to see the application.
