<template>
  <div v-if="store.matchData">
    <div v-for="pair in pairs" :key="pair.key">
      <div v-if="pair.team1 && pair.team2" class="participant_summary">
        <div class="participant_info_left">
          <div class="participant_summonerIcons">
            <img
              :width="smallIcons"
              :src="rh.getItemPlaceholder()"
              alt="item1"
            />
            <img
              :width="smallIcons"
              :src="rh.getItemPlaceholder()"
              alt="item1"
            />
          </div>
          <img
            :width="bigIcons"
            :src="rh.getChampionSquaredPortrait(pair.team1.championId)"
            :alt="pair.team1.summonerName"
          />
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
          <p>{{ formatNumber(pair.team1.goldEarned) }} Gold</p>
          <p>{{ pair.team1.totalMinionsKilled }} CS</p>
        </div>

        <div class="position">
          <img
            width="50"
            src="https://cdn.mobalytics.gg/assets/common/icons/lol-roles/24-top-faded.svg"
            alt="item1"
          />
        </div>

        <div class="statGroup">
          <p>{{ formatNumber(pair.team2.goldEarned) }} Gold</p>
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
          <img
            :width="bigIcons"
            :src="rh.getChampionSquaredPortrait(pair.team2.championId)"
            :alt="pair.team2.summonerName"
          />
          <div class="participant_summonerIcons">
            <img
              :width="smallIcons"
              :src="rh.getItemPlaceholder()"
              alt="item1"
            />
            <img
              :width="smallIcons"
              :src="rh.getItemPlaceholder()"
              alt="item1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RiotHelper from 'src/plugins/RiotHelper';
import { Participant } from 'src/data/MatchInterfaces';
import { computed } from 'vue';
import { useSettingsStore } from 'stores/settingsStore';

interface Pair {
  key: string;
  team1: Participant | undefined;
  team2: Participant | undefined;
}

const rh = RiotHelper.getInstance();
const store = useSettingsStore();

const smallIcons = '25';
const bigIcons = '50';

//Build position Pairs
const positions = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];

const pairs = computed(() => {
  if (store.matchData) {
    const team1 = store.matchData.info.participants.slice(0, 5);
    const team2 = store.matchData.info.participants.slice(5);

    const output: Pair[] = [];
    positions.forEach((position) => {
      output.push({
        key: position,
        team1: team1.find(
          (participant) => participant.teamPosition === position
        ),
        team2: team2.find(
          (participant) => participant.teamPosition === position
        ),
      });
    });
    return output;
  }
  return undefined;
});

function formatNumber(input: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumSignificantDigits: 3,
  }).format(input);
}
</script>

<style scoped>
p {
  margin: 0;
  overflow-wrap: anywhere;
}

.participant_summary {
  padding: 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: minmax(150px, 1fr) minmax(75px, auto) minmax(
      100px,
      1fr
    ) minmax(100px, 1fr) minmax(50px, auto) minmax(100px, 1fr) minmax(
      100px,
      1fr
    ) minmax(75px, auto) minmax(150px, 1fr);
  gap: 1rem;
}

.participant_info_right {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  text-align: right;
}

.participant_info_left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  text-align: left;
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