<template>
  <div>
    <h3>
      {{ charName }}
    </h3>
    <h4>
      {{ framework }}
    </h4>
    <q-img
      :src="imageLink"
      alt="Character Image"
      style="max-width: 500px; height: 500px;"
      :fit="'contain'"
    />
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';

const route = useRoute();

const charid = route.params.charid;

const db = getFirestore(firebaseApp);

let charName = ''
let framework = ''
let imageLink = ''

// Geht trotz Error
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data()
  console.log(charData)
  charName = charData.name
  framework = charData.framework
  imageLink = charData.sheet
} else {
  alert('This Character doesn\'t exist!')
}
</script>

