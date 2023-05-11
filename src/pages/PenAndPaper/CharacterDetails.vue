<template>
  <div v-if="character.exists()">
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
      v-if="userIsCreator"
      @click="deleteCharacter()"
      style="margin-left: auto; margin-right: 1rem"
      color="red"
      label="Delete"
    />

    <a>
      Character Sheet : {{ sheetLink }}
    </a>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {doc, getDoc, getFirestore, deleteDoc} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {getCurrentUser} from 'vuefire';
import {getStorage, ref as storageRef, deleteObject} from 'firebase/storage';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {Notify} from 'quasar';

// General Variables
const router = useRouter();
const storage = getStorage();
const route = useRoute();
const charid = route.params.charid;
const currentUser = await getCurrentUser()
const currentUserID = currentUser?.uid
let userIsCreator = false;
const db = getFirestore(firebaseApp);

// Variables from Firestore entry
let name = ref('')
let framework = ref('')
let imageLink = ref('')
let sheetLink = ref('')

// Geht trotz Error
// Get Doc and values to display
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data()
  name.value = charData.name
  framework.value = charData.framework
  imageLink.value = charData.imageLink
  sheetLink.value = charData.sheetLink
  if (character.data().creatorID == '') {
    userIsCreator = true;
  } else {
    userIsCreator = (currentUserID == character.data().creatorID)
  }
} else {
  Notify.create({
    message: 'This Character doesn\'t exist',
    color: 'red',
    position: 'top',
    icon: 'mdi-close-octagon-outline',
  });
}

// deletes the Firestore entry of character. Doesn't delete files attached to it (WIP)
async function deleteCharacter() {
  await deleteDoc(doc(db, 'pnp_characters', charid));
  const desertRef = storageRef(storage, 'pnp_characters/' + name.value);
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    console.log(error)
    // Uh-oh, an error occurred!
  });
  await router.push('/pnp/characters')
}

</script>

