<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhCaretDown,
  PhNoteBlank,
  PhTextHOne,
  PhTextHTwo,
  PhTextHThree,
  PhListBullets,
  PhListNumbers,
  PhCheckSquare,
  PhQuotes,
  PhCodeSimple,
} from '@phosphor-icons/vue';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';

type BlockFormat =
  | 'Normal'
  | 'Heading 1'
  | 'Heading 2'
  | 'Heading 3'
  | 'Bulleted List'
  | 'Numbered List'
  | 'Checklist'
  | 'Quote'
  | 'Code Block';

const formats: BlockFormat[] = [
  'Normal',
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Bulleted List',
  'Numbered List',
  'Checklist',
  'Quote',
  'Code Block',
];

const activeBlockFormat = ref<BlockFormat>('Normal');

const labelIcon = computed(() => {
  return getIcon(activeBlockFormat.value);
});

function getIcon(format: BlockFormat) {
  switch (format) {
    case 'Normal':
      return PhNoteBlank;
    case 'Heading 1':
      return PhTextHOne;
    case 'Heading 2':
      return PhTextHTwo;
    case 'Heading 3':
      return PhTextHThree;
    case 'Bulleted List':
      return PhListBullets;
    case 'Numbered List':
      return PhListNumbers;
    case 'Checklist':
      return PhCheckSquare;
    case 'Quote':
      return PhQuotes;
    default:
      return PhCodeSimple;
  }
}

function setBlockFormat(format: BlockFormat) {
  activeBlockFormat.value = format;
  console.log('Block format:', format);
}
</script>

<template>
  <div class="lexical-command block-format">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" style="padding: 4px 2px">
          <Component :is="labelIcon" size="20px" color="rgb(107 114 128 / 1)" />
          <span>{{ activeBlockFormat }}</span>
          <PhCaretDown size="20px" color="rgb(107 114 128 / 1)" style="margin-left: 12px" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-64">
        <DropdownMenuGroup class="options">
          <DropdownMenuItem v-for="format in formats" :key="format" @click="setBlockFormat(format)">
            <Component :is="getIcon(format)" size="20px" color="rgb(107 114 128 / 1)" />
            <span>{{ format }}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<style scoped lang="postcss">
span {
  @apply ml-2.5;
}
</style>
