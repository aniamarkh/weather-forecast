<template>
  <div ref="chartDom" class="uv-index__graph" aria-label="uv-index graph"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import type { ForecastDay, HourInfoObj } from '@/types';

const props = defineProps<{ todayForecast: ForecastDay }>();

const chartDom = ref(null);

const getHoursArray = (data: HourInfoObj[]): string[] => {
  return data.map((hour: HourInfoObj) => {
    const date = new Date(hour.time);
    return date.getHours() + ':00';
  });
};

const getUVindexArray = (data: HourInfoObj[]) => {
  return data.map((hour: HourInfoObj) => {
    if (hour.uv > 5 && hour.uv < 8) {
      return { value: hour.uv, itemStyle: { color: '#ff9999d2' } };
    } else if (hour.uv >= 8) {
      return { value: hour.uv, itemStyle: { color: '#d64949d2' } };
    } else {
      return { value: hour.uv, itemStyle: { color: '#ffffffd2' } };
    }
  });
};

const options = ref({
  grid: {
    top: '15%',
    bottom: '15%',
  },
  xAxis: {
    type: 'category',
    data: getHoursArray(props.todayForecast.hour),
    axisLabel: {
      interval: 5,
      fontSize: 14,
      fontFamily: 'Raleway',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff',
      },
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 10,
    interval: 1,
    axisLabel: {
      fontSize: 14,
      fontFamily: 'Raleway',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff',
      },
    },
    splitLine: {
      lineStyle: {
        color: '#ffffff3f',
      },
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      fontWeight: 'bold',
    },
    formatter: function (
      params: { axisValueLabel: string; data: { itemStyle: string; value: number } }[]
    ) {
      return 'UV index at ' + params[0].axisValueLabel + ' is ' + params[0].data.value;
    },
  },
  series: [
    {
      name: 'UV index',
      data: getUVindexArray(props.todayForecast.hour),
      type: 'bar',
      barWidth: '90%',
    },
  ],
});

onMounted(() => {
  const chartInstance = echarts.init(chartDom.value);
  chartInstance.setOption(options.value);
});
</script>

<style lang="scss" scoped>
@import '@/assets/_config.scss';

div {
  @include glassmorphism;
  width: 100%;
  height: 220px;
}
</style>
