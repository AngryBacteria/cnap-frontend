<template>
  <h3>{{ refUser.displayName }}</h3>
  <section class="settings-grid">
    <section>
      <q-form @submit="editUser()">
        <q-input
          type="text"
          v-model="catchPhrase"
          label="catchPhrase"
          filled
          :rules="[
            (val) => !!val || 'Field is required',
            (val) =>
              val.length > 3 || 'Fields needs to be longer than 5 characters',
          ]"
          counter
          maxlength="40"
          lazy-rules
        />
        <q-input
          type="text"
          v-model="displayName"
          label="displayName"
          filled
          :rules="[
            (val) => !!val || 'Field is required',
            (val) =>
              val.length > 3 || 'Fields needs to be longer than 5 characters',
          ]"
          lazy-rules
          counter
          maxlength="20"
        />
        <q-input
          type="url"
          v-model="photoURL"
          label="photoURL"
          filled
          :rules="[
            (val) => !!val || 'Field is required',
            (val) =>
              val.length > 3 || 'Fields needs to be longer than 5 characters',
          ]"
          lazy-rules
        />
        <q-input
          type="textarea"
          v-model="about"
          label="about"
          filled
          :rules="[
            (val) => !!val || 'Field is required',
            (val) =>
              val.length > 3 || 'Fields needs to be longer than 5 characters',
          ]"
          lazy-rules
          counter
          maxlength="250"
        />
        <q-btn class="q-mt-md" color="primary" type="submit">Edit</q-btn>
      </q-form>
    </section>
    <img :src="refUser.photoURL" alt="profile picture" />
  </section>
</template>

<script setup lang="ts">
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseApp } from 'boot/firebase';
import { useSettingsStore } from 'stores/settingsStore';
import { ref } from 'vue';
import { updateProfile } from 'firebase/auth';
import { Notify } from 'quasar';

const store = useSettingsStore();
const refUser = store.refUser;

const docReference = doc(
  collection(getFirestore(firebaseApp), 'members'),
  refUser?.uid
);
const memberDoc = await getDoc(docReference);
const memberData = memberDoc.data();

const catchPhrase = ref(memberData?.catchPhrase);
const about = ref(memberData?.about);

const displayName = ref(refUser?.displayName);
const photoURL = ref(refUser?.photoURL);

async function editUser() {
  try {
    if (memberDoc && refUser) {
      await updateDoc(docReference, {
        catchPhrase: catchPhrase.value,
        about: about.value,
      });
      await updateProfile(refUser, {
        displayName: displayName.value,
        photoURL: photoURL.value,
      });

      Notify.create({
        message: 'Profile edited',
        color: 'primary',
        position: 'top',
        icon: 'mdi-check',
      });
    } else {
      Notify.create({
        message: 'Error while editing profile',
        color: 'red',
        position: 'top',
        icon: 'mdi-close-octagon-outline',
      });
    }
  } catch (e) {
    Notify.create({
      message: 'Error while editing profile',
      color: 'red',
      position: 'top',
      icon: 'mdi-close-octagon-outline',
    });
  }
}
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: 4fr minmax(150px, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
}

img {
  width: 100%;
  border-radius: 100%;
}

@media screen and (max-width: 720px) {
  .settings-grid {
    grid-template-columns: auto;
    grid-auto-flow: dense;
  }
  img {
    width: 200px;
    border-radius: 100%;
    grid-row: 1;
  }
}

.q-form > * {
  margin-top: 0.5rem;
}

.q-form {
  margin-bottom: 2rem;
}

h3 {
  margin-top: 0;
}
</style>
