<script setup lang="ts">
import type { ForecastResponce } from '../types';
import ForecastCurrent from './ForecatsCurrent.vue';
import TodayForecast from './today/HourlyForecast.vue';
import DailyForecast from './daily/DailyForecast.vue';
import { warmWeatherCodes, coldWeatherCodes, conditionGradients } from '../utils/weatherGradients';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{ forecast: ForecastResponce }>();

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

onMounted(() => {
  setBackground(
    props.forecast.current.condition.code,
    props.forecast.current.is_day,
    props.forecast.current.temp_c
  );
});

onUnmounted(() => {
  document.documentElement.style.setProperty(
    '--init-gradient',
    'linear-gradient(45deg, #9b759b, #6daab1)'
  );
});
</script>

<template>
  <div class="forecast">
    <div class="forecast__header">
      <button class="header__button">
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
