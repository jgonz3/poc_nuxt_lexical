<script setup lang="ts">
import {
  PhTextB,
  PhTextItalic,
  PhTextUnderline,
  PhTextStrikethrough,
  PhLink,
  PhCodeSimple,
} from '@phosphor-icons/vue';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposer } from 'lexical-vue';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { useToolbarContext } from '~/lexical-components/utils';
import { IS_APPLE } from '~/lexical-components/environment';
import { Tooltip } from '~/components/custom';

const tooltips = {
  bold: `Bold (${IS_APPLE ? 'Cmd+B' : 'Ctrl+B'})`,
  italic: `Italic (${IS_APPLE ? 'Cmd+I' : 'Ctrl+I'})`,
  underline: `Underline (${IS_APPLE ? 'Cmd+U' : 'Ctrl+U'})`,
  link: `Link (${IS_APPLE ? 'Cmd+K' : 'Ctrl+K'})`,
  code: `Code (${IS_APPLE ? 'Cmd+Shift+C' : 'Ctrl+Shift+C'})`,
};

const editor = useLexicalComposer();
const { isBold, isItalic, isUnderline, isStrikethrough, isLink, isCode } = useToolbarContext();

function runCommand(command: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code') {
  const result = editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
  console.log('Command result:', result);
}
</script>

<template>
  <div class="lexical-command text-formatting">
    <ToggleGroup type="multiple">
      <Tooltip :title="tooltips.bold">
        <ToggleGroupItem
          value="bold"
          aria-label="Bold"
          :data-state="isBold ? 'on' : null"
          @click="runCommand('bold')"
        >
          <PhTextB class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>
      <Tooltip :title="tooltips.italic">
        <ToggleGroupItem
          value="italic"
          aria-label="Italic"
          :data-state="isItalic ? 'on' : null"
          @click="runCommand('italic')"
        >
          <PhTextItalic class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>

      <Tooltip :title="tooltips.underline">
        <ToggleGroupItem
          value="underline"
          aria-label="Underline"
          :data-state="isUnderline ? 'on' : null"
          @click="runCommand('underline')"
        >
          <PhTextUnderline class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>

      <Tooltip title="Strikethrough">
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Strikethrough"
          :data-state="isStrikethrough ? 'on' : null"
          @click="runCommand('strikethrough')"
        >
          <PhTextStrikethrough class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>

      <Tooltip :title="tooltips.link">
        <ToggleGroupItem value="link" aria-label="Insert Link" :data-state="isLink ? 'on' : null">
          <PhLink class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>

      <Tooltip :title="tooltips.code">
        <ToggleGroupItem
          value="code"
          aria-label="Insert code block"
          :data-state="isCode ? 'on' : null"
          @click="runCommand('code')"
        >
          <PhCodeSimple class="h-4 w-4" />
        </ToggleGroupItem>
      </Tooltip>
    </ToggleGroup>
  </div>
</template>

<style scoped></style>
