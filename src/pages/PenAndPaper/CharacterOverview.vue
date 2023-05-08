<script setup lang="ts">
import {getFirestore} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {computed, ref} from 'vue';

const db = getFirestore(firebaseApp);

let q = collection(db, 'pnp_characters');

const characterCollection = await getDocs(q);


const characterSearch = ref('');

const characters = computed(() => {
  return characterCollection.docs.filter((character) =>
    character.data().name
      ?.toLowerCase()
      .includes(characterSearch.value.toLowerCase())
  )
});

const loadingFlag = ref(false);

async function searchForCharacters() {
  console.log('ok')

}

</script>

<template>

  <div class="search">
    <q-form @submit="searchForCharacters()" style="margin-bottom: 2rem">
      <q-input
        :loading="loadingFlag"
        type="text"
        v-model="characterSearch"
        label="Search for a Character"
        filled
        lazy-rules
      />
    </q-form>
  </div>

  <div v-if="characters" class="characters">
    <div v-for="character in characters" :key="character.id">
      <router-link :to="'/pnp/' + character.id">
        <q-card>
          <img
            style="width: 200px; height: 200px; object-fit: cover;"
            :src="character.data().sheet"
            alt=""/>
          <q-card-section>
            <div class="text-h6">{{ character.data().name }}</div>
            <div class="text-subtitle2">
              {{ character.data().framework }}
            </div>
          </q-card-section>
        </q-card>
      </router-link>
    </div>
  </div>
</template>

<style>
.characters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

a {
  text-decoration: none;
}
</style>
