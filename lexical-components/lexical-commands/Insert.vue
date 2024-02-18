<script setup lang="ts">
import { PhCaretDown, PhPlus, PhImageSquare } from '@phosphor-icons/vue';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu';

function insertImage() {
  console.log('Insert image');
}
</script>

<template>
  <div class="lexical-command insert-items">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" style="padding: 4px 2px">
          <PhPlus size="20px" color="rgb(107 114 128 / 1)" />
          <span>Insert</span>
          <PhCaretDown size="20px" color="rgb(107 114 128 / 1)" style="margin-left: 12px" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-64">
        <DropdownMenuGroup class="options">
          <DropdownMenuItem @click="insertImage">
            <PhImageSquare size="20px" color="rgb(107 114 128 / 1)" weight="fill" />
            <span>Image</span>
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
