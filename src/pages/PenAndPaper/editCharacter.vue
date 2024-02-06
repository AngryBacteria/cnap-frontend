<template>
  <div class="settings">
    <q-card class="small" flat>
      <q-form @submit.prevent="editCharacter">
        <fieldset>
          <q-input
            clearable
            type="text"
            v-model="name"
            label="Name"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />

          <q-input
            clearable
            type="text"
            v-model="charClass"
            label="Class"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />

          <q-select
            filled
            v-model="framework"
            label="Framework"
            :options="frameworks"
            :rules="[(val) => !!val || 'Field is required']"
          />

          <q-input
            clearable
            type="text"
            v-model="description"
            label="Personal Description"
            filled
            autogrow
          />

          <br />

          <q-input
            clearable
            type="text"
            v-model="backstory"
            label="Backstory"
            filled
            autogrow
          />

          <br />

          <q-file
            clearable
            filled
            label="Select One Image"
            v-model="image"
            accept=".jpg, image/*"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <br />

          <q-file
            clearable
            filled
            label="Select One PDF (.pdf)"
            v-model="sheet"
            accept=".pdf"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <br />

          <q-btn type="submit" color="primary" label="Submit" />
        </fieldset>
      </q-form>
    </q-card>
    <q-img
      class="portrait"
      :src="imageLink"
      alt="Character Image"
      style="max-width: 500px; height: 500px"
      :fit="'contain'"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseApp } from 'boot/firebase';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import { getCurrentUser, useFirebaseStorage } from 'vuefire';
import { Notify } from 'quasar';

// General Variables
const currentUser = await getCurrentUser();
const storage = useFirebaseStorage();
const router = useRouter();
const route = useRoute();
const charid = Array.isArray(route.params.charid)
  ? route.params.charid[0]
  : route.params.charid;
const db = getFirestore(firebaseApp);

// Variables for storing selected Files
const sheet = ref(null);
const image = ref(null);

// Variables used for Firestore entry
const name = ref('');
const description = ref('');
const charClass = ref('');
const framework = ref('');
const sheetLink = ref('');
const imageLink = ref('');
const backstory = ref('');
const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];

// Geht trotz Error
// Get Doc to fill the form with already existing data
const character = await getDoc(doc(db, 'pnp_characters', charid));
if (character.exists()) {
  const charData = character.data();
  name.value = charData.name;
  charClass.value = charData.class;
  framework.value = charData.framework;
  sheetLink.value = charData.sheetLink;
  imageLink.value = charData.imageLink;
  backstory.value = charData.backstory;
  description.value = charData.description;
} else {
  Notify.create({
    message: "This Character doesn't exist",
    color: 'red',
    position: 'top',
    icon: 'mdi-close-octagon-outline',
  });
}

async function editCharacter() {
  // Check if the character was created by a user or not
  if (currentUser) {
    // Create Firestore entry without file links
    await setDoc(
      doc(db, 'pnp_characters', charid),
      {
        name: name.value,
        class: charClass.value,
        framework: framework.value,
        sheetLink: sheetLink.value,
        imageLink: imageLink.value,
        creatorID: currentUser?.uid,
        backstory: backstory.value,
        description: description.value,
      },
      {
        merge: true,
      },
    );

    const data = image.value;
    const data2 = sheet.value;

    if (!data && !data2) {
      await router.push(`/pnp/${charid}`);
    }

    const fileRef = storageRef(storage, 'pnp_characters/' + charid + 'Image');
    const fileRef2 = storageRef(storage, 'pnp_characters/' + charid + 'Sheet');

    if (data) {
      uploadBytes(fileRef, data).then(() => {
        getDownloadURL(fileRef).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', charid),
            {
              imageLink: result,
            },
            {
              merge: true,
            },
          );
          if (!data2) {
            await router.push(`/pnp/${charid}`);
          }
        });
      });
    }
    if (data2) {
      uploadBytes(fileRef2, data2).then(() => {
        getDownloadURL(fileRef2).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', charid),
            {
              sheetLink: result,
            },
            {
              merge: true,
            },
          );
          await router.push(`/pnp/${charid}`);
        });
      });
    }
  } else {
    // if the character wasn't created by a user there is no creatorID saved
    await setDoc(doc(db, 'pnp_characters', charid), {
      name: name.value,
      class: charClass.value,
      framework: framework.value,
      sheetLink: sheetLink.value,
      imageLink: imageLink.value,
      backstory: backstory.value,
      description: description.value,
    });

    const data = image.value;
    const data2 = sheet.value;

    const fileRef = storageRef(storage, 'pnp_characters/' + charid + 'Image');
    const fileRef2 = storageRef(storage, 'pnp_characters/' + charid + 'Sheet');

    if (data) {
      uploadBytes(fileRef, data).then(() => {
        getDownloadURL(fileRef).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', charid),
            {
              imageLink: result,
            },
            {
              merge: true,
            },
          );
          await router.push(`/pnp/${charid}`);
        });
      });
    }
    if (data2) {
      uploadBytes(fileRef2, data2).then(() => {
        getDownloadURL(fileRef2).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', charid),
            {
              sheetLink: result,
            },
            {
              merge: true,
            },
          );
          await router.push(`/pnp/${charid}`);
        });
      });
    }
  }
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
