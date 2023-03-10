<template>
  <div class="q-pa-md">
    <q-table
      title="Stats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header-cell="props">
        <template  v-if="props.col.label !== 'Participant'">
          <q-th :props="props">
            <q-icon :name="`img:${rh.getChampionSquaredPortrait(props.col.label)}`" size="3em" />
          </q-th>
        </template>
        <template v-else>
          <q-th>
            <q-icon name="mdi-state-machine" size="3em"/>
          </q-th>
        </template>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import {MatchDTO, Participant} from 'src/data/MatchInterfaces';
import {QTableProps} from 'quasar';
import RiotHelper from 'src/plugins/RiotHelper';

const rh = RiotHelper.getInstance()

const props = defineProps<{
  data: MatchDTO
}>()

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Participant',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: false
  }];

props.data.info.participants.forEach(participant => {
  columns.push({
    name: participant.summonerName,
    align: 'center',
    label: `${participant.championId}`,
    field: participant.summonerName
  })
})

const stats = ['kills', 'deaths', 'assists', 'doubleKills', 'firstBloodKill', 'firstTowerKill', 'goldEarned',
  'goldSpent', 'largestCriticalStrike', 'neutralMinionsKilled', 'totalDamageDealtToChampions', 'visionScore']
const rows = [
]

stats.forEach((stat) => {
  const obj: any = {}
  obj['name'] = stat;
  obj[props.data.info.participants[0].summonerName] = props.data.info.participants[0][stat as keyof Participant]
  obj[props.data.info.participants[1].summonerName] = props.data.info.participants[1][stat as keyof Participant]
  obj[props.data.info.participants[2].summonerName] = props.data.info.participants[2][stat as keyof Participant]
  obj[props.data.info.participants[3].summonerName] = props.data.info.participants[3][stat as keyof Participant]
  obj[props.data.info.participants[4].summonerName] = props.data.info.participants[4][stat as keyof Participant]
  obj[props.data.info.participants[5].summonerName] = props.data.info.participants[5][stat as keyof Participant]
  obj[props.data.info.participants[6].summonerName] = props.data.info.participants[6][stat as keyof Participant]
  obj[props.data.info.participants[7].summonerName] = props.data.info.participants[7][stat as keyof Participant]
  obj[props.data.info.participants[8].summonerName] = props.data.info.participants[8][stat as keyof Participant]
  obj[props.data.info.participants[9].summonerName] = props.data.info.participants[9][stat as keyof Participant]

  rows.push(obj)
})


</script>

<style>

</style>
