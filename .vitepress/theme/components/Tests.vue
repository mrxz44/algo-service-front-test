<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SiteMap from './SiteMap.vue'
import SponsorsGroup from './SponsorsGroup.vue'
import VueMasteryModal from './VueMasteryModal.vue'
import api from '../../axios' // Adjusted path for axios

const apiData = ref(null)

const loadApiData = async () => {
  try {
    const response = await api.get('/')
    console.log('Raw API Response:', response)

    if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
      apiData.value = response.data
    } else {
      console.error('Unexpected response format:', response.data)
      apiData.value = 'Unexpected response format. Check console for details.'
    }
  } catch (error) {
    console.error('API Error:', error)
    apiData.value = 'API Error. Check console for details.'
  }
}

onMounted(() => {
  loadApiData()
})
</script>

<template>
  <section id="hero">
    <img id="uwu" alt="Vue.js Kawaii Logo by @icarusgkx" />
    <h1 class="tagline">
      <span class="accent">Sure </span>
      Way to
      <span class="accent">Trade</span>
    </h1>
    <p class="description">
      Unlock professional trading algorithms and market insights for consistent success
    </p>

    <!-- Display API Output Here -->
    <p v-if="apiData" class="api-output">
      <strong>API Output:</strong> {{ apiData.message }}
    </p>

    <p class="actions">
      <VueMasteryModal />
      <a class="get-started" href="/guide/introduction.html">
        Get Started
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
        </svg>
      </a>
      <a class="setup" href="/guide/quick-start.html">Install</a>
      <a class="security" href="https://v2.vuejs.org/eol/" target="_blank">
        Try free tier
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8-7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
        </svg>
      </a>
    </p>
  </section>

  <!-- Other content continues -->
  <section id="highlights" class="vt-box-container">
    <div class="vt-box">
      <h2>Strategy Builder</h2>
      <p>Create powerful automated trading strategies effortlessly with Zero-Code interface</p>
    </div>
    <div class="vt-box">
      <h2>Smart Order Management</h2>
      <p>Implement professional techniques for optimal trade execution.</p>
    </div>
    <div class="vt-box">
      <h2>Versatile</h2>
      <p>A rich, incrementally adoptable ecosystem that scales between a library and a full-featured framework.</p>
    </div>
  </section>

  <section id="sponsors">
    <h2>Platinum Sponsors</h2>
    <SponsorsGroup tier="platinum" placement="landing" />
    <h2>Gold Sponsors</h2>
    <SponsorsGroup tier="gold" placement="landing" />
  </section>

  <SiteMap />
</template>

<style scoped>
/* Existing styles */
.api-output {
  font-size: 16px;
  color: var(--vt-c-text-2);
  margin: 16px 0;
}
</style>
