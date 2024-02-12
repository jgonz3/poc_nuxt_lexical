<script setup lang="ts">
import { setRegisterItemFunc } from './utils';

interface Props {
  onClose: () => void;
}

const props = defineProps<Props>();
const dropDownRef = defineModel<HTMLDivElement>('dropdownRef');

const items = ref<HTMLButtonElement[]>([]);
const highlightedItem = ref<HTMLButtonElement | null>(null);

setRegisterItemFunc(registerItem);

function registerItem(itemRef: HTMLButtonElement) {
  items.value.push(itemRef);
}

function handleKeyDown(event: KeyboardEvent) {
  if (!items.value) return;

  const key = event.key;

  if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
    event.preventDefault();
  }

  switch (key) {
    case 'Tab':
    case 'Escape':
      props.onClose();
      break;

    case 'ArrowUp':
      if (highlightedItem.value === null) {
        highlightedItem.value = items.value[0];
      } else {
        const index = items.value.indexOf(highlightedItem.value) - 1;
        highlightedItem.value = items.value[index === -1 ? items.value.length - 1 : index];
      }
      break;

    case 'ArrowDown':
      if (highlightedItem.value === null) {
        highlightedItem.value = items.value[0];
      } else {
        const index = items.value.indexOf(highlightedItem.value) + 1;
        highlightedItem.value = items.value[index >= items.value.length ? 0 : index];
      }
      break;
  }
}

onMounted(() => {
  if (!highlightedItem.value) {
    highlightedItem.value = items.value[0];
  }

  highlightedItem.value?.focus();
});
</script>

<template>
  <div ref="dropDownRef" class="dropdown" @keydown="handleKeyDown">
    <slot />
  </div>
</template>
