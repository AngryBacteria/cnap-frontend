import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { getCurrentUser } from 'vuefire';
import { Notify } from 'quasar';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,
    ),
  });

  Router.beforeEach(async (to) => {
    // routes with `meta: { requiresAuth: true }` will check for the users, others won't
    if (to.meta.requiresAuth) {
      const currentUser = await getCurrentUser();
      // if the user is not logged in, redirect to the login page
      if (!currentUser) {
        Notify.create({
          message: 'You have to be logged in to access this page',
          color: 'red',
          position: 'top',
          icon: 'mdi-close-octagon-outline',
        });
        return {
          path: '/login',
          query: {
            // we keep the current path in the query, so we can redirect to it after log in
            // with `router.push(route.query.redirect || '/')`
            redirect: to.fullPath,
          },
        };
      }
    }
  });

  return Router;
});
