// .vitepress/router.js
import { createRouter, createWebHistory } from 'vue-router';

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

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check token existence
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else if (to.path === '/login' && isAuthenticated) {
    console.log('Navigation Guard:', { to, from });
    next('/dashboard'); // Redirect to dashboard if already logged in
  } else {
    next(); // Allow navigation
  }
});

export default router;
