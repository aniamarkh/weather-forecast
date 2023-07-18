<script setup lang="ts">
import type { SunActivityObj } from '../../types';
import ConditionIcon from '../ConditionIcon.vue';

defineProps<{ cardInfo: SunActivityObj }>();
</script>

<template>
  <div class="today__sun-card">
    <p class="sun-card__time">{{ cardInfo.time }}</p>
    <ConditionIcon class="sun-card__icon" :code="cardInfo.type" />
    <p class="sun-card__type">{{ cardInfo.type }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.today__sun-card {
  @include flex-column;
  gap: 10px;
  padding-bottom: 10px;
  min-width: 60px;
}

.sun-card__time {
  font-size: 1rem;
}

.sun-card__type {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 22px;
}

.sun-card__icon {
  width: 30px;
}
</style>
