<script lang="ts" setup>
import { debounce } from 'lodash';

const editorValue = ref(localStorage.getItem('lexical-editor-value') ?? '');

const saveToLocalStorage = debounce(() => {
  localStorage.setItem('lexical-editor-value', editorValue.value);
}, 1000);

watch(editorValue, () => {
  saveToLocalStorage();
});
</script>

<template>
  <main>
    <ClientOnly>
      <LexicalEditor v-model="editorValue" />
    </ClientOnly>
  </main>
</template>
