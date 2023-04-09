<template>
  <div v-if="!summoner">No Summoner data</div>
  <div v-if="summoner">
    <h3 style="margin-top: 0">{{ summoner.name }}</h3>
  </div>
  <div v-if="matches" class="matches">
    <div
      @click="router.push('/lol/match/' + match.match_id)"
      v-for="match in matches"
      :key="match.match_id"
      class="match shadow-1"
      :class="{
        win: match.data_participant.win,
        loss: !match.data_participant.win,
      }"
    >
      <img
        width="50"
        :src="rh.getChampionSquaredPortrait(match.data_participant.championId)"
        alt="summoner1"
      />
      <p>{{ rh.getQueueInfo(match.data_match.queueId)?.description }}</p>
      <p>
        {{ match.data_participant.kills }} /
        {{ match.data_participant.deaths }} /
        {{ match.data_participant.assists }}
      </p>
    </div>
    <q-pagination
      size="1rem"
      v-model="page"
      :max="20"
      input
      class="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { SummonerData } from 'src/data/interfaces/CustomInterfaces';
import type { ParticipantMatch } from 'src/data/interfaces/ParticipantMatchInterfaces';
import { useSettingsStore } from 'src/stores/settingsStore';
import { useRoute, useRouter } from 'vue-router';
import RiotHelper from 'src/plugins/RiotHelper';
import { computed, ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useSettingsStore();
const rh = RiotHelper.getInstance();

const puuid = route.params.puuid;
const page = ref(1);
const matches = ref<ParticipantMatch[]>();

const { data: summoner } = await useFetch(
  `${store.apiEndpoint}/api/v1/summoner/puuid/${puuid}`
)
  .get()
  .json<SummonerData>();

const matchesUrl = computed(() => {
  return `${store.apiEndpoint}/api/v1/match/participant/puuid/${puuid}?page=${page.value}`;
});

watch(
  matchesUrl,
  async (newUrl) => {
    const { data } = await useFetch(newUrl).get().json<ParticipantMatch[]>();
    if (data.value) {
      matches.value = data.value;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.loss {
  border-left: 5px solid $riot-red;
}

.win {
  border-left: 5px solid $riot-green;
}

.matches {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.match {
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.match p {
  margin: 0;
}

.pagination {
  margin: 2rem auto 0 auto;
}
</style>
