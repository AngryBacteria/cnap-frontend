import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/auth',
        component: () => import('pages/Auth/AuthTesting.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/login',
        component: () => import('pages/Auth/LoginPage.vue'),
      },
      {
        path: '/register',
        component: () => import('pages/Auth/RegisterPage.vue'),
      },
      {
        path: 'lol/match/:id',
        component: () => import('pages/League/LOLMatch.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;