<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSettingsStore } from 'stores/settingsStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const store = useSettingsStore();

onBeforeMount(() => {
  $q.dark.set(store.userPrefDarkMode);
});
</script>
