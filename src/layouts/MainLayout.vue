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

        <q-toolbar-title>
          CNAP
        </q-toolbar-title>

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
      style="border-right-color: #34b27b; border-right-style: solid; border-width: 1px">
      <q-list>
        <q-item-label header class="text-weight-bold text-uppercase">
          Testing Area
        </q-item-label>
        <NavigationItem
          v-for="link in testingLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>

        <q-item-label header class="text-weight-bold text-uppercase">
          League of Legends
        </q-item-label>
        <NavigationItem
          v-for="link in leagueLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>

        <q-item-label header class="text-weight-bold text-uppercase">
          Lore
        </q-item-label>
        <NavigationItem
          v-for="link in loreLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>

        <q-item-label header class="text-weight-bold text-uppercase">
          Pen and Paper
        </q-item-label>
        <NavigationItem
          v-for="link in pnpLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>

        <q-item-label header class="text-weight-bold text-uppercase">
          Legends of Runeterra
        </q-item-label>
        <NavigationItem
          v-for="link in lorLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>
      </q-list>
    </q-drawer>

    <q-page-container class="my-div">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationItem from 'components/NavigationItem.vue';
import {useQuasar} from 'quasar';
import {useSettingsStore} from 'stores/settingsStore';
import {getCurrentUser} from 'vuefire';

const user = await getCurrentUser()
const token = await user?.getIdTokenResult()

const testingLinks = [
  {
    title: 'Auth Testing',
    caption: 'Test page for firebase auth',
    icon: 'school',
    link: '/auth'
  },
  {
    title: 'Login',
    caption: 'Test page for logging in',
    icon: 'code',
    link: '/login'
  }
];
const leagueLinks = [
  {
    title: 'Leaderboard',
    caption: 'Leaderboard of CNAP-Players',
    icon: 'leaderboard',
    link: '/lol/leaderboard'
  },
  {
    title: 'Summoners',
    caption: 'Summoners of CNAP',
    icon: 'groups',
    link: '/lol/summoners'
  },
  {
    title: 'Macthes',
    caption: 'Matches of CNAP',
    icon: 'sports_mma',
    link: '/lol/matches'
  }
];
const loreLinks = [
  {
    title: 'Regions',
    caption: 'Regions of Ruenterra',
    icon: 'mdi-earth',
    link: '/lore/regions'
  },
  {
    title: 'Champions',
    caption: 'Champions of Runeterra',
    icon: 'mdi-account',
    link: '/lol/champions'
  }
];
const pnpLinks = [
  {
    title: 'DSA',
    caption: 'Das schwarze Auge',
    icon: 'mdi-sword',
    link: '/pnp/dsa'
  },
  {
    title: 'SWN',
    caption: 'Stars without Numbers',
    icon: 'ion-planet',
    link: '/pnp/swn',
    permission: 'swn',
    claims: token?.claims
  }
];
const lorLinks = [
  {
    title: 'Cards',
    caption: 'Cards of LoR',
    icon: 'mdi-cards-playing-diamond',
    link: '/lor/cards'
  },
  {
    title: 'Decks',
    caption: 'Decks of LoR',
    icon: 'mdi-cards-playing',
    link: '/lor/decks'
  }
];

const store = useSettingsStore()
const $q = useQuasar()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="sass" scoped>
.my-div
  body.screen--xl &
    margin: 5% 10% 5% 10%

  body.screen--lg &
    margin: 5% 10% 5% 10%

  body.screen--md &
    margin: 5% 10% 5% 10%

  body.screen--sm &
    margin: 5% 5% 5% 5%

  body.screen--xs &
    margin: 5% 5% 5% 5%
</style>
