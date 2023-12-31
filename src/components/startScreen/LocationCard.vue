<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useStore } from '@/store';
import type { CurrentForecastResponce } from '@/types';
import ConditionIcon from '../ConditionIcon.vue';
import LoadingDots from '../LoadingDots.vue';

const store = useStore();

const props = defineProps<{ location: String }>();
const loading = ref(true);
const forecast: Ref<null | CurrentForecastResponce> = ref(null);
const errorMessage: Ref<string> = ref('');

const getForecast = async () => {
  try {
    const currentResult = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${
        props.location
      }&aqi=no`
    );
    forecast.value = currentResult.data as CurrentForecastResponce;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(error.response.data.error.message);
      }
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occurred.');
    }
    errorMessage.value = '😵‍💫 Oops! Error occurred 😵‍💫';
  }
};

onMounted(() => {
  getForecast().then(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div class="location-card">
    <LoadingDots v-if="loading" />
    <div v-if="!loading && errorMessage" class="location-card__error">
      <p class="error__message">{{ errorMessage }}</p>
    </div>
    <div
      tabindex="0"
      v-if="!loading && forecast"
      class="location-card__result"
      @click="store.commit('setSelectedLocation', location)"
      @keyup.enter="store.commit('setSelectedLocation', location)"
    >
      <div class="location-card__location">
        <p class="location__name">{{ forecast.location.name }}</p>
        <p class="location__country">{{ forecast.location.country }}</p>
      </div>
      <div class="location-card__condition">
        <ConditionIcon
          class="condition__icon"
          :condition-code="forecast.current.condition.code"
          :condition-text="forecast.current.condition.text"
          :is_day="forecast.current.is_day"
        />
        <p class="condition__temp">{{ Math.round(forecast.current.temp_c) + '°' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.location-card {
  @include glassmorphism;
  width: 100%;
  height: 90px;
}

.location-card__error {
  width: 100%;
  height: 100%;
  @include flex-column;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.error__message {
  flex-wrap: wrap;
  font-weight: 600;
}

.location-card__result {
  width: 100%;
  height: 100%;
  @include flex-row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid #ffffff00;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 2px solid #ffffff;
  }
}

.location__name {
  font-weight: 600;
}

.location__country {
  font-size: 1rem;
}

.location-card__condition {
  @include flex-row;
  gap: 10px;
  align-items: center;
}
.condition__icon {
  width: 50px;
}

.condition__temp {
  font-size: 30px;
}
</style>
