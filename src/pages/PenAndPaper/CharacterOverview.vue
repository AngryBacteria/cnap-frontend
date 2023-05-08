<script setup lang="ts">
import {getFirestore} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {collection, getDocs} from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const q = collection(db, 'pnp_characters');

const characterCollection = await getDocs(q);

const characters = characterCollection.docs;

</script>

<template>
  <div v-if="characters" class="characters">
    <div v-for="character in characters" :key="character.id">
      <router-link :to="'/pnp/' + character.id">
        <q-card>
          <img
            style="width: 200px"
            :src="character.data().sheet"
            alt=""/>
          <q-card-section>
            <div class="text-h6">{{ character.data().name }}</div>
          </q-card-section>
        </q-card>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
