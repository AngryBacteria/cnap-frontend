import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import {useCurrentUser} from 'vuefire';

export const useSettingsStore = defineStore('settings', () => {
  const userPrefDarkMode = ref(true)
  const $q = useQuasar();
  const refUser = useCurrentUser();
  const isLoggedIn = ref(false)

  if (localStorage.getItem('userPrefDarkMode')){
    userPrefDarkMode.value = JSON.parse(<string>localStorage.getItem('userPrefDarkMode'));
  }

  watch(
    userPrefDarkMode, (darkVal) => {
      localStorage.setItem('userPrefDarkMode', JSON.stringify(darkVal))
      $q.dark.set(darkVal)

    },
    {deep: true}
  );

  watch(
    refUser, (newRefUser) => {
      isLoggedIn.value = !!newRefUser;
    },
    {deep: true}
  );

  return { userPrefDarkMode, isLoggedIn, refUser }
})

