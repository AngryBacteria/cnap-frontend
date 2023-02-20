<template>
  <q-page>
    <q-card flat>
      <div class="q-gutter-lg q-ma-lg q-pa-lg">
        <q-input type="email" v-model="email" filled >email</q-input>
        <q-input type="password" v-model="password" filled >Password</q-input>
        <q-btn @click="login" color="primary" >Login</q-btn>
        <q-btn @click="logout" color="secondary">Logout</q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>

import {signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {useFirebaseAuth} from 'vuefire';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import {Notify} from 'quasar';

const router = useRouter()

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
//Todo correct error reaction
async function login() {
  const auth = useFirebaseAuth()
  if (auth) {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      Notify.create({
        message: 'Erfolgreich eingelogged',
        color: 'primary',
        position: 'top',
        icon: 'mdi-check',
      })
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
    Notify.create({
      message: 'Erfolgreich ausgelogged',
      color: 'primary',
      position: 'top',
      icon: 'mdi-check',
    })
    await router.push('/')
  } catch (error) {
    console.log(`Error while attempting to Log-Out: ${error}`)
  }
}
</script>
<style scoped>
</style>
