<template>
  <MinimalLayout>
    <div class="auth-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required autocomplete="email" />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required autocomplete="current-password" />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </MinimalLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../../axios';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await apiClient.post('/user_management/login', {
      email: email.value,
      password: password.value,
    });

    console.log('Login Response:', response); // Log the full response for debugging

    if (response.data && response.data.access_token) {
      // Store tokens in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('token_type', response.data.token_type);

      // Redirect to Dashboard
      // const redirectPath = router.currentRoute.value.query.redirect || '/dashboard';
      // router.push(redirectPath);
      // if (typeof window !== 'undefined') {
      //   window.location.href = '/dashboard';
      // }
      if (typeof window !== 'undefined') {
        router.push('/dashboard').then(() => {
          window.location.reload();
        });
    } else {
      error.value = 'Unexpected login response format';
    }
  } catch (err) {
    console.error('Login Error:', err); // Log any errors
    error.value = err.response?.data?.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};


</script>
