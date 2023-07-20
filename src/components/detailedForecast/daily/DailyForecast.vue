<script setup lang="ts">
import type { DailyForecast } from '@/types';
import DailyCard from './DailyCard.vue';
defineProps<{ dailyForecast: DailyForecast }>();
</script>

<template>
  <div class="forecast__daily" tabindex="0" aria-label="3 day forecast">
    <DailyCard
      v-for="(day, index) of dailyForecast.forecastday"
      :key="index"
      :day-forecast="day"
      :date="index === 0 ? 'Today' : day.date"
      tabindex="0"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.forecast__daily {
  width: 100%;
  @include flex-column;
  align-items: flex-start;
  gap: 15px;
  @include glassmorphism;
  padding: 20px;
}
</style>
