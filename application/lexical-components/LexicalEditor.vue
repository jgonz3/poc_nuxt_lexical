<script setup lang="ts">
import { onMounted, provide, ref, watchEffect } from 'vue';
import type { EditorState } from 'lexical';
import {
  LexicalAutoFocusPlugin,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalRichTextPlugin,
  useLexicalComposer,
} from 'lexical-vue';
import { Card } from '~/components/ui/card';
import { LexicalToolbar, LexicalEditorInstanceExposer } from '~/lexical-components';
import type { LexicalEditorContext } from '~/lexical-components/types';

interface Props {
  editable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  editable: true,
});
const editorValue = defineModel<string>({ required: true });

const editor = useLexicalComposer();
const isEditable = ref(props.editable ?? false);

watchEffect(onCleanup => {
  const unregister = editor.registerEditableListener(editable => {
    isEditable.value = editable;
  });

  onCleanup(unregister);
});

function onChange(editorState: EditorState) {
  editorState.read(() => {
    editorValue.value = JSON.stringify(editorState.toJSON());
  });
}

function prepareInitialEditorState() {
  if (editorValue.value) {
    const parsed = editor.parseEditorState(editorValue.value);
    editor.setEditorState(parsed);
  }
}

onMounted(() => {
  prepareInitialEditorState();
});

provide<LexicalEditorContext>('lexical-editor', {
  isEditable,
});
</script>

<template>
  <Card class="lexical-editor" style="padding: 0">
    <LexicalToolbar v-if="editor" />

    <LexicalRichTextPlugin>
      <template #contentEditable>
        <LexicalContentEditable />
      </template>
    </LexicalRichTextPlugin>

    <LexicalOnChangePlugin @change="onChange" />
    <LexicalHistoryPlugin />
    <LexicalAutoFocusPlugin />

    <!--   Custom components -->
    <LexicalEditorInstanceExposer v-model="editor" />
  </Card>
</template>

<style scoped lang="postcss">
:deep([contenteditable='true']) {
  @apply h-[500px] w-full p-4 outline-0;
}
</style>
