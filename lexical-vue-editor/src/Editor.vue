<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { EditorState } from 'lexical';

import {
  LexicalAutoFocusPlugin,
  LexicalClickableLinkPlugin,
  LexicalHashtagPlugin,
  LexicalHistoryPlugin,
  LexicalLinkPlugin,
  LexicalListPlugin,
  LexicalRichTextPlugin,
  useLexicalComposer,
} from 'lexical-vue';
import EmojisPlugin from './plugins/EmojisPlugin.vue';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin.vue';
import ToolbarPlugin from './plugins/ToolbarPlugin/index.vue';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin.vue';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin.vue';
import AutoLinkPlugin from './plugins/AutoLinkPlugin.vue';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin.vue';
import ContentEditable from './plugins/ContentEditable.vue';
import MentionsPlugin from './plugins/MentionsPlugin.vue';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin/index.vue';
import YouTubePlugin from './plugins/YouTubePlugin/index.vue';
import TwitterPlugin from './plugins/TwitterPlugin/index.vue';

interface Emits {
  (e: 'update', state: EditorState): void;
}

const emit = defineEmits<Emits>();

const editor = useLexicalComposer();
const isEditable = ref(editor.isEditable());

let unregisterEditableListener: (() => void) | null = null;
let unregisterUpdateListener: (() => void) | null = null;

onMounted(() => {
  unregisterEditableListener = editor.registerEditableListener(editable => {
    isEditable.value = editable;
  });

  unregisterUpdateListener = editor.registerUpdateListener(({ editorState }) => {
    emit('update', editorState);
  });
});

onBeforeUnmount(() => {
  unregisterEditableListener?.();
  unregisterUpdateListener?.();
});
</script>

<template>
  <ToolbarPlugin v-if="isEditable" />

  <div class="editor-container">
    <div class="editor-inner">
      <LexicalRichTextPlugin>
        <template #contentEditable>
          <div class="editor-scroller">
            <div class="editor">
              <ContentEditable />
            </div>
          </div>
        </template>
      </LexicalRichTextPlugin>

      <LexicalHistoryPlugin />
      <AutoEmbedPlugin />
      <LexicalAutoFocusPlugin />
      <CodeHighlightPlugin />
      <LexicalListPlugin />
      <LexicalLinkPlugin />
      <AutoLinkPlugin />
      <ListMaxIndentLevelPlugin :max-depth="7" />
      <LexicalHashtagPlugin />
      <MarkdownShortcutPlugin />
      <EmojiPickerPlugin />
      <EmojisPlugin />
      <MentionsPlugin />
      <LexicalClickableLinkPlugin />
      <YouTubePlugin />
      <TwitterPlugin />
    </div>
  </div>
</template>
