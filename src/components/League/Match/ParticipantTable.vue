<template>
  <div class="q-pa-md">
    <q-table
      title="Stats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      :separator="'none'"
    >
      <template v-slot:header-cell="props">
        <template v-if="props.col.label !== 'Participant'">
          <q-th :props="props">
            <q-icon
              :name="`img:${rh.getChampionSquaredPortrait(props.col.label)}`"
              size="3em"
            >
              <q-tooltip
                :delay="350"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                {{ props.col.name }}
              </q-tooltip>
            </q-icon>
          </q-th>
        </template>
        <template v-else>
          <q-th>
            <q-icon name="mdi-state-machine" size="3em" />
          </q-th>
        </template>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { MatchDTO, Participant } from 'src/data/MatchInterfaces';
import { QTableProps } from 'quasar';
import RiotHelper from 'src/plugins/RiotHelper';

const rh = RiotHelper.getInstance();

const props = defineProps<{
  data: MatchDTO;
}>();

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: 'Participant',
    align: 'center',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
];

//Every Participant has a column
props.data.info.participants.forEach((participant) => {
  columns.push({
    name: participant.summonerName,
    align: 'center',
    label: `${participant.championId}`,
    field: participant.summonerName,
  });
});

const stats = [
  'Basic Stats',
  'kills',
  'deaths',
  'assists',
  'visionScore',
  'Gold and Farm',
  'totalMinionsKilled',
  'goldEarned',
  'goldSpent',
  'Damage Stats',
  'totalDamageDealtToChampions',
  'largestCriticalStrike',
  'totalDamageTaken',
  'Achievements',
  'firstBloodKill',
  'firstTowerKill',
  'longestTimeSpentLiving',
  'totalTimeSpentDead',
];
const rows: any[] = [];
const initialPagination = { page: 1, rowsPerPage: 25 };

stats.forEach((stat) => {
  const row: any = {};
  row['name'] = stat;
  //For every participant add the current stat
  for (let index = 0; index < props.data.info.participants.length; index++) {
    row[props.data.info.participants[index].summonerName] =
      props.data.info.participants[index][stat as keyof Participant];
  }
  rows.push(row);
});
</script>

<style></style>
