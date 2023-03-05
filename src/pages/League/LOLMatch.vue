<template>
  {{ url }}

  <div v-for="participant in data?.info.participants" :key="participant.puuid">
    {{ participant.summonerName }} --
    {{ participant.kills }}/{{ participant.deaths }}/{{ participant.assists }} --
    {{ participant.championName }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core'
import { MatchDTO } from 'src/data/MatchInterfaces';
import { computed } from 'vue';

const route = useRoute()

const url = computed(() => {
  const matchId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  return `http://157.90.27.91:3000/api/v1/match/archive/id/${matchId}`
})

const { data } = await useFetch(url, { refetch: true }).get().json<MatchDTO>()
</script>
