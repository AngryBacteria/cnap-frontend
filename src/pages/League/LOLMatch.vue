<template>
  <div v-if="store.currentMatch">
    <LaneSummary :data="store.currentMatch"></LaneSummary>

    <ParticipantTable :data="store.currentMatch"></ParticipantTable>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import { watch, computed } from 'vue';
import ParticipantTable from 'src/components/League/Match/ParticipantTable.vue';
import LaneSummary from 'src/components/League/Match/LaneSummary.vue';
import { useSettingsStore } from 'stores/settingsStore';
import { MatchV5DTO } from 'src/data/interfaces/CustomInterfaces';

const route = useRoute();
const store = useSettingsStore();

const url = computed(() => {
  const matchId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  return store.apiEndpoint + `/api/v1/match/archive/id/${matchId}`;
});

watch(
  url,
  async (newUrl) => {
    const { data } = await useFetch(newUrl).get().json<MatchV5DTO>();
    store.currentMatch = data.value;
  },
  { immediate: true },
);
</script>

<style scoped>
.q-tab__label {
  font-size: 1em;
}

.q-tab__icon {
  width: 50px;
  height: 50px;
}
</style>
