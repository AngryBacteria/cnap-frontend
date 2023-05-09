<script setup lang="ts">
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
let fileRef2 = storageRef(storage, 'pnp_characters/');

let sheet = ref(null)
let image = ref(null)
let name = ref('');
let framework = ref('');
const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];

watch(name, async (name) => {
  fileRef = storageRef(storage, 'pnp_characters/' + name + 'Image');
  fileRef2 = storageRef(storage, 'pnp_characters/' + name + 'Sheet');
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

  const data = image.value;
  const data2 = sheet.value;
  if (data2) {
    upload(data2);
  }
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
}

function onReset () {
  name.value = ''
  framework.value = ''
  image.value = null
  sheet.value = null
}

</script>

<template>
  <q-card class="small" flat>
    <q-form @submit.prevent="submitFile" @reset="onReset">
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

        <q-btn type="submit" color="primary" label="Submit" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />

      </fieldset>
    </q-form>
  </q-card>
</template>
<style>

fieldset {
  border: none;
  padding-top: 15px;
}
</style>
