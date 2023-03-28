<template>
  <div v-if="props.data">
    <div v-for="pair in pairs" :key="pair.key">
      <div v-if="pair.team1 && pair.team2" class="participant_summary">

        <div class="participant_info_left">
          <div class="participant_summonerIcons">
            <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
            <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          </div>
          <img :width="bigIcons" :src="rh.getChampionSquaredPortrait(pair.team1.championId)"
            :alt="pair.team1.summonerName" />
          <p>{{ pair.team1.summonerName }}</p>
        </div>

        <div class="items">
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
        </div>

        <div class="statGroup">
          <p>
            {{ pair.team1.kills }} / {{ pair.team1.deaths }} /
            {{ pair.team1.assists }}
          </p>
          <p>
            {{
              Math.round(
                ((pair.team1.kills + pair.team1.assists) / pair.team1.deaths) *
                10
              ) / 10
            }}
            KDA
          </p>
        </div>

        <div class="statGroup">
          <p>{{ pair.team1.goldEarned }} Gold</p>
          <p>{{ pair.team1.totalMinionsKilled }} CS</p>
        </div>

        <div class="position">
          <img width="50" src="https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg" alt="item1" />
        </div>

        <div class="statGroup">
          <p>{{ pair.team2.goldEarned }} Gold</p>
          <p>{{ pair.team2.totalMinionsKilled }} CS</p>
        </div>

        <div class="statGroup">
          <p>
            {{ pair.team2.kills }} / {{ pair.team2.deaths }} /
            {{ pair.team2.assists }}
          </p>
          <p>
            {{
              Math.round(
                ((pair.team2.kills + pair.team2.assists) / pair.team2.deaths) *
                10
              ) / 10
            }}
            KDA
          </p>
        </div>

        <div class="items">
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
        </div>

        <div class="participant_info_right">
          <p>{{ pair.team2.summonerName }}</p>
          <img :width="bigIcons" :src="rh.getChampionSquaredPortrait(pair.team2.championId)"
            :alt="pair.team2.summonerName" />
          <div class="participant_summonerIcons">
            <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
            <img :width="smallIcons" :src="rh.getItemPlaceholder()" alt="item1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RiotHelper from 'src/plugins/RiotHelper';
import { MatchDTO, Participant } from 'src/data/MatchInterfaces';

const props = defineProps<{
  data: MatchDTO;
}>();

interface Pair {
  key: string;
  team1: Participant | undefined;
  team2: Participant | undefined;
}

const rh = RiotHelper.getInstance();

const smallIcons = '25'
const bigIcons = '50'

//Build position Pairs
const positions = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];

const team1 = props.data.info.participants.slice(0, 5);
const team2 = props.data.info.participants.slice(5);
const pairs: Pair[] = [];
positions.forEach((position) => {
  pairs.push({
    key: position,
    team1: team1.find((participant) => participant.teamPosition === position),
    team2: team2.find((participant) => participant.teamPosition === position),
  });
});
</script>

<style scoped>
.participant_summary {
  padding: 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: minmax(150px, 1fr) minmax(75px, auto) minmax(100px, 1fr) minmax(100px, 1fr) minmax(50px, auto) minmax(100px, 1fr) minmax(100px, 1fr) minmax(75px, auto) minmax(150px, 1fr);
}

.participant_info_right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
}

.participant_info_left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

p {
  margin: 0;
}

.participant_summonerIcons {
  display: flex;
  flex-direction: column;
}

.statGroup {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.position {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  padding-left: 1rem;
}

.items {
  display: grid;
  grid-template-columns: repeat(3, 25px);
  grid-gap: 1px;
}
</style>
