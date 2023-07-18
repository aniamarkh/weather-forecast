<script setup lang="ts">
import type { HourInfoObj } from '../../types';
import ConditionIcon from '../ConditionIcon.vue';

defineProps<{ hourInfo: HourInfoObj }>();

const extractTime = (date: string) => {
  return date.split(' ')[1];
};
</script>

<template>
  <div class="today__hour-card">
    <p class="hour-card__time">{{ extractTime(hourInfo.time) }}</p>
    <ConditionIcon
      class="hour-card__icon"
      :code="hourInfo.condition.code"
      :is_day="hourInfo.is_day"
    />
    <p class="hour-card__temp">{{ Math.round(hourInfo.temp_c) + '°' }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.today__hour-card {
  @include flex-column;
  gap: 10px;
  padding-bottom: 10px;
  min-width: 60px;
}

.hour-card__time {
  font-size: 1rem;
}

.hour-card__temp {
  font-weight: 600;
}

.hour-card__icon {
  width: 30px;
}
</style>
