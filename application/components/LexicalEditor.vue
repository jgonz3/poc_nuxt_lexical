<script setup lang="ts">
import 'lexical-vue-editor/assets/style.css';
import type { CreateEditorArgs, EditorState } from 'lexical';
import { LexicalComposer } from 'lexical-vue';
import { Editor } from 'lexical-vue-editor';
import PlaygroundEditorTheme from 'lexical-vue-editor/themes/PlaygroundEditorTheme';
import PlaygroundNodes from 'lexical-vue-editor/nodes/PlaygroundNodes';

interface Emits {
  (e: 'update', state: EditorState): void;
}
interface Props {
  editable?: boolean;
  editorState?: string;
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  editable: true,
});

const config: CreateEditorArgs = {
  theme: PlaygroundEditorTheme,
  nodes: [...PlaygroundNodes],
  editable: props.editable,
  editorState: props.editorState as unknown as EditorState,
};

function onError(error: Error) {
  throw error;
}
</script>

<template>
  <LexicalComposer :initial-config="config" @error="onError">
    <div class="editor-shell">
      <Editor @update="state => emit('update', state)" />
    </div>
  </LexicalComposer>
</template>
