<script lang="ts" setup>
import { ref } from 'vue';

const editorValue = ref('');

watch(editorValue, value => {
  console.log('>>>>', value);
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
