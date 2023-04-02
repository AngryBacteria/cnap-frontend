<template>
  <q-item v-if="!permission || permissionFlag" clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useCurrentUser } from 'vuefire';
import { ref, watch } from 'vue';
import { Permissions } from '../data/CustomInterfaces';

export interface NavigationItemProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  permission?: string;
}
const props = withDefaults(defineProps<NavigationItemProps>(), {
  caption: '',
  link: '#',
  icon: '',
  permission: undefined,
});

const permissionFlag = ref(false);
if (props.permission) {
  watch(
    useCurrentUser(),
    async (newUser) => {
      if (props.permission) {
        //No user but navigation needs that
        if (!newUser && props.permission === Permissions.LOGGED_OUT) {
          permissionFlag.value = true;
          return;
        }

        //User here
        if (newUser) {
          //Only needs to be logged in
          if (props.permission === Permissions.LOGGED_IN) {
            permissionFlag.value = true;
            return;
          }

          //User needs specific permission
          const token = await newUser.getIdTokenResult();
          if (token.claims[props.permission] === true) {
            permissionFlag.value = true;
            return;
          }
        }
      }
      permissionFlag.value = false;
    },
    { immediate: true }
  );
}
</script>
