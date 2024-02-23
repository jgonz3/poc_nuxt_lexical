<script setup lang="ts">
import { provide, ref } from 'vue';
import type { NodeKey } from 'lexical';
import { Separator } from '~/components/ui/separator';
import { RichTextToolbarStateUpdater } from '.';
import * as LexicalCommands from '~/lexical-components/lexical-commands';
import type { LexicalToolbarContext } from '~/lexical-components/types';

const isBold = ref(false);
const isItalic = ref(false);
const isUnderline = ref(false);
const isStrikethrough = ref(false);
const isSubscript = ref(false);
const isSuperscript = ref(false);
const isCode = ref(false);
const blockType = ref('paragraph');
const selectedElementKey = ref<NodeKey | null>(null);
const fontSize = ref('15px');
const fontFamily = ref('Arial');
const fontColor = ref('#000');
const bgColor = ref('#fff');
const isRTL = ref(false);
const codeLanguage = ref('');
const isLink = ref(false);

provide<LexicalToolbarContext>('lexical-toolbar', {
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  isCode,
  blockType,
  selectedElementKey,
  fontSize,
  fontFamily,
  fontColor,
  bgColor,
  isRTL,
  codeLanguage,
  isLink,
});
</script>

<template>
  <div class="lexical-toolbar">
    <RichTextToolbarStateUpdater />

    <LexicalCommands.UndoRedo />
    <Separator class="divider" orientation="vertical" />

    <LexicalCommands.BlockFormat />
    <Separator class="divider" orientation="vertical" />

    <LexicalCommands.Font />
    <Separator class="divider" orientation="vertical" />

    <LexicalCommands.TextFormatting />
    <Separator class="divider" orientation="vertical" />

    <LexicalCommands.Alignment />
    <Separator class="divider" orientation="vertical" />

    <LexicalCommands.InsertObjects />
  </div>

  <Separator />
</template>

<style scoped lang="postcss">
.lexical-toolbar {
  @apply flex items-center py-0.5;

  :deep(.divider) {
    @apply !h-[28px];
  }

  :deep(.lexical-command) {
    @apply px-1;
  }
}
</style>
