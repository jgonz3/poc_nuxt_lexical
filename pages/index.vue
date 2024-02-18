<script lang="ts" setup>
import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import LexicalEditor from '~/lexical-components/LexicalEditor.vue';

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
    <LexicalEditor v-model="editorValue" />
  </main>
</template>

<style scoped lang="postcss">
main {
  @apply p-4;
}
</style>
