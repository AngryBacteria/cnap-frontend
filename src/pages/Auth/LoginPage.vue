<template>
  <q-page>
    <q-card class="small" flat>
      <q-form @submit="login()">
        <div class="q-gutter-sm q-ma-lg q-pa-lg">
          <h3>Sign-in</h3>
          <q-input
            type="email"
            v-model="email"
            label="Email-Address"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            type="password"
            v-model="password"
            label="Password"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />
          <section>
            <q-btn class="center text-black" type="submit" color="primary"
              >Login</q-btn
            >
            <router-link to="/register" class="text-primary text-weight-bold"
              >Register here</router-link
            >
          </section>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getCurrentUser, useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Notify } from 'quasar';

const router = useRouter();
const route = useRouter();

const email = ref('');
const password = ref('');

//Automatic restore from storage if present
onMounted(async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    console.log('User found in storage');
    const to =
      route.currentRoute.value.query.redirect &&
      typeof route.currentRoute.value.query.redirect === 'string'
        ? route.currentRoute.value.query.redirect
        : '/';
    Notify.create({
      message: 'Successfully logged in',
      color: 'primary',
      position: 'top',
      icon: 'mdi-check',
    });
    await router.push(to);
  }
});
//Todo correct error reaction
async function login() {
  const auth = useFirebaseAuth();
  if (auth) {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      Notify.create({
        message: 'Successfully logged in',
        color: 'primary',
        position: 'top',
        icon: 'mdi-check',
      });
      const to =
        route.currentRoute.value.query.redirect &&
        typeof route.currentRoute.value.query.redirect === 'string'
          ? route.currentRoute.value.query.redirect
          : '/';
      await router.push(to);
    } catch (error) {
      const errorCode = error.code;
      Notify.create({
        message: errorCode.split('/')[1],
        color: 'red',
        position: 'top',
        icon: 'mdi-close-octagon-outline',
      });
    }
  }
}
</script>
<style scoped>
.small {
  margin: auto;
  max-width: 1000px;
}

h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  padding-left: 1rem;
}
</style>
