<template>
  <q-layout view="hHh Lpr lFf">
    <q-header bordered>
      <q-toolbar :class="{ 'bg-dark': $q.dark.isActive }">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> CNAP </q-toolbar-title>

        <q-btn-dropdown
          color="secondary"
          label="Account"
          rounded
          class="text-black"
        >
          <q-list>
            <q-item
              v-if="!store.isLoggedIn"
              clickable
              v-close-popup
              @click="
                router.push({
                  path: '/login',
                  query: { redirect: route.currentRoute.value.fullPath },
                })
              "
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-login-variant" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-if="store.isLoggedIn"
              clickable
              v-close-popup
              @click="logout"
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-logout-variant" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-if="!store.isLoggedIn"
              clickable
              v-close-popup
              @click="
                router.push({
                  path: '/register',
                  query: { redirect: route.currentRoute.value.fullPath },
                })
              "
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-account-plus" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Register</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-if="store.isLoggedIn"
              clickable
              v-close-popup
              @click="router.push('/account')"
            >
              <q-item-section avatar>
                <q-avatar icon="mdi-account" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Account</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-toggle
          v-model="store.userPrefDarkMode"
          checked-icon="mdi-weather-night"
          unchecked-icon="mdi-white-balance-sunny"
          size="50px"
        >
        </q-toggle>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      style="
        border-right-color: #34b27b;
        border-right-style: solid;
        border-width: 1px;
      "
    >
      <q-scroll-area
        :style="
          store.refUser
            ? {
                height: 'calc(100% - 120px)',
                'margin-top': '120px',
                'border-right': '1px solid #ddd',
              }
            : { height: '100%' }
        "
      >
        <q-list>
          <q-item-label header class="text-weight-bold text-uppercase">
            Main Area
          </q-item-label>
          <NavigationItem
            v-for="link in accountLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-separator />

          <q-item-label header class="text-weight-bold text-uppercase">
            League of Legends
          </q-item-label>
          <NavigationItem
            v-for="link in leagueLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-separator />

          <q-item-label header class="text-weight-bold text-uppercase">
            Lore
          </q-item-label>
          <NavigationItem
            v-for="link in loreLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-separator />

          <q-item-label header class="text-weight-bold text-uppercase">
            Pen and Paper
          </q-item-label>
          <NavigationItem
            v-for="link in pnpLinks"
            :key="link.title"
            v-bind="link"
          />
          <q-separator />

          <q-item-label header class="text-weight-bold text-uppercase">
            Legends of Runeterra
          </q-item-label>
          <NavigationItem
            v-for="link in lorLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <q-img
        v-if="store.refUser && store.refUser.photoURL"
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 120px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="store.refUser.photoURL" alt="profilePicture" />
          </q-avatar>
          <div class="text-weight-bold">{{ store.refUser.displayName }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container class="my-div">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationItem from 'components/NavigationItem.vue';
import { Notify, useQuasar } from 'quasar';
import { useSettingsStore } from 'stores/settingsStore';
import { useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { Permissions } from 'src/data/interfaces/CustomInterfaces';

const store = useSettingsStore();
const $q = useQuasar();
const router = useRouter();
const route = useRouter();

interface NavigationLink {
  title: string;
  caption: string;
  icon: string;
  link: string;
  permission?: Permissions;
}

const accountLinks: NavigationLink[] = [
  {
    title: 'Home',
    caption: 'Homepage',
    icon: 'home',
    link: '/home',
  },
  {
    title: 'Account',
    caption: 'Your Account',
    icon: 'mdi-account',
    link: '/account',
    permission: Permissions.LOGGED_IN,
  },
  {
    title: 'Login',
    caption: 'Login to your Account',
    icon: 'mdi-login-variant',
    link: '/login',
    permission: Permissions.LOGGED_OUT,
  },
  {
    title: 'Register',
    caption: 'Register an Account',
    icon: 'mdi-account-plus',
    link: '/register',
    permission: Permissions.LOGGED_OUT,
  },
];
const leagueLinks: NavigationLink[] = [
  /*   {
      title: 'Leaderboard',
      caption: 'Leaderboard of CNAP-Players',
      icon: 'leaderboard',
      link: '/lol/leaderboard',
    }, */
  {
    title: 'Summoners',
    caption: 'Summoners of CNAP',
    icon: 'groups',
    link: '/lol/summoners',
  },
  /*   {
      title: 'Macthes',
      caption: 'Matches of CNAP',
      icon: 'sports_mma',
      link: '/lol/matches',
    }, */
];
const loreLinks: NavigationLink[] = [
  /*   {
      title: 'Regions',
      caption: 'Regions of Ruenterra',
      icon: 'mdi-earth',
      link: '/lore/regions',
    },
    {
      title: 'Champions',
      caption: 'Champions of Runeterra',
      icon: 'mdi-account-cowboy-hat',
      link: '/lol/champions',
    }, */
];
const pnpLinks: NavigationLink[] = [
  {
    title: 'DSA',
    caption: 'Das schwarze Auge',
    icon: 'mdi-sword',
    link: '/pnp/dsa',
  },
  {
    title: 'SWN',
    caption: 'Stars without Numbers',
    icon: 'ion-planet',
    link: '/pnp/swn',
    permission: Permissions.SWN,
  },
];
const lorLinks: NavigationLink[] = [
  /*   {
      title: 'Cards',
      caption: 'Cards of LoR',
      icon: 'mdi-cards-playing-diamond',
      link: '/lor/cards',
    },
    {
      title: 'Decks',
      caption: 'Decks of LoR',
      icon: 'mdi-cards-playing',
      link: '/lor/decks',
    }, */
];
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function logout() {
  try {
    const auth = useFirebaseAuth();
    if (auth) {
      await signOut(auth);
      console.log('logged out');
      Notify.create({
        message: 'Erfolgreich ausgelogged',
        color: 'primary',
        position: 'top',
        icon: 'mdi-check',
      });
    }
    await router.push('/');
  } catch (error) {
    console.log(`Error while attempting to Log-Out: ${error}`);
  }
}
</script>

<style lang="sass" scoped>
.my-div
  body.screen--xl &
    margin: 5% 5% 5% 5%
  body.screen--lg &
    margin: 5% 5% 5% 5%
  body.screen--md &
    margin: 5% 5% 5% 5%
  body.screen--sm &
    margin: 5% 5% 5% 5%
  body.screen--xs &
    margin: 5% 5% 5% 5%
</style>
