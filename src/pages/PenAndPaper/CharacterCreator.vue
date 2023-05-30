<template>
  <q-card class="small" flat>
    <h1>
      Character Creator
    </h1>
    <q-form @submit.prevent="submitCharacter" @reset="onReset">
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
          type="textarea"
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
        <q-btn
          type="reset"
          color="primary"
          label="Reset"
          flat
          class="q-ml-sm"
        />
      </fieldset>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { getCurrentUser, useFirebaseStorage } from 'vuefire';
import { ref } from 'vue';
import { firebaseApp } from 'boot/firebase';
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useRouter } from 'vue-router';

// General Variables
const router = useRouter();
const currentUser = await getCurrentUser();
const storage = useFirebaseStorage();
const db = getFirestore(firebaseApp);

// Variables for storing selected Files
const sheet = ref(null);
const image = ref(null);

// Variables for Firestore entry
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

async function submitCharacter() {
  // Check if the character was created by a user or not
  if (currentUser) {
    // Create Firestore entry without file links
    const docRef = await addDoc(collection(db, 'pnp_characters'), {
      name: name.value,
      class: charClass.value,
      framework: framework.value,
      sheetLink: sheetLink.value,
      imageLink: imageLink.value,
      creatorID: currentUser?.uid,
      backstory: backstory.value,
      description: description.value,
    });

    const data = image.value;
    const data2 = sheet.value;

    if (!data && !data2) {
      await router.push(`/pnp/${docRef.id}`);
    }

    const fileRef = storageRef(
      storage,
      'pnp_characters/' + docRef.id + 'Image'
    );
    const fileRef2 = storageRef(
      storage,
      'pnp_characters/' + docRef.id + 'Sheet'
    );

    if (data) {
      uploadBytes(fileRef, data).then(() => {
        getDownloadURL(fileRef).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', docRef.id),
            {
              imageLink: result,
            },
            {
              merge: true,
            }
          );
          if (!data2) {
            await router.push(`/pnp/${docRef.id}`);
          }
        });
      });
    }
    if (data2) {
      uploadBytes(fileRef2, data2).then(() => {
        getDownloadURL(fileRef2).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', docRef.id),
            {
              sheetLink: result,
            },
            {
              merge: true,
            }
          );
          await router.push(`/pnp/${docRef.id}`);
        });
      });
    }
  } else {
    // if the character wasn't created by a user there is no creatorID saved
    const docRef = await addDoc(collection(db, 'pnp_characters'), {
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

    const fileRef = storageRef(
      storage,
      'pnp_characters/' + docRef.id + 'Image'
    );
    const fileRef2 = storageRef(
      storage,
      'pnp_characters/' + docRef.id + 'Sheet'
    );

    if (data) {
      uploadBytes(fileRef, data).then(() => {
        getDownloadURL(fileRef).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', docRef.id),
            {
              imageLink: result,
            },
            {
              merge: true,
            }
          );
          await router.push(`/pnp/${docRef.id}`);
        });
      });
    }
    if (data2) {
      uploadBytes(fileRef2, data2).then(() => {
        getDownloadURL(fileRef2).then(async function (result) {
          await setDoc(
            doc(db, 'pnp_characters', docRef.id),
            {
              sheetLink: result,
            },
            {
              merge: true,
            }
          );
          await router.push(`/pnp/${docRef.id}`);
        });
      });
    }
  }
}

// clear the form
function onReset() {
  name.value = '';
  charClass.value = '';
  framework.value = '';
  backstory.value = '';
  description.value = '';
  image.value = null;
  sheet.value = null;
}
</script>

<style>
fieldset {
  border: none;
  padding: 25px;
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: -2rem;
}
</style>
