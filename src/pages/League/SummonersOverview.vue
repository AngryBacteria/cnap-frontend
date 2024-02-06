<template>
  <div class="search">
    <q-form @submit="searchForSummoner()" style="margin-bottom: 2rem">
      <q-input
        :loading="loadingFlag"
        type="text"
        v-model="summonerSearch"
        label="Search for a Summoner"
        filled
        :rules="[
          (val) =>
            val.length > 3 || 'Fields needs to be longer than 3 characters',
        ]"
        lazy-rules
      />
    </q-form>
  </div>

  <div v-if="summoners" class="summoners">
    <div v-for="summoner in computedSummoners" :key="summoner.id">
      <router-link :to="'/lol/summoners/' + summoner.puuid">
        <q-card>
          <img
            style="width: 200px"
            :src="rh.getProfileIcon(Number(summoner.profileIconId))"
          />
          <q-card-section>
            <div class="text-h6">{{ summoner.name }}</div>
            <div class="text-subtitle2">Level {{ summoner.summonerLevel }}</div>
          </q-card-section>
        </q-card>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { SummonerDTO } from 'src/data/interfaces/CustomInterfaces';
import RiotHelper from 'src/plugins/RiotHelper';
import { useSettingsStore } from 'src/stores/settingsStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const rh = RiotHelper.getInstance();
const store = useSettingsStore();
const router = useRouter();

const summonerSearch = ref('');
const loadingFlag = ref(false);

const { data: summoners } = await useFetch(
  `${store.apiEndpoint}/api/v1/summoner`,
)
  .get()
  .json<SummonerDTO[]>();

const computedSummoners = computed(() => {
  return summoners.value?.filter((summoner) =>
    summoner.name?.toLowerCase().includes(summonerSearch.value.toLowerCase()),
  );
});

async function searchForSummoner() {
  if (summonerSearch.value.length > 3 && computedSummoners.value) {
    const summoner = computedSummoners.value[0];
    if (summoner?.puuid) {
      store.currentSummoner = summoner;
      router.push(`/lol/summoners/${summoner?.puuid}`);
    }
  }
}
</script>

<style scoped>
.summoners {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
