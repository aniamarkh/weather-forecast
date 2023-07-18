<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ code: number | string; is_day?: number }>();
import iconMapping from '../utils/iconMapping';

const currentWeatherIcon = computed((): string => {
  if (typeof props.code === 'string') {
    return props.code === 'sunrise'
      ? '../assets/images/sunrise.png'
      : '../assets/images/sunset.png';
  } else {
    const isDay = props.is_day ? true : false;
    const iconLocation = isDay ? '../assets/images/day' : '../assets/images/night';
    return `${iconLocation}/${iconMapping[props.code.toString()]}`;
  }
});
</script>

<template>
  <img :src="currentWeatherIcon" />
</template>
