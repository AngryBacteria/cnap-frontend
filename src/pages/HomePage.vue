<template>
  <h1>Home</h1>

  <div v-if="coreMembers" class="coreMembers">
    <div v-for="member in coreMembers" :key="member.data">
      <q-card>

        <!--          <img-->
        <!--            style="width: 200px; height: 200px; object-fit: cover;"-->
        <!--            :src="member.data().sheet"-->
        <!--            alt=""/>-->

        <q-card-section>
          <div class="text-h6">{{ member.data().catchPhrase }}</div>
          <div class="text-subtitle2">
            {{ member.data().about }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import {firebaseApp} from 'boot/firebase';
import {computed} from 'vue';

const db = getFirestore(firebaseApp);

let q = collection(db, 'members');

const memberCollection = await getDocs(q);

const coreMembers = computed(() => {
  return memberCollection.docs.filter((member) =>
    member.data().coreMember
  )
});
</script>

<style scoped>

.coreMembers {
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
