<script setup lang="ts">
import type { EditorState } from 'lexical';
import LexicalEditor from '~/components/LexicalEditor.vue';

const localEditorState = localStorage.getItem('lexical-editor-state');

function onEditorUpdate(editorState: EditorState) {
  localStorage.setItem('lexical-editor-state', JSON.stringify(editorState.toJSON()));
}
</script>

<template>
  <LexicalEditor :editor-state="localEditorState" @update="onEditorUpdate" />
</template>

<style scoped></style>
