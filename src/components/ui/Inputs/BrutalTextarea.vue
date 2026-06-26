<script setup>
import { useId } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  rows: {
    type: Number,
    default: 4
  },
  required: Boolean,
})

const model = defineModel()
const textareaId = useId()
</script>

<template>
  <div>
    <label :for="textareaId" class="block font-black text-xs uppercase tracking-wider mb-1 text-black">{{ label }}</label>
    <textarea
        :id="textareaId"
        v-model="model"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors resize-none"
    ></textarea>
  </div>
</template>

<style scoped>

</style>