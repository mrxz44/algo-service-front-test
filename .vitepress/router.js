// .vitepress/router.js
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

// Define routes
const routes = [
  { path: '/login', component: () => import('./components/Login.vue') },
  { path: '/register', component: () => import('./components/Register.vue') },
  {
    path: '/dashboard',
    component: () => import('./components/Dashboard.vue'),
    meta: { requiresAuth: true }, // Add metadata for authentication
  },
];

// Use createMemoryHistory for SSR, and createWebHistory for the client
const isSSR = typeof window === 'undefined';
const history = isSSR ? createMemoryHistory() : createWebHistory();

const router = createRouter({
  history,
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  if (typeof window !== 'undefined') {
    const isAuthenticated = !!localStorage.getItem('access_token'); // Check token existence
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
      next('/dashboard');
    } else {
      next();
    }
  } else {
    next(); // Allow navigation during SSR
  }
});

export default router;
