<template>
  <div v-if="store.matchData">
    <LaneSummary :data="store.matchData"></LaneSummary>

    <ParticipantTable :data="store.matchData"></ParticipantTable>

    <q-tabs v-model="participant" class="text-teal">
      <q-tab
        v-for="participant in store.matchData?.info.participants"
        :key="participant.summonerName"
        :name="participant.championName"
        :icon="`img:${rh.getChampionSquaredPortrait(participant.championId)}`"
        :label="participant.summonerName"
      />
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import { MatchDTO } from 'src/data/MatchInterfaces';
import { watch, computed, ref } from 'vue';
import RiotHelper from 'src/plugins/RiotHelper';
import ParticipantTable from 'src/components/League/Match/ParticipantTable.vue';
import LaneSummary from 'src/components/League/Match/LaneSummary.vue';
import { useSettingsStore } from 'stores/settingsStore';

const route = useRoute();
const participant = ref('');
const rh = RiotHelper.getInstance();
const store = useSettingsStore();

const url = computed(() => {
  const matchId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  return `http://157.90.27.91:3000/api/v1/match/archive/id/${matchId}`;
});

watch(
  url,
  async (newUrl) => {
    const { data } = await useFetch(newUrl).get().json<MatchDTO>();
    store.matchData = data.value;
  },
  { immediate: true }
);
</script>

<style>
.q-tab__label {
  font-size: 1em;
}

.q-tab__icon {
  width: 50px;
  height: 50px;
}
</style>
