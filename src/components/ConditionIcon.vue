<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ code: number; is_day: number }>();
import iconMapping from '../utils/iconMapping';

const currentWeatherIcon = computed(() => {
  const isDay = props.is_day ? true : false;
  const iconLocation = isDay ? '../assets/images/day' : '../assets/images/night';
  return `${iconLocation}/${iconMapping[props.code.toString()]}`;
});
</script>

<template>
  <img :src="currentWeatherIcon" />
</template>
