<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';

interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ title }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
