<script lang="ts" setup>
import { ref } from 'vue';
import { debounce } from 'lodash';

const editorValue = ref('');

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

<style scoped></style>
