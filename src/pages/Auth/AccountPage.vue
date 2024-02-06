<template>
  <q-card class="small" flat>
    <h1>
      {{ displayName }}
      <q-badge
        v-if="coreMember"
        class="badge"
        outline
        align="middle"
        color="primary"
      >
        core
      </q-badge>
    </h1>
    <div class="charContainer">
      <div class="upperContainer">
        <div class="personalContainer">
          <q-img :src="photoURL" alt="Profile Picture" :fit="'contain'" />
          <q-btn
            class="button"
            v-if="userIsUser"
            color="primary"
            label="Edit"
            :to="'/Account'"
          />
        </div>
        <div class="descriptionContainer">
          <h2>Catchphrase</h2>
          {{ catchPhrase }}
          <br />
          <h2>About</h2>
          {{ about }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from 'boot/firebase';
import { ref } from 'vue';
import { getCurrentUser } from 'vuefire';

// General Variables
const route = useRoute();
const uid = route.params.uid;
const db = getFirestore(firebaseApp);
const currentUser = await getCurrentUser();
const currentUserID = currentUser?.uid;
let userIsUser = ref(false);

// Variables from Firestore
let displayName = ref('');
let photoURL = ref('');
let catchPhrase = ref('');
let about = ref('');
let coreMember = ref(false);

const user = await getDoc(doc(db, 'members', uid));

if (user.exists()) {
  const charData = user.data();
  displayName.value = charData.displayName;
  photoURL.value = charData.photoURL;
  catchPhrase.value = charData.catchPhrase;
  about.value = charData.about;
  coreMember.value = charData.coreMember;
  userIsUser.value = currentUserID == user.data().uid;
}
</script>

<style scoped>
.small {
  padding: 2%;
}

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
