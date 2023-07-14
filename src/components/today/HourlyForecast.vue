<script setup lang="ts">
import type { ForecastDay, ByHoursObject } from '../../types';
import ByHoursCard from './ByHoursCard.vue';

const props = defineProps<{
  today: ForecastDay;
  tomorrow: ForecastDay;
  last_updated: string;
}>();

const extractHour = (date: string) => {
  return parseInt(date.split(' ')[1].split(':')[0]);
};

const getNext24Hours = (
  todayForecast: ByHoursObject[],
  tomorrowForecast: ByHoursObject[]
): ByHoursObject[] => {
  const currentHour = extractHour(props.last_updated);

  const remainingToday = todayForecast.filter(
    (hourData) => extractHour(hourData.time) >= currentHour
  );
  const remainingTomorrow = tomorrowForecast.filter(
    (hourData) => extractHour(hourData.time) < currentHour
  );

  const next24Hours = remainingToday.concat(remainingTomorrow).slice(0, 24);

  next24Hours[0].time = 'now';
  return next24Hours;
};

const next24Hours = getNext24Hours(props.today.hour, props.tomorrow.hour);
</script>

<template>
  <div class="forecast__by-hours">
    <!-- <button class="by-hours__button by-hours__button--left">
      <span class="material-symbols-outlined"> chevron_left </span>
    </button> -->
    <div class="by-hours__cards">
      <ByHoursCard v-for="hour of next24Hours" :key="hour.time" :hour-info="hour" />
    </div>
    <!-- <button class="by-hours__button by-hours__button--right">
      <span class="material-symbols-outlined"> chevron_right </span>
    </button> -->
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.forecast__by-hours {
  width: 90%;
  padding: 25px;
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  @include glassmorphism;
}

// .by-hours__button {
//   padding: 0 2px;
//   height: 100%;
//   background: none;

//   &:hover {
//     background: #ffffff24;
//   }
// }

// .by-hours__button--left {
//   border-bottom-left-radius: 20px;
//   border-top-left-radius: 20px;
// }

// .by-hours__button--right {
//   border-bottom-right-radius: 20px;
//   border-top-right-radius: 20px;
// }

.by-hours__cards {
  @include flex-row;
  gap: 10px;
  overflow-x: auto;
}

::-webkit-scrollbar {
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #ffffff24;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #ffffff86;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
