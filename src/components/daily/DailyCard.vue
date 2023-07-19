<script setup lang="ts">
import type { ForecastDay } from '../../types';
import ConditionIcon from '../ConditionIcon.vue';

defineProps<{ dayForecast: ForecastDay; date: string }>();

const getWeekday = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const formatDate = (dateString: string) => {
  if (dateString === 'Today') {
    return 'Today';
  } else {
    const date = new Date(dateString);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
};
</script>

<template>
  <div class="daily__card">
    <div class="card__left">
      <p class="card__weekday">{{ getWeekday(dayForecast.date) }}</p>
      <p class="card__date">{{ formatDate(date) }}</p>
    </div>
    <div class="card__right">
      <ConditionIcon class="card__icon" :code="dayForecast.day.condition.code" :is_day="1" />
      <p class="card__maxtemp">{{ Math.round(dayForecast.day.maxtemp_c) + '°' }}</p>
      <p class="card__mintemp">{{ Math.round(dayForecast.day.mintemp_c) + '°' }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.daily__card {
  width: 100%;
  @include flex-row;
  justify-content: space-between;
}

.card__left {
  @include flex-column;
  align-items: flex-start;
  gap: 3px;

  .card__weekday {
    font-size: 1rem;
    opacity: 0.7;
  }

  .card__date {
    font-weight: 600;
  }
}

.card__right {
  @include flex-row;
  align-items: center;
  gap: 10px;

  .card__icon {
    height: 30px;
  }

  .card__maxtemp {
    font-weight: 600;
  }
  .card__mintemp {
    opacity: 0.7;
  }
}
</style>
