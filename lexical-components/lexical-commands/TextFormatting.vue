<script setup lang="ts">
import {
  PhTextB,
  PhTextItalic,
  PhTextUnderline,
  PhTextStrikethrough,
  PhLink,
  PhCodeSimple,
} from '@phosphor-icons/vue';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
</script>

<template>
  <div class="lexical-command text-formatting">
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <PhTextB class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <PhTextItalic class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <PhTextUnderline class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Strikethrough">
        <PhTextStrikethrough class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="link" aria-label="Insert Link">
        <PhLink class="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="code" aria-label="Insert code block">
        <PhCodeSimple class="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

<style scoped></style>
