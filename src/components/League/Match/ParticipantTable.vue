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
import { Participant } from 'src/data/interfaces/MatchInterfaces';
import { QTableProps } from 'quasar';
import RiotHelper from 'src/plugins/RiotHelper';
import { useSettingsStore } from 'stores/settingsStore';
import { computed } from 'vue';

const rh = RiotHelper.getInstance();
const store = useSettingsStore();
const initialPagination = { page: 1, rowsPerPage: 25 };

const columns = computed(() => {
  if (!store.matchData) {
    return undefined;
  }

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
  store.matchData.info.participants.forEach((participant) => {
    columns.push({
      name: participant.summonerName,
      align: 'center',
      label: `${participant.championId}`,
      field: participant.summonerName,
    });
  });
  return columns;
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

const rows = computed(() => {
  const output: any[] = [];

  stats.forEach((stat) => {
    if (store.matchData) {
      const row: any = {};
      row['name'] = stat;
      //For every participant add the current stat
      for (
        let index = 0;
        index < store.matchData.info.participants.length;
        index++
      ) {
        row[store.matchData.info.participants[index].summonerName] =
          store.matchData.info.participants[index][stat as keyof Participant];
      }
      output.push(row);
    }
  });
  return output;
});
</script>

<style></style>
