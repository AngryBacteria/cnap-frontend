<template>
  <q-img
    class="banner"
    src="https://placehold.co/1920x480"
    alt="Character Image"
  />

  <h1 class="title">
    The Boys
  </h1>

  <div v-if="coreMembers" class="coreMembers">
    <div v-for="member in coreMembers" :key="member.data">
      <router-link :to="'/' + member.data().uid">
        <q-card>

          <img
            style="
          width: 200px;
          height: 200px;
          object-fit: cover;
          padding: 10px
          "
            :src="member.data().photoURL"
            alt=""/>

          <q-card-section>
            <div class="text-h6">{{ member.data().displayName }}</div>
          </q-card-section>
        </q-card>
      </router-link>
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

.banner {

}

.title {
  font-size: 4rem;
  text-align: center;
}

a {
  text-decoration: none;
}

</style>
