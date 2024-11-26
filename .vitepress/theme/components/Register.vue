<template>
  <MinimalLayout>
    <div class="auth-container">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required autocomplete="email" />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required autocomplete="new-password" />

        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required autocomplete="new-password" />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
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
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const response = await apiClient.post('/user_management/register', {
      email: email.value,
      password: password.value,
    });

    // Store JWT Token (if applicable)
    localStorage.setItem('token', response.data.token);

    // Redirect to Dashboard
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed';
  } finally {
    loading.value = false;
  }
};
</script>
