<template>
  <div>
    <TradingChart :data="chartData" v-if="chartData" />
    <p v-else>Loading chart data...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '../../axios';
import TradingChart from './TradingChart.vue';

const chartData = ref(null);

const loadChartData = async () => {
  try {
    const response = await axios.get('/run_strategy/BTCUSDT/15m'); // Replace with actual endpoint
    chartData.value = response.data;
  } catch (error) {
    console.error('Error loading chart data:', error);
  }
};

onMounted(loadChartData);
</script>

<style scoped>
/* Optional styling */
</style>
