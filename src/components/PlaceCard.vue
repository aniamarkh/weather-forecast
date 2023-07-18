<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import type { CurrentForecastResponce } from '../types';
import ConditionIcon from './ConditionIcon.vue';

const props = defineProps<{ place: String }>();
const forecast: Ref<null | CurrentForecastResponce> = ref(null);
const forecastError: Ref<boolean> = ref(false);
const emit = defineEmits(['set-place']);

const getForecast = async () => {
  try {
    const currentResult = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${
        props.place
      }&aqi=no`
    );
    forecast.value = currentResult.data as CurrentForecastResponce;
  } catch {
    forecastError.value = true;
  }
};

onMounted(() => {
  getForecast();
});
</script>

<template>
  <div v-if="forecast" class="place-card" @click="emit('set-place', place)">
    <div class="place-card__location">
      <p class="location__name">{{ forecast.location.name }}</p>
      <p class="location__country">{{ forecast.location.country }}</p>
    </div>
    <div class="place-card__condition">
      <ConditionIcon
        class="condition__icon"
        :code="forecast.current.condition.code"
        :is_day="forecast.current.is_day"
      />
      <p class="condition__temp">{{ Math.round(forecast.current.temp_c) + '°' }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.place-card {
  width: 100%;
  height: 90px;
  @include glassmorphism;
  @include flex-row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border: 2px solid #ffffff00;
  transition: all 0.2s ease-in-out;

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

.place-card__condition {
  @include flex-row;
  gap: 10px;
  align-items: center;
}
.condition__icon {
  width: 60px;
}

.condition__temp {
  font-size: 30px;
}
</style>
