<script setup>
import { computed } from "vue";

const props = defineProps({
  type: String,
  label: String,
  href: String,
  bgClass: {
    type: String,
    default: "bg-brutal-orange text-brutal-white"
  }
})

const targetTag = computed(() => {
  if (props.href) {
    return "a"
  } else {
    return "button"
  }
})
</script>

<template>
   <!-- Check props to determine if it's a link or button -->
   <!-- if it's a link, it will have a href -->
   <!-- if it's a button, it will have a type -->
  <component
      :is="targetTag"
      :type="targetTag === 'button' ? (type || 'button') : null"
      :href="targetTag === 'a' ? href : null"
      :class="[
        bgClass,
        'p-4 border-3 border-black shadow-md brutal-clickable font-mono font-bold uppercase tracking-wider text-center'
      ]"
  >
    <slot></slot>
  </component>
</template>