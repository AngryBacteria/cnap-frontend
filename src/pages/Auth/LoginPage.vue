<template>
  <q-page>
    <div class="q-gutter-lg">
      <q-input type="email" v-model="email" filled >email</q-input>
      <q-input type="password" v-model="password" filled >Passwort</q-input>
      <q-btn @click="loginAnon" color="primary">Login Anon</q-btn>
      <q-btn @click="loginEmailPw" color="primary" >Login Email/Passwort</q-btn>
      <q-btn @click="logout" color="secondary">Logout</q-btn>
    </div>
  </q-page>
</template>

<script setup>

import {signInAnonymously, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {useFirebaseAuth} from 'vuefire';
import {useRoute, useRouter} from 'vue-router';
import {ref} from 'vue';

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

//Automatic restore from storage if present
// onMounted(async () => {
//   const currentUser = await getCurrentUser()
//   if (currentUser) {
//     console.log('User found in storage')
//     const to =
//       route.query.redirect && typeof route.query.redirect === 'string'
//         ? route.query.redirect
//         : '/'
//     await router.push(to)
//   }
// })

async function loginAnon() {
  const auth = useFirebaseAuth()
  if (auth){
    try {
      await signInAnonymously(auth);
      console.log('signed in')
      await router.push(route.query.redirect === null ? '/' : route.query.redirect)
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode} Error while attempting to Log-in: ${errorMessage}`)
    }
  }
}
async function loginEmailPw() {
  const auth = useFirebaseAuth()
  if (auth) {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode} Error while attempting to Log-in: ${errorMessage}`)
    }
  }
}
async function logout() {
  try {
    const auth = useFirebaseAuth()
    await signOut(auth);
    console.log('logged out')
  } catch (error) {
    console.log(`Error while attempting to Log-Out: ${error}`)
  }
}
</script>

<style scoped>
</style>
