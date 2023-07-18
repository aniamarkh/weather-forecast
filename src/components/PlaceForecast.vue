<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ForecastResponce } from '../types';
import ForecastCurrent from './ForecatsCurrent.vue';
import TodayForecast from './today/HourlyForecast.vue';
import DailyForecast from './daily/DailyForecast.vue';
import { warmWeatherCodes, coldWeatherCodes, conditionGradients } from '../utils/weatherGradients';
import { onBeforeMount, onUnmounted } from 'vue';

const props = defineProps<{ place: String }>();
const forecast: Ref<null | ForecastResponce> = ref(null);
const forecastError: Ref<boolean> = ref(false);
const emit = defineEmits(['back-to-search']);

const getWeather = async () => {
  try {
    const currentResult = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${
        props.place
      }&days=3&aqi=no&alerts=no`
    );
    forecast.value = currentResult.data as ForecastResponce;
  } catch {
    forecastError.value = true;
  }
};

const setBackground = (code: number, isDay: number, temp: number) => {
  let weatherGradient: string = document.documentElement.style.getPropertyValue('--init-gradient');
  if (warmWeatherCodes.has(code) || temp >= 15) {
    if (isDay) {
      weatherGradient = conditionGradients.warm.day;
    } else {
      weatherGradient = conditionGradients.warm.night;
    }
  } else if (coldWeatherCodes.has(code) || temp < 15) {
    if (isDay) {
      weatherGradient = conditionGradients.cold.day;
    } else {
      weatherGradient = conditionGradients.cold.night;
    }
  } else {
    throw new Error('Unknown weather code');
  }

  document.documentElement.style.setProperty('--init-gradient', weatherGradient);
};

onBeforeMount(() => {
  getWeather()
    .then(() => {
      if (forecast.value)
        setBackground(
          forecast.value.current.condition.code,
          forecast.value.current.is_day,
          forecast.value.current.temp_c
        );
    })
    .catch((error) => {
      console.log(error);
    });
});

onUnmounted(() => {
  document.documentElement.style.setProperty(
    '--init-gradient',
    'linear-gradient(45deg, #9b759b, #6daab1)'
  );
});
</script>

<template>
  <div v-if="forecast" class="forecast">
    <div class="forecast__header">
      <button class="header__button" @click="emit('back-to-search')">
        <span class="material-symbols-outlined"> arrow_back </span>
      </button>
      <div class="header__location">
        <p class="location__name">{{ forecast.location.name }}</p>
        <p class="location__country">{{ forecast.location.country }}</p>
      </div>
      <button class="header__button">
        <span class="material-symbols-outlined"> add </span>
      </button>
    </div>
    <ForecastCurrent :current="forecast.current" />
    <TodayForecast
      :today="forecast.forecast.forecastday[0]"
      :tomorrow="forecast.forecast.forecastday[1]"
      :last_updated="forecast.current.last_updated"
    />
    <DailyForecast :daily-forecast="forecast.forecast" />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.forecast {
  width: 100%;
  @include flex-column;
  gap: 15px;
  padding: 0 10px;
}
.forecast__header {
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header__button {
  border-radius: 20px;
  @include flex-column;
  padding: 10px;

  &:hover {
    @include glassmorphism;
  }
}

.header__location {
  @include flex-column;

  .location__name {
    font-weight: 600;
  }

  .location__country {
    font-size: 1rem;
  }
}
</style>
