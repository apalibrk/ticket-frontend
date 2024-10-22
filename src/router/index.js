import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import ManageTickets from '@/views/ManageTickets.vue';
import ManageEvents from '@/views/ManageEvents.vue';
import Organizers from '@/views/Organizers.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  { path: '/manage-tickets', component: ManageTickets, meta: { requiresAuth: true }},
  { path: '/manage-events', component: ManageEvents, meta: { requiresAuth: true }},
  { path: '/organizers', component: Organizers, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', redirect: '/login' } // Updated catch-all route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
