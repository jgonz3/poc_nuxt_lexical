<script setup lang="ts">
import { PhTextT, PhCaretDown } from '@phosphor-icons/vue';
import { Button } from '~/components/ui/button';
import * as Dropdown from '~/components/ui/dropdown-menu';
import { useFontCommandLogic, font } from '~/lexical-components/lexical-commands/utils';

const { fontFamily, fontSize, setValue } = useFontCommandLogic();
</script>

<template>
  <div class="lexical-command font">
    <div>
      <Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger as-child>
          <Button variant="ghost" style="padding: 4px 2px">
            <PhTextT size="20px" color="rgb(107 114 128 / 1)" />
            <span>{{ fontFamily }}</span>
            <PhCaretDown size="20px" color="rgb(107 114 128 / 1)" style="margin-left: 12px" />
          </Button>
        </Dropdown.DropdownMenuTrigger>

        <Dropdown.DropdownMenuContent class="w-64">
          <Dropdown.DropdownMenuGroup class="options">
            <Dropdown.DropdownMenuItem
              v-for="fontFamily in font.families"
              :key="fontFamily"
              @click="setValue('font-family', fontFamily)"
            >
              {{ fontFamily }}
            </Dropdown.DropdownMenuItem>
          </Dropdown.DropdownMenuGroup>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>
    </div>

    <!--    Font sizes dropdown menu -->
    <div>
      <Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger as-child>
          <Button variant="ghost" style="padding: 4px 2px">
            <span>{{ fontSize }}</span>
            <PhCaretDown size="20px" color="rgb(107 114 128 / 1)" style="margin-left: 12px" />
          </Button>
        </Dropdown.DropdownMenuTrigger>

        <Dropdown.DropdownMenuContent class="w-64">
          <Dropdown.DropdownMenuGroup class="options">
            <Dropdown.DropdownMenuItem
              v-for="fontSize in font.sizes"
              :key="fontSize"
              @click="setValue('font-size', fontSize)"
            >
              {{ fontSize }}
            </Dropdown.DropdownMenuItem>
          </Dropdown.DropdownMenuGroup>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.lexical-command {
  @apply flex;
}

span {
  @apply ml-2.5;
}
</style>
