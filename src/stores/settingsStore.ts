import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useCurrentUser } from 'vuefire';
import { MatchV5DTO, SummonerDTO } from 'src/data/interfaces/CustomInterfaces';

export const useSettingsStore = defineStore('settings', () => {
  const userPrefDarkMode = ref(true);
  const $q = useQuasar();
  const refUser = useCurrentUser();
  const isLoggedIn = ref(false);
  const apiEndpoint = 'https://cnapi.angrybacteria.ch';
  // const apiEndpoint = 'http://localhost:3000';

  const currentMatch = ref<MatchV5DTO | null>();
  const currentSummoner = ref<SummonerDTO | null>();

  if (localStorage.getItem('userPrefDarkMode')) {
    userPrefDarkMode.value = JSON.parse(
      <string>localStorage.getItem('userPrefDarkMode'),
    );
  }

  watch(
    userPrefDarkMode,
    (darkVal) => {
      localStorage.setItem('userPrefDarkMode', JSON.stringify(darkVal));
      $q.dark.set(darkVal);
    },
    { deep: true },
  );

  watch(
    refUser,
    (newRefUser) => {
      isLoggedIn.value = !!newRefUser;
    },
    { deep: true },
  );

  return {
    userPrefDarkMode,
    isLoggedIn,
    refUser,
    currentMatch,
    apiEndpoint,
    currentSummoner,
  };
});
