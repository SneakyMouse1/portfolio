<script setup>
import {watch} from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden' // Disable scroll on the page
  } else {
    document.body.style.overflow = '' // Return scroll after modal closed
  }
})
</script>

<template>
  <teleport to="body">
    <div v-if="isOpen" @click.self="$emit('close')" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div class="bg-white border-4 border-black shadow-xl w-full max-w-3xl p-6 relative flex flex-col max-h-[90vh]">

        <button @click="$emit('close')" class="absolute -top-4 -right-4 bg-brutal-red text-white border-4 border-black w-10 h-10 flex items-center justify-center font-mono font-black text-lg shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer z-10">
          ✕
        </button>

        <div class="overflow-y-auto overflow-x-hidden flex-1 pr-2 flex flex-col gap-4">

          <div class="font-mono text-xs text-stone-700 leading-relaxed py-2">
            <slot></slot>
          </div>

          <div v-if="$slots.actions" id="modal-footer" class="border-t-2 border-black/20 py-4 flex justify-end gap-3 mt-auto">
            <slot name="actions"></slot>
          </div>

        </div>

      </div>

    </div>
  </teleport>
</template>

<style scoped>
/* Customized scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f5f5f4;
  border-left: 2px solid #000000;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #000000;
}
</style>