<template>
  <q-card>
    <apexchart height="300" type="bar" :options="options" :series="series"></apexchart>
  </q-card>
</template>

<script setup>

import {computed} from 'vue';
import {getCssVar} from 'quasar';

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

</script>

<style scoped>

</style>
