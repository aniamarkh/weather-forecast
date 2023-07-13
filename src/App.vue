<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import type { ForecastResponce } from './types';

const placeToTrack: Ref<null | string> = ref(null);
const weatherForecast: Ref<null | ForecastResponce> = ref(null);
const forecastError: Ref<boolean> = ref(false);

const getWeather = async (placeName: string) => {
  placeToTrack.value = placeName;
  try {
    const currentResult = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${
        placeToTrack.value
      }&days=3&aqi=no&alerts=no`
    );
    weatherForecast.value = currentResult.data as ForecastResponce;
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
    <Transition mode="out-in">
      <SearchBar v-if="!placeToTrack" @setPlace="getWeather" />
      <CurrentWeather v-else-if="placeToTrack && weatherForecast" :forecast="weatherForecast" />
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