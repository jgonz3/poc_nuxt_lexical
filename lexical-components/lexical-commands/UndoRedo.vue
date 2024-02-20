<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { CAN_UNDO_COMMAND, UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL } from 'lexical';
import { PhArrowCounterClockwise, PhArrowClockwise } from '@phosphor-icons/vue';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { useLexicalEditor } from '~/lexical-components/utils';
import { IS_APPLE } from '~/lexical-components/environment';
import { Tooltip } from '~/components/custom';

const { editor, isEditable } = useLexicalEditor();

const canUndo = ref(false);

let unregisterUndoCommand: (() => void) | null = null;

// unregisters onDestroy through returned callback
onMounted(() => {
  unregisterUndoCommand = editor.value?.registerCommand(
    CAN_UNDO_COMMAND,
    payload => {
      canUndo.value = payload;
      return false;
    },
    COMMAND_PRIORITY_CRITICAL
  );
});

// unregisters onDestroy
onBeforeUnmount(() => {
  unregisterUndoCommand?.();
});
</script>

<template>
  <div class="lexical-command undo-redo">
    <ToggleGroup type="multiple">
      <Tooltip :title="IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'">
        <ToggleGroupItem
          value="undo"
          aria-label="Undo"
          :disabled="!canUndo || !isEditable"
          @click="editor?.dispatchCommand(UNDO_COMMAND, undefined)"
        >
          <PhArrowCounterClockwise class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>

      <ToggleGroupItem value="redo" aria-label="Redo">
        <PhArrowClockwise class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

<style scoped></style>
