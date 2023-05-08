<script setup lang="ts">
// See https://vueuse.org/core/useFileDialog
import {useFileDialog} from '@vueuse/core';
import {ref as storageRef} from 'firebase/storage';
import {getCurrentUser, useFirebaseStorage, useStorageFile} from 'vuefire';
import {ref, watch} from 'vue';
import {firebaseApp} from 'boot/firebase';
import {getFirestore, addDoc, collection} from 'firebase/firestore';
import {useRouter} from 'vue-router';

const router = useRouter();

const currentUser = await getCurrentUser()

// upload an image to the storage
const storage = useFirebaseStorage();

let fileRef = storageRef(storage, 'pnp_characters/');

const name = ref('');
const framework = ref('');
const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];

watch(name, async (name) => {
  fileRef = storageRef(storage, 'pnp_characters/' + name);
});

const {
  uploadTask,
} = useStorageFile(fileRef);

const db = getFirestore(firebaseApp);

async function submitFile() {
  const {
    url,
    upload,
  } = useStorageFile(fileRef);

  const data = files.value?.item(0);
  if (data) {
    upload(data);
  }

  if (currentUser) {
    watch(url, async (url) => {
      const docRef = await addDoc(collection(db, 'pnp_characters'), {
        name: name.value,
        framework: framework.value,
        sheet: url,
        creatorID: currentUser?.uid
      });
      await router.push(`/pnp/${docRef.id}`)
    });
  } else {
    watch(url, async (url) => {
      const docRef = await addDoc(collection(db, 'pnp_characters'), {
        name: name.value,
        framework: framework.value,
        sheet: url,
      });
      await router.push(`/pnp/${docRef.id}`)
    });
  }

  // await router.push(`/pnp/${docRef.id}`)

}

const {files, open} = useFileDialog();
</script>

<template>
  <q-card class="small" flat>
    <q-form @submit.prevent="submitFile">
      <!-- disable the form while uploading -->
      <fieldset :disabled="!!uploadTask">
        <q-input
          clearable
          type="text"
          v-model="name"
          label="Name"
          filled
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-select filled v-model="framework" label="Framework" :options="frameworks"/>
        <!--
        <button
          type="button"
          @click="open({ accept: 'image/*', multiple: false })"
        >
          <template v-if="files?.length === 1">
            Selected file: {{ files.item(0)!.name }} (Click to select another)
          </template>
          <template v-else> Select one picture </template>
        </button>
        -->

        <br/>

        <q-file
          clearable
          filled
          @click="open({ accept: 'image/*', multiple: false })"
          label="Select One File"
        >
          <template v-if="files?.length === 1">
            {{ files.item(0)!.name }}
          </template>
        </q-file>

        <br/>

        <button class="submit">Upload</button>

      </fieldset>
    </q-form>

    <!--
    <q-img v-if="url" :src="url" />
    -->

  </q-card>
</template>
<style>

.submit {
  font-size: 1em;
  outline: none;
  border: none;
  padding: 12px;
  margin: 0 40% 0 40%;
  border-radius: 5px;
  width: 20%;
}

</style>
