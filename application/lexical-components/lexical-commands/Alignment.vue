<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  PhCaretDown,
  PhTextAlignJustify,
  PhTextAlignLeft,
  PhTextAlignCenter,
  PhTextAlignRight,
  PhTextIndent,
  PhTextOutdent,
} from '@phosphor-icons/vue';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';

type Alignment = 'Left Align' | 'Center Align' | 'Right Align' | 'Justify' | 'Indent' | 'Outdent';

const alignments: Alignment[] = ['Left Align', 'Center Align', 'Right Align', 'Justify'];

const activeAlignment = ref<Alignment>('Left Align');

const labelIcon = computed(() => {
  return getIcon(activeAlignment.value);
});

function getIcon(alignment: Alignment) {
  switch (alignment) {
    case 'Left Align':
      return PhTextAlignLeft;
    case 'Center Align':
      return PhTextAlignCenter;
    case 'Right Align':
      return PhTextAlignRight;
    default:
      return PhTextAlignJustify;
  }
}

function setBlockFormat(format: Alignment) {
  if (format.endsWith('dent')) {
    console.log('Block format:', format);
    return;
  }

  activeAlignment.value = format;
  console.log('Block format:', format);
}
</script>

<template>
  <div class="lexical-command text-align">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" style="padding: 4px 2px">
          <Component :is="labelIcon" size="20px" color="rgb(107 114 128 / 1)" />
          <span>{{ activeAlignment }}</span>
          <PhCaretDown size="20px" color="rgb(107 114 128 / 1)" style="margin-left: 12px" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-64">
        <DropdownMenuGroup class="options">
          <DropdownMenuItem
            v-for="format in alignments"
            :key="format"
            @click="setBlockFormat(format)"
          >
            <Component :is="getIcon(format)" size="20px" color="rgb(107 114 128 / 1)" />
            <span>{{ format }}</span>
          </DropdownMenuItem>

          <Separator />

          <DropdownMenuItem @click="setBlockFormat('Indent')">
            <PhTextIndent size="20px" color="rgb(107 114 128 / 1)" />
            <span>Indent</span>
          </DropdownMenuItem>

          <DropdownMenuItem @click="setBlockFormat('Outdent')">
            <PhTextOutdent size="20px" color="rgb(107 114 128 / 1)" />
            <span>Outdent</span>
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
