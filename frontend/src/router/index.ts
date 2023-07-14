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
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile-page',
    name: 'profile',
    component: ProfilePage,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Authentication check
    const token = localStorage.getItem('token')

    if (token) {
      // check if token is valid
      return next()
    }
    return next('/login');
  }

  next()
})

export default router;
