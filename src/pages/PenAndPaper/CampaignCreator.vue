<template>
  <q-card class="small">
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

        <q-select
          filled
          v-model="framework"
          label="Framework"
          :options="frameworks"
          :rules="[(val) => !!val || 'Field is required']"
        />
      </fieldset>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Variables for Firestore entry
const name = ref('');
const framework = ref('');

const frameworks = [
  'Das Schwarze Auge',
  'Dungeons And Dragons',
  'Stars Without Numbers',
];
async function submitCharacter() {
  console.log('submit');
}

function onReset() {
  console.log('reset');
}
</script>

<style scoped></style>
