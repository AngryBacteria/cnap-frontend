<template>
  {{ url }}

  <div v-for="participant in data?.info.participants" :key="participant.puuid">
    {{ participant.summonerName }} --
    {{ participant.kills }}/{{ participant.deaths }}/{{ participant.assists }} --
    {{ participant.championName }}
  </div>

  <q-card>
    <apexchart height="300" type="bar" :options="options" :series="series"></apexchart>
  </q-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core'
import { MatchDTO } from 'src/data/MatchInterfaces';
import { computed } from 'vue';
import {useQuasar} from 'quasar';
import { getCssVar } from 'quasar'

const route = useRoute()
const $q = useQuasar();

const url = computed(() => {
  const matchId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  return `http://157.90.27.91:3000/api/v1/match/archive/id/${matchId}`
})

const options = computed(() => {
  return {
    theme: {
      mode: $q.dark.mode ? 'dark' : 'light',
    },
    title: {
      text: 'ApexArea',
      align: 'left'
    },
    chart: {
      background: $q.dark.mode ? getCssVar('dark') : '#ffffff',
      height: 300,
      type: 'bar'
    },
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  }
})

const series = computed(() => {
  return [{
    name: 'series1',
    data: [31, 40, -28, -51, 42, 109, 100],
    color: ({ value }) => (value < 0) ? '#ff2576' : '#38c6f4'
  }]
})

const { data } = await useFetch(url, { refetch: true }).get().json<MatchDTO>()
</script>
