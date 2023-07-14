<script setup lang="ts">
import type { ForecastResponce } from '../types';
import ForecastCurrent from './ForecatsCurrent.vue';
import TodayForecast from './today/HourlyForecast.vue';

defineProps<{ forecast: ForecastResponce }>();
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
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.forecast {
  width: 100%;
  @include flex-column;
  gap: 20px;
}
.forecast__header {
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
