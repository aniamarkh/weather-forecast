<script setup lang="ts">
import axios from 'axios';
import { ref, onBeforeMount, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { ForecastResponce } from '@/types';
import { useStore } from '@/store';
import { warmWeatherCodes, coldWeatherCodes, conditionGradients } from '@/utils/weatherGradients';
import CurrentWeather from './CurrentWeather.vue';
import TodayForecast from './hourly/HourlyForecast.vue';
import DailyForecast from './daily/DailyForecast.vue';
import LoadingDots from '../LoadingDots.vue';
import UVindexGraph from './UVindexGraph.vue';
import BlockTitle from '@/components/BlockTitle.vue';

const store = useStore();

const props = defineProps<{ location: string }>();
const loading = ref(true);
const forecast: Ref<null | ForecastResponce> = ref(null);
const errorMessage: Ref<string> = ref('');

const getForecast = async () => {
  try {
    const currentResult = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${
        props.location
      }&days=3&aqi=no&alerts=no`
    );
    forecast.value = currentResult.data as ForecastResponce;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage.value = '😵‍💫 Oops! ' + error.response.data.error.message;
        console.error(error.response.data.error.message);
      }
    } else if (error instanceof Error) {
      errorMessage.value = '😵‍💫 Oops! ' + error.message;
      console.error(error.message);
    } else {
      errorMessage.value = '😵‍💫 Oops! Unknown error occurred';
      console.error('Unknown error occurred.');
    }
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

const onLoad = () => {
  if (!loading.value) loading.value = true;
  getForecast().then(() => {
    if (forecast.value)
      setBackground(
        forecast.value.current.condition.code,
        forecast.value.current.is_day,
        forecast.value.current.temp_c
      );
    loading.value = false;
  });
};

const toggleUserLocations = (locationName: string) => {
  store.getters.isInUserLocations(locationName)
    ? store.commit('removeUserLocation', locationName)
    : store.commit('addUserLocation', locationName);
};

onBeforeMount(onLoad);

onUnmounted(() => {
  document.documentElement.style.setProperty(
    '--init-gradient',
    'linear-gradient(45deg, #9b759b, #6daab1)'
  );
});
</script>

<template>
  <div class="forecast">
    <LoadingDots v-if="loading" />
    <div v-if="!loading && errorMessage" class="forecast__error">
      <p class="error__message" :aria-label="errorMessage" tabindex="0">{{ errorMessage }}</p>
      <div class="error_buttons">
        <button class="error__button" @click="store.commit('removeSelectedLocation')">
          go back
        </button>
        <button class="error__button" @click="onLoad">try again</button>
      </div>
    </div>
    <div v-if="!loading && forecast" class="forecast__result">
      <div class="forecast__header">
        <button
          class="header__button"
          @click="store.commit('removeSelectedLocation')"
          aria-label="back to start screen"
        >
          <span class="material-symbols-outlined"> arrow_back </span>
        </button>
        <div
          class="header__location"
          tabindex="0"
          :aria-label="forecast.location.name + ' detailed forecast'"
        >
          <p class="location__name">{{ forecast.location.name }}</p>
          <p class="location__country">{{ forecast.location.country }}</p>
        </div>
        <button
          class="header__button"
          @click="toggleUserLocations(location)"
          :aria-label="
            store.getters.isInUserLocations(location)
              ? 'delete location from saved locations'
              : 'save this location'
          "
        >
          <span class="material-symbols-outlined">
            {{ store.getters.isInUserLocations(location) ? 'delete' : 'add' }}
          </span>
        </button>
      </div>
      <CurrentWeather :current="forecast.current" />
      <BlockTitle title="Next 24 hour:" />
      <TodayForecast
        :today="forecast.forecast.forecastday[0]"
        :tomorrow="forecast.forecast.forecastday[1]"
        :last_updated="forecast.current.last_updated"
      />
      <BlockTitle title="UV index for today:" />
      <UVindexGraph :today-forecast="forecast.forecast.forecastday[0]" />
      <BlockTitle title="3 day forecast:" />
      <DailyForecast :daily-forecast="forecast.forecast" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';
.forecast {
  width: 100%;
}

.forecast__error {
  @include flex-column;
  gap: 15px;
  .error__message {
    flex-wrap: wrap;
    font-weight: 600;
  }
  .error_buttons {
    @include flex-row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .error__button {
    border: 2px solid #ffffff;
    background: none;
    border-radius: 20px;
    font-size: 1.2rem;
    padding: 10px;

    &:hover {
      background: #ffffff1a;
    }
  }
}
.forecast__result {
  width: 100%;
  @include flex-column;
  gap: 10px;
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
