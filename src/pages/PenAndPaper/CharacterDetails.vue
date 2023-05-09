<template>
  <div>
    <h3>
      {{ name }}
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
    <q-btn
      v-if="userIsCreator"
      color="primary"
      label="Edit"
      @click="$router.push(`/pnp/edit/${charid}`)"
    />
    <q-btn
      @click="deleteCharacter()"
      style="margin-left: auto; margin-right: 1rem"
      color="red"
      label="Delete"
    />
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {doc, getDoc, getFirestore, deleteDoc} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {getCurrentUser} from 'vuefire';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';

const storage = getStorage();


const route = useRoute();

const charid = route.params.charid;

const currentUser = await getCurrentUser()
const currentUserID = currentUser?.uid
let userIsCreator = false;

const db = getFirestore(firebaseApp);

let name = ''
let framework = ''
let imageLink = ''

// Geht trotz Error
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data()
  name = charData.name
  framework = charData.framework
  imageLink = charData.sheet
  if(character.data().creatorID == ''){
    userIsCreator = true;
  } else {
    userIsCreator = (currentUserID == character.data().creatorID)
  }

} else {
  alert('This Character doesn\'t exist!')
}

async function deleteCharacter(){
  await deleteDoc(doc(db, 'pnp_characters', charid));
  const desertRef = storageRef(storage, 'pnp_characters/' + name);
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    alert(error)
    // Uh-oh, an error occurred!
  });
}


</script>

