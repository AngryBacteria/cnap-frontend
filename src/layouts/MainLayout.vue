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
          Quasar App
        </q-toolbar-title>

        <q-toggle v-model="store.userPrefDarkMode" > {{$q.dark.mode}} </q-toggle>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      style="border-right-color: #34b27b; border-right-style: solid; border-width: 1px">
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="my-div">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/NavigationItem.vue';
import {useQuasar} from 'quasar';
import {useSettingsStore} from 'stores/settingsStore';

const essentialLinks = [
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
