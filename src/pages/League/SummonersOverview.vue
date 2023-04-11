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

  <div v-if="data" class="summoners">
    <div v-for="summoner in computedSummoners" :key="summoner.id">
      <router-link :to="'/lol/summoners/' + summoner.data.puuid">
        <q-card>
          <img
            style="width: 200px"
            :src="rh.getProfileIcon(Number(summoner.data.profileIconId))"
          />
          <q-card-section>
            <div class="text-h6">{{ summoner.data.name }}</div>
            <div class="text-subtitle2">
              Level {{ summoner.data.summonerLevel }}
            </div>
          </q-card-section>
        </q-card>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { Notify } from 'quasar';
import { SummonerDB, SummonerData } from 'src/data/interfaces/CustomInterfaces';
import RiotHelper from 'src/plugins/RiotHelper';
import { useSettingsStore } from 'src/stores/settingsStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const rh = RiotHelper.getInstance();
const store = useSettingsStore();
const router = useRouter();

const summonerSearch = ref('');
const loadingFlag = ref(false);

const { data } = await useFetch(`${store.apiEndpoint}/api/v1/summoner`)
  .get()
  .json<SummonerDB[]>();

const computedSummoners = computed(() => {
  return data.value?.filter((summoner) =>
    summoner.data.name
      ?.toLowerCase()
      .includes(summonerSearch.value.toLowerCase())
  );
});

async function searchForSummoner() {
  if (summonerSearch.value.length > 3) {
    const { data, error } = await useFetch(
      `${store.apiEndpoint}/api/v1/summoner/name/${summonerSearch.value}`
    )
      .get()
      .json<SummonerData>();
    if (data) {
      router.push(`/lol/summoners/${data.value?.puuid}`);
    }
    if (error.value) {
      console.log(error.value);
      Notify.create({
        message: 'No Summoner available with that name',
        color: 'red',
        position: 'top',
        icon: 'mdi-close-octagon-outline',
      });
    }
  }
}
</script>

<style>
.summoners {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

a {
  text-decoration: none;
}
</style>
