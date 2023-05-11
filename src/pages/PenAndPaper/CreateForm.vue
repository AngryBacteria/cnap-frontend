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
        />

        <br/>

        <q-input
          clearable
          type="text"
          v-model="backstory"
          label="Backstory"
          filled
          autogrow
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

        <q-btn type="submit" color="primary" label="Submit"/>
        <q-btn type="reset" color="primary" label="Reset" flat class="q-ml-sm"/>

      </fieldset>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getCurrentUser, useFirebaseStorage, useStorageFile} from 'vuefire';
import {ref, watch} from 'vue';
import {firebaseApp} from 'boot/firebase';
import {getFirestore, addDoc, collection} from 'firebase/firestore';
import {useRouter} from 'vue-router';

// General Variables
const router = useRouter();
const currentUser = await getCurrentUser()
const storage = useFirebaseStorage();
const db = getFirestore(firebaseApp);

// File References for to be uploaded files
let fileRef = storageRef(storage, 'pnp_characters/');
let fileRef2 = storageRef(storage, 'pnp_characters/');
const {uploadTask} = useStorageFile(fileRef);

// Variables for storing selected Files
let sheet = ref(null)
let image = ref(null)

// Variables for Firestore entry
let name = ref('');
let charClass = ref('');
let framework = ref('');
let sheetLink = ref('');
let backstory = ref('')
const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];

// update fileRefs to match the name of the character
watch(name, async (name) => {
  fileRef = storageRef(storage, 'pnp_characters/' + name + 'Image');
  fileRef2 = storageRef(storage, 'pnp_characters/' + name + 'Sheet');
});

async function submitFile() {
  const {
    url,
    upload,
  } = useStorageFile(fileRef);

  const data = image.value;
  const data2 = sheet.value;

  if (data2) {
    uploadBytes(fileRef2, data2).then(() => {
      getDownloadURL(fileRef2).then(function (result) {
        sheetLink.value = result;
      });
    });
  }
  // Still needed because of watcher on url. in Progress to get removed
  if (data) {
    upload(data);
  }

  /*

  if (data) {
    uploadBytes(fileRef2, data).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

   */

  // Check if the character was created by a user or not
  if (currentUser) {
    // watch for the url to change to indicate the finished upload
    watch(url, async (url) => {
      // add a doc to Firestore with all the available info
      const docRef = await addDoc(collection(db, 'pnp_characters'), {
        name: name.value,
        class: charClass.value,
        framework: framework.value,
        sheetLink: sheetLink.value,
        imageLink: url,
        creatorID: currentUser?.uid,
        backstory: backstory.value,
      });
      await router.push(`/pnp/${docRef.id}`)
    });
  } else {
    // if the character wasn't created by a user there is no creatorID saved
    watch(url, async (url) => {
      const docRef = await addDoc(collection(db, 'pnp_characters'), {
        name: name.value,
        class: charClass.value,
        framework: framework.value,
        sheetLink: sheetLink.value,
        imageLink: url,
        backstory: backstory.value,
      });
      await router.push(`/pnp/${docRef.id}`)
    });
  }
}

// clear the form
function onReset() {
  name.value = ''
  charClass.value = ''
  framework.value = ''
  backstory.value = ''
  image.value = null
  sheet.value = null
}

</script>

<style>

fieldset {
  border: none;
  padding-top: 15px;
}
</style>
