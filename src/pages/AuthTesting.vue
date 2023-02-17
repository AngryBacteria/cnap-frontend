<template>
  <q-page>
    <p>{{JSON.stringify(user)}}</p>
    <p>{{JSON.stringify(auth)}}</p>
    <p>{{JSON.stringify(user2)}}</p>
  </q-page>
</template>

<script setup lang="ts">
import {getCurrentUser, useCurrentUser, useFirebaseAuth} from 'vuefire';

const user = await getCurrentUser()
const auth = useFirebaseAuth()
const user2 = useCurrentUser()
</script>
