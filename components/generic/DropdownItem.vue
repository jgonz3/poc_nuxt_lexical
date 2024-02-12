<script setup lang="ts">
import { onMounted } from 'vue';
import { getRegisterItemFunc } from './utils';

interface Props {
  class?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  title: undefined,
});

let buttonRef = ref<HTMLButtonElement | null>(null);

const registerItem = getRegisterItemFunc();

if (registerItem === null) {
  throw new Error('DropDownItem must be used within a DropDown');
}

onMounted(() => {
  buttonRef.value && registerItem(buttonRef.value);
});
</script>

<template>
  <button ref="buttonRef" type="button" :class="props.class" :title="props.title">
    <slot />
  </button>
</template>
