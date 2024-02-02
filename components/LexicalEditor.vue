<script setup lang="ts">
import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalRichTextPlugin,
} from 'lexical-vue';
import type { CreateEditorArgs, EditorState } from 'lexical';

const editorValue = defineModel({ required: true });

const config: CreateEditorArgs = {
  namespace: 'LexicalEditor',
  editable: true,
  onError: console.error,
  theme: {},
};

function onChange(editorState: EditorState) {
  editorState.read(() => {
    editorValue.value = JSON.stringify(editorState.toJSON());
  });
}
</script>

<template>
  <div class="lexical-editor">
    <LexicalComposer :initial-config="config">
      <LexicalRichTextPlugin>
        <template #contentEditable>
          <LexicalContentEditable />
        </template>
      </LexicalRichTextPlugin>

      <LexicalOnChangePlugin @change="onChange" />
      <LexicalHistoryPlugin />
      <LexicalAutoFocusPlugin />
    </LexicalComposer>
  </div>
</template>

<style scoped>
:deep([contenteditable='true']) {
  height: 500px;
  width: 100%;
  border: 1px solid gray;
}
</style>
