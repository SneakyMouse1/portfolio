<script setup>
defineProps({
  width:  { type: String, default: 'w-full' },
  height: { type: String, default: 'h-4' },
  rounded: { type: String, default: '' },
})
</script>

<template>
  <div
    :class="['bg-stone-200 animate-pulse', width, height, rounded]"
  />
</template>
