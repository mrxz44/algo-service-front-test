<template>
  <div>
    <p v-if="loading">Loading data...</p>
    <p v-else-if="error">Error loading data: {{ error.message }}</p>
    <div v-else>
      <p><strong>API Output:</strong></p>
      <pre>{{ apiData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '../../axios'

const apiData = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get('/run_strategy/BTCUSDT/15m'); // Replace with your API endpoint
    apiData.value = response.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
}
</style>
