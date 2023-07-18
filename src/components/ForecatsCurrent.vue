<script setup lang="ts">
import type { CurrentWeather } from '../types';
import ConditionIcon from './ConditionIcon.vue';

defineProps<{ current: CurrentWeather }>();

const kphIntoMps = (kphValue: number) => {
  return (kphValue * (5 / 18)).toFixed(1);
};

const mbToMmHg = (mbValue: number) => {
  return Math.round(mbValue * 0.750062);
};
</script>

<template>
  <div class="forecast__current">
    <div class="current__main">
      <ConditionIcon
        class="current__icon"
        :code="current.condition.code"
        :is_day="current.is_day"
      />
      <p class="current__temp">{{ Math.round(current.temp_c) + '°' }}</p>
    </div>
    <p class="current__condition">{{ current.condition.text }}</p>
    <p class="current__feelslike">
      feels like
      {{ Math.round(current.feelslike_c) + '°' }}
    </p>
    <div class="current__secondary">
      <div class="secondary__item">
        <span class="material-symbols-outlined">humidity_percentage</span>
        <p>{{ current.humidity + '%' }}</p>
      </div>
      <div class="secondary__item">
        <span class="material-symbols-outlined">air</span>
        <p>{{ kphIntoMps(current.wind_kph) + ' m/s' }}</p>
      </div>
      <div class="secondary__item">
        <span class="material-symbols-outlined">speed</span>
        <p>{{ mbToMmHg(current.pressure_mb) + ' mmHg' }}</p>
      </div>
      <div class="secondary__item">
        <span class="uv">UV</span>
        <p>{{ current.uv }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.forecast__current {
  width: 100%;
  @include flex-column;
  gap: 5px;
  @include glassmorphism;
  padding: 20px;
}

.current__main {
  @include flex-row;
  align-items: center;
  gap: 10px;

  .current__temp {
    font-size: 60px;
  }
  .current__icon {
    width: 60px;
  }
}

.current__condition {
  font-weight: 600;
}

.current__feelslike {
  font-size: 1rem;
}

.current__secondary {
  margin-top: 10px;
  @include flex-row;
  width: 100%;
  justify-content: space-between;

  .secondary__item {
    @include flex-column;
    padding: 10px;

    span {
      line-height: 30px;
    }

    p {
      font-size: 0.9rem;
    }

    .uv {
      font-weight: 600;
    }
  }
}
</style>
