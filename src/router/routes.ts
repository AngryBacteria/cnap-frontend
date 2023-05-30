import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('pages/HomePage.vue'),
      },
      //auth
      {
        path: '/account',
        component: () => import('src/pages/Auth/EditAccountPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/:uid',
        component: () => import('src/pages/Auth/AccountPage.vue'),
      },
      {
        path: '/login',
        component: () => import('pages/Auth/LoginPage.vue'),
      },
      {
        path: '/register',
        component: () => import('pages/Auth/RegisterPage.vue'),
      },
      //League of Legends
      {
        path: 'lol/summoners',
        component: () => import('src/pages/League/SummonersOverview.vue'),
      },
      {
        path: 'lol/summoners/:puuid',
        component: () => import('src/pages/League/SummonerDetails.vue'),
      },
      {
        path: 'lol/match/:id',
        component: () => import('pages/League/LOLMatch.vue'),
      },
      //Tabletop
      {
        path: '/pnp/createCharacter',
        component: () => import('pages/PenAndPaper/CharacterCreator.vue'),
      },
      {
        path: '/pnp/characterOverview',
        component: () => import('pages/PenAndPaper/CharacterOverview.vue'),
      },
      {
        path: '/pnp/createCampaign',
        component: () => import('pages/PenAndPaper/CampaignCreator.vue'),
      },
      {
        path: '/pnp/campaignOverview',
        component: () => import('pages/PenAndPaper/CampaignOverview.vue'),
      },
      {
        path: '/pnp/:charid',
        component: () => import('src/pages/PenAndPaper/CharacterDetails.vue'),
      },
      {
        path: '/pnp/edit/:charid',
        component: () => import('src/pages/PenAndPaper/editCharacter.vue'),
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
