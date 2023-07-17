<script setup lang="ts">
import type { DailyForecast } from '../../types';
import DailyCard from './DailyCard.vue';
defineProps<{ dailyForecast: DailyForecast }>();
</script>

<template>
  <div class="forecast__daily">
    <DailyCard v-for="day of dailyForecast.forecastday" :key="day.date" :day-forecast="day" />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.forecast__daily {
  @include flex-column;
  align-items: flex-start;
  gap: 15px;
  @include glassmorphism;
  width: 90%;
  padding: 20px;
}
</style>
