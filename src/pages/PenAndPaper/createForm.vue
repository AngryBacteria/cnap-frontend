<template>
  <q-page>
    <q-card class="small" flat>
      <q-form @submit="createCharacter()">
        <div class="q-gutter-sm q-ma-lg q-pa-lg">
          <h3>Create a new Character!</h3>
          <q-input
            type="text"
            v-model="name"
            label="Name"
            filled
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-select
            v-model="framework"
            label="Framework"
            :options="frameworks"
          />
          <q-file
            outlined
            v-model="sheet">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>


          <section>
            <q-btn class="center text-black" type="submit" color="primary">
              Create!
            </q-btn>
          </section>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {collection, doc, getFirestore, getDoc, setDoc} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import {firebaseApp} from 'boot/firebase';

const name = ref('');
const framework = ref('');
const sheet = ref('');
const frameworks = ['dsa', 'dnd', 'swn']


const router = useRouter();
const route = useRouter();

const db = getFirestore(firebaseApp);
const storage = getStorage();

// Add a new document in collection "cities" with ID 'LA'

/*
async function createCharacter() {
  const filePath = 'pnp_characters' + framework.value + name.value + '.pdf';
  const sheetReference = ref(storage, filePath);


  await setDoc(doc(db, 'pnp_characters', 'LA'), {
    name: name,
    framework: framework,
    sheet: sheet
  });
}

 */


</script>

<style scoped>

</style>
