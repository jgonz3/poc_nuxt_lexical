<script setup lang="ts">
import { PhArrowCounterClockwise, PhArrowClockwise } from '@phosphor-icons/vue';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
</script>

<template>
  <div class="lexical-command undo-redo">
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="undo" aria-label="Undo">
        <PhArrowCounterClockwise class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="redo" aria-label="Redo">
        <PhArrowClockwise class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

<style scoped></style>
