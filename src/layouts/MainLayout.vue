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
import EssentialLink from 'components/EssentialLink.vue';
import {useQuasar} from 'quasar';
import {useSettingsStore} from 'stores/settingsStore';

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
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
