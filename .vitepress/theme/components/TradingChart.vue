<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { createChart } from 'lightweight-charts';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartContainer = ref(null);
let chart;

const processData = (data) => {
  if (!data || !data.signals) return [];

  // Convert and sort by time
  const sortedData = data.signals
    .map((item) => ({
      time: Math.floor(item.open_time / 1000),
      value: item.close,
    }))
    .sort((a, b) => a.time - b.time);

  // Remove duplicates by time
  const deduplicatedData = sortedData.filter(
    (item, index, array) => index === 0 || item.time !== array[index - 1].time
  );

  return deduplicatedData;
};

const processMarkers = (data) => {
  if (!data || !data.signals) return [];
  return data.signals.map((item) => ({
    time: Math.floor(item.open_time / 1000),
    position: 'aboveBar',
    color: item.signal === 'buy' ? 'green' : 'red',
    shape: item.signal === 'buy' ? 'arrowUp' : 'arrowDown',
    text: item.signal.toUpperCase(),
  }));
};

const setupChart = () => {
  if (!chartContainer.value) return; // Ensure chartContainer is defined

  chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: 400,
    layout: { backgroundColor: '#ffffff', textColor: '#000' },
    grid: { vertLines: { color: '#ebebeb' }, horzLines: { color: '#ebebeb' } },
  });

  const lineSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2 });
  lineSeries.setData(processData(props.data));
  lineSeries.setMarkers(processMarkers(props.data));
};

onMounted(() => {
  setupChart();
});

watch(
  () => props.data,
  (newData) => {
    if (!chart) return;
    const lineSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2 });
    lineSeries.setData(processData(newData));
    lineSeries.setMarkers(processMarkers(newData));
  },
  { immediate: true }
);
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
