<script setup lang="ts">
import { computed } from 'vue';
import iconMapping from '@/utils/iconMapping';

const props = defineProps<{
  conditionCode: number | string;
  conditionText?: string;
  is_day?: number;
}>();

const currentWeatherIcon = computed((): string => {
  if (typeof props.conditionCode === 'string') {
    return props.conditionCode === 'sunrise'
      ? '../assets/images/sunrise.png'
      : '../assets/images/sunset.png';
  } else {
    const isDay = props.is_day ? true : false;
    const iconLocation = isDay ? '../assets/images/day' : '../assets/images/night';
    return `${iconLocation}/${iconMapping[props.conditionCode.toString()]}`;
  }
});
</script>

<template>
  <img
    :src="currentWeatherIcon"
    :alt="conditionText ? 'Weather conditions: ' + conditionText : 'Weather conditions:'"
  />
</template>
