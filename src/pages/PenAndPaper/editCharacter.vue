<script setup lang="ts">
import {useRoute} from 'vue-router';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {ref} from 'vue';

const route = useRoute();

const charid = route.params.charid;

const db = getFirestore(firebaseApp);

let name = ''
let framework = ''
let imageLink = ''
let file = ref(null)

const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];

// Geht trotz Error
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data()
  console.log(charData)
  name = charData.name
  framework = charData.framework
  imageLink = charData.sheet
} else {
  alert('This Character doesn\'t exist!')
}
</script>

<template>
  <div class="settings">
    <q-card class="small" flat>
      <fieldset>
        <q-form>
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
            v-model="file"
          />

          <br/>

          <q-btn type="submit" color="primary" label="Edit"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>

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
