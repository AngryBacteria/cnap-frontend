import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

export const useSettingsStore = defineStore('settings', () => {
  const userPrefDarkMode = ref(true)
  const $q = useQuasar();

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

  return { userPrefDarkMode }
})

