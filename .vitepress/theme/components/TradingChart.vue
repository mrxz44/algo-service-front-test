<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { createChart } from 'lightweight-charts';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartContainer = ref(null);
let chart;
let lineSeries;

const processData = (data) => {
  if (!data || !data.signals) return [];
  const sortedData = data.signals
    .map((item) => ({
      time: Math.floor(item.open_time / 1000),
      value: item.close,
    }))
    .sort((a, b) => a.time - b.time);
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
  if (!chartContainer.value) return;

  chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: 400,
    layout: { backgroundColor: '#ffffff', textColor: '#000' },
    grid: { vertLines: { color: '#ebebeb' }, horzLines: { color: '#ebebeb' } },
  });

  lineSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2 });
  lineSeries.setData(processData(props.data));
  lineSeries.setMarkers(processMarkers(props.data));
};

// Function to resize chart based on container size
const resizeChart = () => {
  if (chart && chartContainer.value) {
    chart.applyOptions({
      width: chartContainer.value.clientWidth,
      height: chartContainer.value.clientHeight || 400,
    });
  }
};

onMounted(() => {
  setupChart();
  window.addEventListener('resize', resizeChart); // Listen for window resize
});

watch(
  () => props.data,
  (newData) => {
    if (lineSeries) {
      lineSeries.setData(processData(newData));
      lineSeries.setMarkers(processMarkers(newData));
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart); // Clean up listener
  if (chart) {
    chart.remove();
    chart = null;
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
