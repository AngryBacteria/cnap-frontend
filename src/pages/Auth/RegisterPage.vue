<template>
  <q-page>
    <q-card class="small" flat>
      <q-form @submit="register()">
        <div class="q-gutter-sm q-ma-lg q-pa-lg">
          <h3>Register</h3>
          <q-input
            type="email"
            v-model="email"
            label="Email-Address"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            type="email"
            v-model="email2"
            label="Repeat Email-Address"
            filled
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => val === email || 'Email does not match',
            ]"
            lazy-rules
          />
          <q-input
            type="password"
            v-model="password"
            label="Password"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            type="password"
            v-model="password2"
            label="Repeat Password"
            filled
            :rules="[
              (val) => !!val || 'Field is required',
              (val) => val === password2 || 'Password does not match',
            ]"
          />
          <section>
            <p>Password strength</p>
            <q-linear-progress :value="pwStrength" rounded size="20px">
            </q-linear-progress>
          </section>
          <section>
            <q-btn class="center text-black" type="submit" color="primary"
              >Register</q-btn
            >
            <router-link to="/login" class="text-primary text-weight-bold"
              >Login here</router-link
            >
          </section>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const email = ref('');
const email2 = ref('');
const password = ref('');
const password2 = ref('');
const progress = ref(0);

const router = useRouter();
const route = useRouter();

const pwStrength = computed(() => {
  let output = 0;
  let step = 0.25;

  let specialCharacterPattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let capitalLetterPattern = /[A-Z]/;
  let lowercaseLetterPattern = /[a-z]/;

  if (password.value.length > 8) output += step;
  if (specialCharacterPattern.test(password.value)) output += step;
  if (password.value.match('\\d')) output += step;
  if (
    capitalLetterPattern.test(password.value) &&
    lowercaseLetterPattern.test(password.value)
  )
    output += step;

  return output;
});

async function register() {
  const auth = useFirebaseAuth();
  if (auth) {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      Notify.create({
        message: 'Successfully Registered',
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
    } catch (error: any) {
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
