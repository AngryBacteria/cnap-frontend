<template>
  <q-page>
    <h5>Non reactive User</h5>
    <q-scroll-area style="height: 400px">
      <pre>{{ JSON.stringify(user, undefined, 4) }}</pre>
    </q-scroll-area>
    <h5>Reactive User</h5>
    <q-scroll-area style="height: 400px">
      <pre>{{ JSON.stringify(refUser, undefined, 4) }}</pre>
    </q-scroll-area>
    <h5>Firebase Auth Object</h5>
    <q-scroll-area style="height: 400px">
      <pre>{{ JSON.stringify(auth, undefined, 4) }}</pre>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import { getCurrentUser, useFirebaseAuth } from 'vuefire';
import {useSettingsStore} from 'stores/settingsStore';
const store = useSettingsStore()

//Promise for getting the current auth user$
const user = await getCurrentUser();
//FireBase auth object
const auth = useFirebaseAuth();
//Reactive user
const refUser = store.refUser
</script>
