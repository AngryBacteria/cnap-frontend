<template>
  <div v-if="data">
    <div v-for="summoner in data" :key="summoner.id">
      {{ summoner.data.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { SummonerDB } from 'src/data/CustomInterfaces';

const { data } = await useFetch('http://157.90.27.91:3000/api/v1/summoner')
  .get()
  .json<SummonerDB[]>();
console.log(data);
</script>

<style></style>
