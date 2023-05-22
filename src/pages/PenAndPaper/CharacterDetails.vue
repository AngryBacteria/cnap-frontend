<template>
  <q-card class="small" flat v-if="character.exists()">
    <fieldset>
      <h1>
        {{ name }}
        <q-badge class="badge" outline align="middle" color="primary">
          {{ charClass }}
        </q-badge>
        <q-badge
          class="badge"
          outline
          align="middle"
          color="secondary"
          style="font-size: 1rem; height: 1.25rem"
        >
          {{ framework }}
        </q-badge>
      </h1>
      <div class="charContainer">
        <div class="upperContainer">
          <div class="personalContainer">
            <q-img :src="imageLink" alt="Character Image" :fit="'contain'" />
            <a :href="sheetLink" target="_blank">
              <q-btn
                class="button"
                v-if="userIsCreator"
                color="primary"
                label="Character Sheet"
                target="_blank"
              />
            </a>
          </div>
          <div class="descriptionContainer">
            <h2>Description</h2>
            {{ description }}
          </div>
        </div>
        <div class="lowerContainer">
          <div class="backstoryContainer">
            <h2>Backstory</h2>
            {{ backstory }}
          </div>
          <div class="buttonContainer">
            <q-btn
              class="button"
              v-if="userIsCreator"
              color="primary"
              label="Edit"
              @click="router.push(`/pnp/edit/${charid}`)"
            />

            <q-btn
              class="button"
              v-if="userIsCreator"
              @click="deleteCharacter()"
              style="margin-left: auto; margin-right: 1rem"
              color="red"
              label="Delete"
            />
          </div>
        </div>
      </div>
    </fieldset>
  </q-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { doc, getDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import { firebaseApp } from 'boot/firebase';
import { getCurrentUser } from 'vuefire';
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

// General Variables
const router = useRouter();
const storage = getStorage();
const route = useRoute();
const charid = Array.isArray(route.params.charid)
  ? route.params.charid[0]
  : route.params.charid;
const currentUser = await getCurrentUser();
const currentUserID = currentUser?.uid;
let userIsCreator = false;
const db = getFirestore(firebaseApp);

// Variables from Firestore entry
const name = ref('');
const description = ref('');
const charClass = ref('');
const framework = ref('');
const sheetLink = ref('');
const imageLink = ref('');
const backstory = ref('');

// Geht trotz Error
// Get Doc and values to display
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data();
  name.value = charData.name;
  framework.value = charData.framework;
  imageLink.value = charData.imageLink;
  sheetLink.value = charData.sheetLink;
  charClass.value = charData.class;
  backstory.value = charData.backstory;
  description.value = charData.description;
  if (character.data().creatorID == '') {
    userIsCreator = true;
  } else {
    userIsCreator = currentUserID == character.data().creatorID;
  }
} else {
  Notify.create({
    message: "This Character doesn't exist",
    color: 'red',
    position: 'top',
    icon: 'mdi-close-octagon-outline',
  });
}

// deletes the Firestore entry of character. Doesn't delete files attached to it (WIP)
async function deleteCharacter() {
  await deleteDoc(doc(db, 'pnp_characters', charid));
  const imageRef = storageRef(storage, 'pnp_characters/' + charid + 'Image');
  const sheetRef = storageRef(storage, 'pnp_characters/' + charid + 'Sheet');
  deleteObject(imageRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      console.log(error);
      // Uh-oh, an error occurred!
    });

  deleteObject(sheetRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      console.log(error);
      // Uh-oh, an error occurred!
    });
  await router.push('/pnp/characters');
}
</script>

<style>
.badge {
  font-size: 1rem;
  height: 1.3rem;
  margin-right: 0.5rem;
}

h1 {
  font-size: 3rem;
  margin: 0;
  text-align: center;
}

h2 {
  margin: 0;
  font-size: 2rem;
}

fieldset {
  border: none;
  padding: 25px;
}

.personalContainer {
  display: flex;
  flex-direction: column;
  width: 33%;
}

.personalContainer button {
  width: 90%;
  margin: 5%;
}

.upperContainer {
  display: flex;
  flex-direction: row;
  text-align: center;
}

.descriptionContainer {
  width: 66%;
  text-align: center;
}

.charContainer {
  display: flex;
  flex-direction: column;
}

.backstoryContainer {
  text-align: center;
}

.buttonContainer {
  width: 30%;
  margin-right: 35%;
  margin-left: 35%;
  margin-top: 2%;
}

.buttonContainer .button {
  width: 100%;
  margin-bottom: 1%;
}

@media screen and (max-width: 720px) {
  .upperContainer {
    flex-direction: column;
  }

  .descriptionContainer {
    width: 100%;
  }

  .personalContainer {
    width: 100%;
  }
}
</style>
