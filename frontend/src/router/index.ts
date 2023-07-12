import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import ProfilePage from '@/views/ProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/profile-page',
    name: 'profile',
    component: ProfilePage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
