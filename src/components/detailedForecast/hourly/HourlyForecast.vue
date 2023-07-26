<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import type { ForecastDay, HourInfoObj, SunActivityObj } from '@/types';
import HourCard from './HourCard.vue';
import SunActivityCard from './SunActivityCard.vue';

const props = defineProps<{
  today: ForecastDay;
  tomorrow: ForecastDay;
  last_updated: string;
}>();

const extractHour = (date: string) => {
  return Number(date.split(' ')[1].split(':')[0]);
};

const convertTo24hours = (timeStr: string): string => {
  const [time, period] = timeStr.split(' ');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':');
  if (period === 'PM' && hours !== '12') hours = (Number(hours) + 12).toString();
  if (period === 'AM' && hours === '12') hours = '00';

  return `${hours}:${minutes}`;
};

const currentHour = extractHour(props.last_updated);

const getCardsData = (
  todayForecast: HourInfoObj[],
  tomorrowForecast: HourInfoObj[]
): (HourInfoObj | SunActivityObj)[] => {
  const remainingToday = todayForecast.filter(
    (hourData) => extractHour(hourData.time) > currentHour
  );
  const remainingTomorrow = tomorrowForecast.filter(
    (hourData) => extractHour(hourData.time) <= currentHour
  );

  let cardsData: (HourInfoObj | SunActivityObj)[] = remainingToday
    .concat(remainingTomorrow)
    .slice(0, 24);
  const sunrise: SunActivityObj = getSunActivityObjects().sunriseInfo;
  const sunset: SunActivityObj = getSunActivityObjects().sunsetInfo;

  cardsData = incertSunActivityObj(cardsData, sunrise);
  cardsData = incertSunActivityObj(cardsData, sunset);

  return cardsData;
};

const incertSunActivityObj = (
  cardsArr: (HourInfoObj | SunActivityObj)[],
  sunInfoObj: SunActivityObj
) => {
  for (let i = 0; i < cardsArr.length; i++) {
    if (!(cardsArr[i] as SunActivityObj).type) {
      const itemHour = parseInt((cardsArr[i] as HourInfoObj).time.split(' ')[1].split(':')[0]);
      if (itemHour === Number(convertTo24hours(sunInfoObj.time).split(':')[0])) {
        cardsArr.splice(i + 1, 0, sunInfoObj);
        break;
      }
    }
  }
  return cardsArr;
};

const getSunActivityObjects = () => {
  const sunriseInfo = { time: '', type: 'sunrise' };
  const sunsetInfo = { time: '', type: 'sunset' };

  currentHour > Number(convertTo24hours(props.today.astro.sunrise).split(':')[0])
    ? (sunriseInfo.time = convertTo24hours(props.tomorrow.astro.sunrise))
    : (sunriseInfo.time = convertTo24hours(props.today.astro.sunrise));

  currentHour < Number(convertTo24hours(props.today.astro.sunrise).split(':')[0])
    ? (sunsetInfo.time = convertTo24hours(props.today.astro.sunset))
    : (sunsetInfo.time = convertTo24hours(props.tomorrow.astro.sunset));

  return { sunriseInfo, sunsetInfo };
};

const cardsData = getCardsData(props.today.hour, props.tomorrow.hour);

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
  <div class="forecast__by-hours" tabindex="0">
    <button
      :disabled="scrollToLeft"
      class="by-hours__button by-hours__button--left"
      @click="scrollLeft"
      tabindex="-1"
      aria-label="scroll to earlier hours"
    >
      <span class="material-symbols-outlined"> chevron_left </span>
    </button>
    <div ref="cardsContainer" class="by-hours__cards" @scroll="checkScroll" tabindex="0">
      <template v-for="(card, index) in cardsData">
        <SunActivityCard
          v-if="(card as SunActivityObj).type"
          :key="index + 'sunActivity'"
          :card-info="(card as SunActivityObj)"
        />
        <HourCard v-else :key="index" :hour-info="(card as HourInfoObj)" />
      </template>
    </div>
    <button
      :disabled="scrollToRight"
      class="by-hours__button by-hours__button--right"
      @click="scrollRight"
      tabindex="-1"
      aria-laber="scroll to later hours"
    >
      <span class="material-symbols-outlined"> chevron_right </span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.forecast__by-hours {
  width: 100%;
  height: 160px;
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
