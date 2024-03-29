<template>
  <div v-if="user && memberData">
    <h3>
      {{ user.displayName }}
      <q-badge
        v-if="memberData?.coreMember"
        outline
        align="middle"
        color="primary"
      >
        Core
      </q-badge>
    </h3>
    <h5 style="margin-top: 0; margin-bottom: 0">General Info</h5>
    <section class="settings-grid">
      <section>
        <q-form @submit="editUser()">
          <q-input
            type="text"
            v-model="memberData.catchPhrase"
            label="catchPhrase"
            filled
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                val.length > 3 || 'Fields needs to be longer than 5 characters',
            ]"
            counter
            maxlength="40"
            lazy-rules
          />
          <q-input
            type="text"
            v-model="memberData.displayName"
            label="displayName"
            filled
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                val.length > 3 || 'Fields needs to be longer than 5 characters',
            ]"
            lazy-rules
            counter
            maxlength="20"
          />
          <q-input
            type="url"
            v-model="memberData.photoURL"
            label="photoURL"
            filled
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                val.length > 3 || 'Fields needs to be longer than 5 characters',
            ]"
            lazy-rules
          />
          <q-input
            type="textarea"
            v-model="memberData.about"
            label="about"
            filled
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                val.length > 3 || 'Fields needs to be longer than 5 characters',
            ]"
            lazy-rules
            counter
            maxlength="250"
          />
          <q-btn
            class="q-mt-md"
            color="primary"
            type="submit"
            :loading="loadingFlag"
          >
            Update Profile
          </q-btn>
          <q-btn
            class="button"
            color="primary"
            label="Back To Account"
            :to="'/' + user.uid"
            flat
          />
        </q-form>
      </section>
      <img v-if="user.photoURL" :src="user.photoURL" alt="profile picture" />
      <img
        v-else
        src="https://i0.wp.com/ch-electrical.co.uk/wp-content/uploads/2022/04/6.-Man.png?fit=1984%2C2000&ssl=1"
        alt="profile picture"
      />
    </section>

    <!-- Possible connections of account to for example RIOT -->
    <section class="connections">
      <h5 style="margin-top: 0; margin-bottom: 0">Connections</h5>
      <section v-if="!summoner">
        <q-form @submit="updateLeagueConnection()">
          <q-input
            type="text"
            v-model="summonerName"
            label="Summoner Name"
            :rules="[
              (val) => !!val || 'Field is required',
              (val) =>
                val.length > 3 || 'Fields needs to be longer than 3 characters',
            ]"
            lazy-rules
            counter
            maxlength="25"
          />
          <q-btn class="q-mt-md" color="primary" type="submit">
            Connect profile
          </q-btn>
        </q-form>
      </section>

      <q-card flat v-if="summoner" class="summoner">
        <q-avatar size="100px">
          <img
            :src="rh.getProfileIcon(summoner.profileIconId)"
            alt="profile Picture"
          />
        </q-avatar>
        <h5 style="padding-left: 1rem; margin: 0">
          {{ summoner.name }} (LvL: {{ summoner.summonerLevel }})
        </h5>
        <q-btn
          :loading="loadingFlag"
          @click="removeLeagueConnection()"
          style="margin-left: auto; margin-right: 1rem"
          color="red"
        >
          Remove
        </q-btn>
      </q-card>
    </section>
  </div>

  <div v-else>
    <h1>No account (are you logged in?)</h1>
  </div>
</template>

<script setup lang="ts">
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseApp } from 'boot/firebase';
import { ref } from 'vue';
import { updateProfile } from 'firebase/auth';
import { Notify } from 'quasar';
import { getCurrentUser } from 'vuefire';
import { SummonerData } from 'src/data/interfaces/CustomInterfaces';
import { useFetch } from '@vueuse/core';
import RiotHelper from 'src/plugins/RiotHelper';
import { useSettingsStore } from 'src/stores/settingsStore';

