<template>
  <h1>match {{ route.params.id }}</h1>

  <div v-for="part in data?.info.participants" :key="part.puuid">
    {{ part.summonerName }} -- {{ part.championName }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core'
import { MatchDTO } from 'src/data/MatchInterfaces';

const route = useRoute()
const { data } = await useFetch('http://157.90.27.91:3000/api/v1/match/archive/id/EUW1_5998862548').get().json<MatchDTO>()
</script>
