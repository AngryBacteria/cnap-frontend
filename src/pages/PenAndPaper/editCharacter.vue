<template>
  <div class="settings">
    <q-card class="small" flat>
      <fieldset>
        <q-form @submit.prevent="editCharacter">
          <q-input
            clearable
            type="text"
            v-model="name"
            label="Name"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-select
            filled
            v-model="framework"
            label="Framework"
            :options="frameworks"
          />
          <br/>

          <q-file
            clearable
            filled
            label="Select One Image"
            v-model="image"
            accept=".jpg, image/*"
          />

          <br/>

          <q-file
            clearable
            filled
            label="Select One PDF (.pdf)"
            v-model="sheet"
            accept=".pdf"
          />

          <br/>

          <q-btn type="submit" color="primary" label="Edit"/>

        </q-form>
      </fieldset>
    </q-card>
    <q-img
      class="portrait"
      :src="imageLink"
      alt="Character Image"
      style="max-width: 500px; height: 500px;"
      :fit="'contain'"
    />
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

// General Variables
const router = useRouter();
const route = useRoute();
const charid = route.params.charid;
const db = getFirestore(firebaseApp);

// Variables used for Firestore entry
let name = ref('')
let framework = ref('')
let imageLink = ref('')
let image = ref(null)
let sheet = ref(null)
const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];

// Geht trotz Error
// Get Doc to fill the form with already existing data
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data()
  name.value = charData.name
  framework.value = charData.framework
  imageLink.value = charData.imageLink
} else {
  alert('This Character doesn\'t exist!')
}

async function editCharacter() {
  // updates values for name and framework. Files cant be changed yet
  await setDoc(doc(db, 'pnp_characters', charid), {
    name: name.value,
    framework: framework.value,
  }, {
    merge: true,
  })
  await router.push(`/pnp/${charid}`)
}
</script>

<style scoped>

fieldset {
  border: none;
  padding-top: 15px;
}

.small {
  width: 60%;
}

.portrait {
  width: 30%;
}

.settings {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
