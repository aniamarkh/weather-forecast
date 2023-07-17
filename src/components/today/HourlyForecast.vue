<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
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
    (hourData) => extractHour(hourData.time) > currentHour
  );
  const remainingTomorrow = tomorrowForecast.filter(
    (hourData) => extractHour(hourData.time) <= currentHour
  );

  const next24Hours = remainingToday.concat(remainingTomorrow).slice(0, 24);
  return next24Hours;
};

const next24Hours = getNext24Hours(props.today.hour, props.tomorrow.hour);

const cardsContainer: Ref<null | HTMLElement> = ref(null);
const scrollToLeft = ref(true);
const scrollToRight = ref(false);

const scrollRight = () => {
  if (cardsContainer.value)
    cardsContainer.value.scrollTo({
      left: cardsContainer.value.scrollLeft + cardsContainer.value.offsetWidth,
      behavior: 'smooth',
    });
};

const scrollLeft = () => {
  if (cardsContainer.value)
    cardsContainer.value.scrollTo({
      left: cardsContainer.value.scrollLeft - cardsContainer.value.offsetWidth,
      behavior: 'smooth',
    });
};

const checkScroll = () => {
  if (cardsContainer.value) {
    const container = cardsContainer.value;

    scrollToRight.value = container.scrollWidth - container.clientWidth - container.scrollLeft <= 0;
    scrollToLeft.value = container.scrollLeft === 0;
  }
};

watch(
  () => cardsContainer.value?.scrollLeft,
  () => {
    checkScroll();
  }
);
</script>

<template>
  <div class="forecast__by-hours">
    <button
      :disabled="scrollToLeft"
      class="by-hours__button by-hours__button--left"
      @click="scrollLeft"
    >
      <span class="material-symbols-outlined"> chevron_left </span>
    </button>
    <div ref="cardsContainer" class="by-hours__cards" @scroll="checkScroll">
      <ByHoursCard v-for="hour of next24Hours" :key="hour.time" :hour-info="hour" />
    </div>
    <button
      :disabled="scrollToRight"
      class="by-hours__button by-hours__button--right"
      @click="scrollRight"
    >
      <span class="material-symbols-outlined"> chevron_right </span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.forecast__by-hours {
  height: 160px;
  width: 90%;
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  @include glassmorphism;
}

.by-hours__cards {
  @include flex-row;
  width: 260px;
  gap: 5px;
  overflow-x: auto;
  transition: all 0.2s ease-in-out;
}

.by-hours__button {
  padding: 0 2px;
  height: 100%;
  background: none;

  &:hover {
    background: #ffffff24;
  }
}

.by-hours__button:disabled {
  span {
    opacity: 0.2;
  }

  &:hover {
    background: none;
    cursor: auto;
  }
}

.by-hours__button--left {
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}

.by-hours__button--right {
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
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
