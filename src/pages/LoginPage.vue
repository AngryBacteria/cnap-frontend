<template>
  <q-page>
    <q-btn @click="login" color="primary">Login</q-btn>
    <q-btn @click="logout" color="secondary">Logout</q-btn>
  </q-page>
</template>

<script setup>

import {signInAnonymously, signOut} from 'firebase/auth';
import {getCurrentUser, useFirebaseAuth} from 'vuefire';
import {useRoute, useRouter} from 'vue-router';
import {onMounted} from 'vue';

const router = useRouter()
const route = useRoute()

//Automatic restore from storage if present
// onMounted(async () => {
//   const currentUser = await getCurrentUser()
//   if (currentUser) {
//     const to =
//       route.query.redirect && typeof route.query.redirect === 'string'
//         ? route.query.redirect
//         : '/'
//     await router.push(to)
//   }
// })

async function login() {
  const auth = useFirebaseAuth()
  if (auth){
    signInAnonymously(auth)
      .then(() => {
        console.log('signed in')
        router.push(route.query.redirect === null ? '/' : route.query.redirect)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
}
async function logout() {
  const auth = useFirebaseAuth()
  signOut(auth).then(() => {
    console.log('logged out')
  }).catch((error) => {
    console.log(error)
  });
}
</script>

<style scoped>
</style>
