<template>
  <div v-if="!summoner">No Summoner data</div>
  <div v-if="summoner">
    <h1>{{ summoner.name }}</h1>
  </div>
  <div v-if="matches">
    <div v-for="match in matches" :key="match.match_id">
      <img
        width="50"
        :src="rh.getChampionSquaredPortrait(match.data_participant.championId)"
        alt="summoner1"
      />
      {{ rh.getQueueInfo(match.data_match.queueId)?.description }}
      | {{ match.data_participant.win }} |
      {{ new Date(match.data_match.gameCreation).toDateString() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { SummonerData } from 'src/data/interfaces/CustomInterfaces';
import type { ParticipantMatch } from 'src/data/interfaces/ParticipantMatchInterfaces';
import { useSettingsStore } from 'src/stores/settingsStore';
import { useRoute } from 'vue-router';
import RiotHelper from 'src/plugins/RiotHelper';

const route = useRoute();
const store = useSettingsStore();
const rh = RiotHelper.getInstance();

const puuid = route.params.puuid;

const { data: summoner } = await useFetch(
  `${store.apiEndpoint}/api/v1/summoner/puuid/${puuid}`
)
  .get()
  .json<SummonerData>();

const { data: matches } = await useFetch(
  `${store.apiEndpoint}/api/v1/match/participant/puuid/${puuid}`
)
  .get()
  .json<ParticipantMatch[]>();
</script>

<style></style>
