<script lang="ts" setup>
import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import { LexicalComposer } from 'lexical-vue';
import type { CreateEditorArgs } from 'lexical';
import { LexicalEditor } from '~/lexical-components';

const config: CreateEditorArgs = {
  namespace: 'LexicalEditor',
  editable: true,
  onError: console.error,
  theme: {},
};

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
    <LexicalComposer :initial-config="config">
      <LexicalEditor v-model="editorValue" :editable="config.editable" />
    </LexicalComposer>
  </main>
</template>

<style scoped lang="postcss">
main {
  @apply p-4;
}
</style>
