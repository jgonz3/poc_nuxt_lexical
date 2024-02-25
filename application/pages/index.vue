<!--suppress JSIncompatibleTypesComparison -->
<script setup lang="ts">
import 'lexical-vue-editor/assets/style.css'
import type { CreateEditorArgs } from 'lexical';
import { LexicalComposer } from 'lexical-vue';
import { Editor } from 'lexical-vue-editor';
import PlaygroundEditorTheme from 'lexical-vue-editor/themes/PlaygroundEditorTheme';
import PlaygroundNodes from 'lexical-vue-editor/nodes/PlaygroundNodes';

const config: CreateEditorArgs = {
  theme: PlaygroundEditorTheme,
  nodes: [...PlaygroundNodes],
  editable: true,
};

function onError(error: Error) {
  throw error;
}
</script>

<template>
  <LexicalComposer :initial-config="config" @error="onError">
    <div class="editor-shell">
      <Editor />
    </div>
  </LexicalComposer>
</template>
