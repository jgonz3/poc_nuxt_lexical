<script setup lang="ts">
interface Props {
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName?: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  stopCloseOnClickSelf?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  buttonAriaLabel: undefined,
  buttonClassName: '',
  buttonIconClassName: undefined,
  buttonLabel: undefined,
  stopCloseOnClickSelf: undefined,
});

const dropdownRef = ref<HTMLDivElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const showDropdown = ref(false);

function handleClose() {
  showDropdown.value = false;
  buttonRef.value?.focus();
}

function handle(event: MouseEvent) {
  const target = event.target;
  if (props.stopCloseOnClickSelf) {
    if (dropdownRef.value && dropdownRef.value.contains(target as Node)) return;
  }
  if (!buttonRef.value?.contains(target as Node)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  if (showDropdown.value && buttonRef.value && dropdownRef.value) {
    const { top, left } = buttonRef.value.getBoundingClientRect();
    dropdownRef.value.style.top = `${top + 42}px`;
    dropdownRef.value.style.left = `${Math.min(left, window.innerWidth - dropdownRef.value.offsetWidth - 20)}px`;
  }

  if (showDropdown.value) {
    document.addEventListener('click', handle);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handle);
});
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :disabled
    :class="buttonClassName"
    :aria-label="buttonAriaLabel || buttonLabel"
    @click="() => (showDropdown = !showDropdown)"
  >
    <span v-if="buttonIconClassName" :class="buttonIconClassName" />

    <span v-if="buttonLabel" class="text dropdown-button-text">{{ buttonLabel }}</span>

    <i class="chevron-down" />
  </button>

  <DropdownItems v-if="showDropdown" v-model:dropdown-ref="dropdownRef" :on-close="handleClose">
    <slot />
  </DropdownItems>
</template>
