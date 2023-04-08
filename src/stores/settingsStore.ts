import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useCurrentUser } from 'vuefire';
import { MatchDTO } from 'src/data/interfaces/MatchInterfaces';

export const useSettingsStore = defineStore('settings', () => {
  const userPrefDarkMode = ref(true);
  const $q = useQuasar();
  const refUser = useCurrentUser();
  const isLoggedIn = ref(false);
  const apiEndpoint = 'https://api.cnap.ch';

  const matchData = ref<MatchDTO | null>();

  if (localStorage.getItem('userPrefDarkMode')) {
    userPrefDarkMode.value = JSON.parse(
      <string>localStorage.getItem('userPrefDarkMode')
    );
  }

  watch(
    userPrefDarkMode,
    (darkVal) => {
      localStorage.setItem('userPrefDarkMode', JSON.stringify(darkVal));
      $q.dark.set(darkVal);
    },
    { deep: true }
  );

  watch(
    refUser,
    (newRefUser) => {
      isLoggedIn.value = !!newRefUser;
    },
    { deep: true }
  );

  return { userPrefDarkMode, isLoggedIn, refUser, matchData, apiEndpoint };
});
