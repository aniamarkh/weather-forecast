<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
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
    if (hour.uv >= 5) {
      return { value: hour.uv, itemStyle: { color: '#d64949d2' } };
    } else {
      return { value: hour.uv, itemStyle: { color: '#ffffffd2' } };
    }
  });
};

const highUVTimes = computed(() => {
  const highUVHours = props.todayForecast.hour.filter((hour) => hour.uv >= 5);
  return highUVHours.map((hour) => new Date(hour.time).getHours() + ':00');
});

const options = ref({
  grid: {
    top: '5%',
    bottom: '15%',
    right: '5%',
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

<template>
  <div class="uv-index">
    <div class="uv-index__graph" ref="chartDom" aria-label="UV index graph" tabindex="0"></div>
    <p class="uv-index__desc" v-if="highUVTimes.length" tabindex="0">
      The UV index is high from {{ highUVTimes[0] }} through
      {{ highUVTimes[highUVTimes.length - 1] }}. Remember to wear sunscreen during this period!
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_config.scss';

.uv-index {
  @include glassmorphism;
  padding: 20px;
}
.uv-index__graph {
  width: 100%;
  height: 220px;
}

.uv-index__desc {
  text-align: justify;
  padding-top: 10px;
  font-size: 1rem;
}
</style>
