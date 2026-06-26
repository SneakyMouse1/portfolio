<script setup>
import { useId } from 'vue';

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  required: Boolean,
})

const model = defineModel()
const inputId = useId()
</script>

<template>
  <div>
    <label :for="inputId" class="block font-black text-xs uppercase tracking-wider mb-1 text-black">{{ label }}</label>
    <input
        :id="inputId"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors"
    >
  </div>
</template>

<style scoped>

</style>