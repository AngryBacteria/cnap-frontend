<template>
  <q-page>
    <h1>Some title right now</h1>

    <div v-if="!matches">
      <q-spinner size="lg" v-if="!matches"></q-spinner>
    </div>

    <div v-for="match in matches" :key="match.id">
      {{match.queueId}} | {{match.championName}} ({{match.kills}} / {{match.deaths}} / {{match.assists}})
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {supabase} from 'boot/supabase';
import {onMounted, ref} from 'vue';

const matches = ref()

onMounted(() => {
  loadData()
})

async function loadData(){
  const { data } = await supabase
    .from('matchV5')
    .select(`
    id,
    data_match->queueId,
    data_participant->championName,
    data_participant->kills,
    data_participant->deaths,
    data_participant->assists
    `,)
    .eq('data_participant->>summonerName', 'AngryBacteria')
    .order('data_match->>gameCreation', { ascending: false })
    .limit(100)
  matches.value = data
  console.log(data)
}


</script>
