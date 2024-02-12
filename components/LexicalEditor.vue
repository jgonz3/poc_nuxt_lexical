<script setup lang="ts">
import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalRichTextPlugin,
} from 'lexical-vue';
import type { CreateEditorArgs, EditorState, LexicalEditor } from 'lexical';
import LexicalToolbar from '~/components/LexicalToolbar.vue';

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

const editorInstanceRef = ref<LexicalEditor | null>(null);

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
  <div class="lexical-editor">
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
  </div>
</template>

<style scoped lang="postcss">
.lexical-editor {
  @apply bg-white;
}
:deep([contenteditable='true']) {
  @apply h-[500px] w-full px-4;
}
</style>
