<script lang="ts" setup>
import {createEditor} from 'lexical';

const elementRef = ref<HTMLDivElement | null>(null);

const editor = reactive(createEditor({
  namespace: 'LexicalEditor',
  editable:true,
  onError: console.error,
}))

onMounted(() => {
  if (elementRef.value) {
    editor.setRootElement(elementRef.value)
  }
})

onBeforeUnmount(() => {
  editor.setRootElement(null)
})
</script>

<template>
  <div ref="elementRef" id="lexical-editor-element" contenteditable="true"></div>
</template>

<style scoped>
#lexical-editor-element {
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
}
</style>
