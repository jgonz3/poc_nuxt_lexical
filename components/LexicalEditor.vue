<script setup lang="ts">
import { $getRoot, $getSelection } from 'lexical';
import type { EditorState, CreateEditorArgs } from 'lexical';
import { ref } from 'vue';

import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalPlainTextPlugin,
} from 'lexical-vue';

const config: CreateEditorArgs = {
  namespace: 'LexicalEditor',
  editable: true,
  onError: console.error,
  theme: {
    // Theme styling goes here
  },
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(editorState.toJSON());
  });
}

// Two-way binding
const content = ref('');
</script>

<template>
  <LexicalComposer :initial-config="config">
    <LexicalPlainTextPlugin>
      <template #contentEditable>
        <LexicalContentEditable />
      </template>
      <template #placeholder>
        <div>Enter some text...</div>
      </template>
    </LexicalPlainTextPlugin>
    <LexicalOnChangePlugin v-model="content" @change="onChange" />
    <LexicalHistoryPlugin />
    <LexicalAutoFocusPlugin />
  </LexicalComposer>
</template>
