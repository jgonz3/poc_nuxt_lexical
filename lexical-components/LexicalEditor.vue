<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

const editorInstanceRef = ref<LexicalEditorType | null>(null);

function onChange(editorState: EditorState) {
  editorState.read(() => {
    editorValue.value = JSON.stringify(editorState.toJSON());
  });
}

function prepareInitialEditorState() {
  if (editorInstanceRef.value && editorValue.value) {
    const parsed = editorInstanceRef.value.parseEditorState(editorValue.value);
    editorInstanceRef.value.setEditorState(parsed);
  }
}

onMounted(() => {
  prepareInitialEditorState();
});
</script>

<template>
  <Card class="lexical-editor" style="padding: 0">
    <LexicalComposer :initial-config="config">
      <LexicalToolbar />

      <LexicalRichTextPlugin>
        <template #contentEditable>
          <LexicalContentEditable />
        </template>
      </LexicalRichTextPlugin>

      <LexicalOnChangePlugin @change="onChange" />
      <LexicalHistoryPlugin />
      <LexicalAutoFocusPlugin />

      <!--   Custom plugins -->
      <LexicalEditorInstanceExposer v-model="editorInstanceRef" />
    </LexicalComposer>
  </Card>
</template>

<style scoped lang="postcss">
:deep([contenteditable='true']) {
  @apply h-[500px] w-full p-4 outline-0;
}
</style>
