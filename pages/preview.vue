<script lang="ts" setup>
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
