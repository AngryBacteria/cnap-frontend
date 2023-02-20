<template>
  <q-item v-if="!permission || hasPermission()"
    clickable
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface NavigationItemProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  permission?: string;
  claims?: never;
}
const props = withDefaults(defineProps<NavigationItemProps>(), {
  caption: '',
  link: '#',
  icon: '',
  permission: undefined,
  claims: undefined
});

//Todo make this reactive
function hasPermission(): boolean {
  console.log(props.permission, props.claims)
  if (props.permission){
    if (props.claims){
      if (props.claims[props.permission] === true){
        return true;
      }
    }
  }
  return false;
}
</script>