//General fields
const user = await getCurrentUser();
const rh = RiotHelper.getInstance();
const store = useSettingsStore();

//Flahs
const loadingFlag = ref(false);
const errorFlag = ref(false);

const memberData = ref();

//Possible connections of account to for example RIOT
const summonerName = ref('');
const summoner = ref<SummonerData | null>(null);

const docReference = doc(
  collection(getFirestore(firebaseApp), 'members'),
  user?.uid,
);

await initLoad();
await loadSummonerByPuuid();

async function initLoad() {
  errorFlag.value = false;
  const memberDoc = await getDoc(docReference);
  const docData = memberDoc.data();

  if (docData) {
    memberData.value = docData;
    return;
  }
  errorFlag.value = true;
}

async function loadSummonerByPuuid() {
  if (memberData.value.riot_puuid) {
    const { data } = await useFetch(
      `${store.apiEndpoint}/api/v1/summoner/puuid/${memberData.value.riot_puuid}`,
    )
      .get()
      .json<SummonerData>();
    if (data) {
      summoner.value = data.value;
    }
  }
}

async function loadSummonerByName() {
  if (summonerName.value.length > 3) {
    const { data } = await useFetch(
      `${store.apiEndpoint}/api/v1/summoner/name/${summonerName.value}`,
    )
      .get()
      .json<SummonerData>();
    if (data) {
      summoner.value = data.value;
    }
  }
}

async function updateLeagueConnection() {
  await loadSummonerByName();

  if (!summoner.value) {
    Notify.create({
      message: 'No Summoner available with that name',
      color: 'red',
      position: 'top',
      icon: 'mdi-close-octagon-outline',
    });
    return;
  }
  try {
    await updateDoc(docReference, {
      riot_puuid: summoner.value?.puuid,
    });
  } catch (e) {
    Notify.create({
      message: 'Error while editing profile',
      color: 'red',
      position: 'top',
      icon: 'mdi-close-octagon-outline',
    });
  }
}

async function removeLeagueConnection() {
  try {
    loadingFlag.value = true;
    await updateDoc(docReference, {
      riot_puuid: '',
    });
    summoner.value = null;
  } catch (e) {
    Notify.create({
      message: 'Error while editing profile',
      color: 'red',
      position: 'top',
      icon: 'mdi-close-octagon-outline',
    });
  } finally {
    loadingFlag.value = false;
  }
}

async function editUser() {
  try {
    loadingFlag.value = true;
    if (memberData.value && user) {
      await updateDoc(docReference, {
        displayName: memberData.value.displayName,
        photoURL: memberData.value.photoURL,
        catchPhrase: memberData.value.catchPhrase,
        about: memberData.value.about,
      });
      await updateProfile(user, {
        displayName: memberData.value.displayName,
        photoURL: memberData.value.photoURL,
      });
      Notify.create({
        message: 'Profile edited',
        color: 'primary',
        position: 'top',
        icon: 'mdi-check',
      });
    } else {
      Notify.create({
        message: 'Error while editing profile',
        color: 'red',
        position: 'top',
        icon: 'mdi-close-octagon-outline',
      });
    }
  } catch (e) {
    console.log(e);
    Notify.create({
      message: 'Error while editing profile',
      color: 'red',
      position: 'top',
      icon: 'mdi-close-octagon-outline',
    });
  } finally {
    loadingFlag.value = false;
  }
}
</script>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: 4fr minmax(150px, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;
}

img {
  width: 100%;
  border-radius: 100%;
}

@media screen and (max-width: 720px) {
  .settings-grid {
    grid-template-columns: auto;
    grid-auto-flow: dense;
  }

  img {
    width: 200px;
    border-radius: 100%;
    grid-row: 1;
  }
}

.q-form > * {
  margin-top: 0.5rem;
}

h3 {
  margin-top: 0;
}

.summoner {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
