<template>
  <div v-if="!store.currentSummoner">No Summoner data</div>
  <div v-if="store.currentSummoner">
    <h3 style="margin-top: 0">{{ store.currentSummoner.name }}</h3>
  </div>
  <div v-if="matches" class="matches">
    <div
      @click="router.push('/lol/match/' + match.metadata.matchId)"
      v-for="match in matches"
      :key="match.metadata.matchId"
      class="match surface shadow-1"
      :class="{
        win: match.info.participants[0].win,
        loss: !match.info.participants[0].win,
      }"
    >
      <img
        width="50"
        :src="
          rh.getChampionSquaredPortrait(match.info.participants[0].championId)
        "
        alt="summoner1"
      />
      <p>{{ rh.getQueueInfo(match.info.queueId)?.description }}</p>
      <p>
        {{ match.info.participants[0].kills }} /
        {{ match.info.participants[0].deaths }} /
        {{ match.info.participants[0].assists }}
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
import { useSettingsStore } from 'src/stores/settingsStore';
import { useRoute, useRouter } from 'vue-router';
import RiotHelper from 'src/plugins/RiotHelper';
import { computed, ref, watch } from 'vue';
import { MatchV5DTO, SummonerDTO } from 'src/data/interfaces/CustomInterfaces';

const route = useRoute();
const router = useRouter();
const store = useSettingsStore();
const rh = RiotHelper.getInstance();

const puuid = route.params.puuid;
const page = ref(1);
const matches = ref<MatchV5DTO[]>();

if (!store.currentSummoner || store.currentSummoner.puuid !== puuid) {
  const { data: summoner } = await useFetch(
    `${store.apiEndpoint}/api/v1/summoner/puuid/${puuid}`,
  )
    .get()
    .json<SummonerDTO>();
  store.currentSummoner = summoner.value;
}

const matchesUrl = computed(() => {
  return `${store.apiEndpoint}/api/v1/match/archive/puuid/${puuid}?page=${page.value}`;
});

watch(
  matchesUrl,
  async (newUrl) => {
    const { data } = await useFetch(newUrl).get().json<MatchV5DTO[]>();
    if (data.value) {
      matches.value = data.value;
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
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
