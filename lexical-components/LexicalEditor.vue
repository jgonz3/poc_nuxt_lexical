<script setup lang="ts">
import { onMounted, provide, type Ref, ref, watchEffect } from 'vue';
import type { CreateEditorArgs, EditorState, LexicalEditor as LexicalEditorType } from 'lexical';
import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalRichTextPlugin,
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

const config: CreateEditorArgs = {
  namespace: 'LexicalEditor',
  editable: props.editable,
  onError: console.error,
  theme: {},
};

const editor = ref(null) as Ref<LexicalEditorType | null>;
const isEditable = ref(config.editable ?? false);

watchEffect(onCleanup => {
  if (editor.value) {
    const unregister = editor.value.registerEditableListener(editable => {
      isEditable.value = editable;
    });

    onCleanup(unregister);
  }
});

function onChange(editorState: EditorState) {
  editorState.read(() => {
    editorValue.value = JSON.stringify(editorState.toJSON());
  });
}

function prepareInitialEditorState() {
  if (editor.value && editorValue.value) {
    const parsed = editor.value.parseEditorState(editorValue.value);
    editor.value.setEditorState(parsed);
  }
}

onMounted(() => {
  prepareInitialEditorState();
});

provide<LexicalEditorContext>('lexical-editor', {
  isEditable,
  editor: editor as Ref<LexicalEditorType>,
});
</script>

<template>
  <Card class="lexical-editor" style="padding: 0">
    <LexicalComposer :initial-config="config">
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
    </LexicalComposer>
  </Card>
</template>

<style scoped lang="postcss">
:deep([contenteditable='true']) {
  @apply h-[500px] w-full p-4 outline-0;
}
</style>
