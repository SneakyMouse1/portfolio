<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  type: String,
  label: String,
  href: String,
  to: [String, Object],
  bgClass: {
    type: String,
    default: "bg-brutal-orange text-brutal-white"
  }
})

const targetTag = computed(() => {
  if (props.to) {
    return RouterLink
  } else if (props.href) {
    return "a"
  } else {
    return "button"
  }
})
</script>

<template>
  <component
    :is="targetTag"
    :type="targetTag === 'button' ? (type || 'button') : null"
    :href="targetTag === 'a' ? href : null"
    :to="props.to || null"
    :class="[
      bgClass,
      'p-4 border-3 border-black shadow-md brutal-clickable font-mono font-bold uppercase tracking-wider text-center select-none'
    ]"
  >
    <slot></slot>
  </component>
</template>