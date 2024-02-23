<script lang="ts" setup>
import LexicalEditor from '~/lexical-components/LexicalEditor.vue';

const editorValue = ref(localStorage.getItem('lexical-editor-value'));
</script>

<template>
  <main>
    <ClientOnly>
      <LexicalEditor v-model="editorValue" :editable="false" />
    </ClientOnly>
  </main>
</template>

<style scoped></style>
