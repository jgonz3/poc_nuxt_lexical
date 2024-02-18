<script setup lang="ts">
import { useLexicalComposer } from 'lexical-vue';
import { Separator } from '~/components/ui/separator';
import * as LexicalCommands from '~/lexical-components/lexical-commands';

const editor = useLexicalComposer();

console.log(editor);
</script>

<template>
  <div class="lexical-toolbar">
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
