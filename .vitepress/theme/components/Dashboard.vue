<template>
  <MinimalLayout>
    <div class="dashboard-container">
      <h1>Welcome, {{ user.name }}</h1>
      <p>Your email: {{ user.email }}</p>
    </div>
  </MinimalLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../../axios';

const user = ref(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  console.log('Dashboard loading...');
  try {
    const response = await apiClient.get('/user_management/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    user.value = response.data;
  } catch (err) {
    console.error('Error fetching user data:', err);
    error.value = 'Failed to load user data.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
