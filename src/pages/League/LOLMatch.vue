<template>
  {{ url }}
  <div v-if="data">
    <div
      v-for="participant in data?.info.participants"
      :key="participant.puuid"
    >
      <img
        width="50"
        :src="rh.getChampionSquaredPortrait(participant.championId)"
        :alt="participant.summonerName"
      />
      {{ participant.summonerName }} -- {{ participant.kills }}/{{
        participant.deaths
      }}/{{ participant.assists }} --
      {{ participant.championName }}
    </div>

    <q-tabs v-model="participant" class="text-teal">
      <q-tab
        v-for="participant in data?.info.participants"
        :key="participant.summonerName"
        :name="participant.championName"
        :icon="`img:${rh.getChampionSquaredPortrait(participant.championId)}`"
        :label="participant.summonerName"
      />
    </q-tabs>

    <ParticipantTable :data="data"></ParticipantTable>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import { MatchDTO } from 'src/data/MatchInterfaces';
import { computed, ref } from 'vue';
import RiotHelper from 'src/plugins/RiotHelper';
import ParticipantTable from 'components/League/ParticipantTable.vue';

const route = useRoute();
const participant = ref('');
const rh = RiotHelper.getInstance();

const url = computed(() => {
  const matchId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  return `http://157.90.27.91:3000/api/v1/match/archive/id/${matchId}`;
});

const { data } = await useFetch(url, { refetch: true }).get().json<MatchDTO>();
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
