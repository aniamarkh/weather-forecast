<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import type { ForecastObject } from './types';
import axios from 'axios';

const placeToTrack: Ref<null | string> = ref(null);
const weatherForecast: Ref<null | ForecastObject> = ref(null);
const forecastError: Ref<boolean> = ref(false);

const getWeather = async (placeName: string) => {
  placeToTrack.value = placeName;
  try {
    const currentResult = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${
        placeToTrack.value
      }&days=3&aqi=no&alerts=no`
    );
    weatherForecast.value = currentResult.data as ForecastObject;
  } catch {
    forecastError.value = true;
  }
};
</script>

<template>
  <main>
    <div class="header">
      <span class="material-symbols-outlined header__icon"> routine </span>
      <h2 class="header__title">wow it's a weather app...</h2>
    </div>
    <Transition>
      <SearchBar @setPlace="getWeather" />
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: default;
}

.header__icon {
  width: 25px;
  transition: all 0.9s;

  &:hover {
    transform: rotate(360deg);
  }
}
</style>

{ "location": { "name": "London", "region": "City of London, Greater London", "country": "United
Kingdom", "lat": 51.52, "lon": -0.11, "tz_id": "Europe/London", "localtime_epoch": 1687368001,
"localtime": "2023-06-21 18:20" }, "current": { "last_updated": "2023-06-21 18:15", "temp_c": 25.0,
"is_day": 1, "condition": { "text": "Partly cloudy", "code": 1003 }, "wind_kph": 15.1, "humidity":
47, "feelslike_c": 25.6, "uv": 7.0 }, "forecast": { "forecastday": [ { "date": "2023-06-21", "day":
{ "avgtemp_c": 21.1, "totalsnow_cm": 0.0, "condition": { "text": "Sunny", "code": 1000 } }, "astro":
{ }, "hour": [ { "time": "2023-06-21 00:00", "temp_c": 16.7, "is_day": 0, "condition": { "code":
1000 } }, { "time": "2023-06-21 01:00", "temp_c": 16.1, "is_day": 0, "condition": { "code": 1000 }
}, ] }, { "date": "2023-06-22", "day": { "avgtemp_c": 21.8, "totalsnow_cm": 0.0, "condition": {
"text": "Patchy rain possible", "code": 1063 } }, "astro": { }, "hour": [ { "time": "2023-06-22
00:00", "temp_c": 16.9, "is_day": 0, "condition": { "code": 1000 } }, { "time": "2023-06-22 01:00",
"temp_c": 16.4, "is_day": 0, "condition": { "code": 1000 } }, ] } ] } }
