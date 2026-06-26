<script setup>
import { useId } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  required: Boolean,
  options: Array,
})

const model = defineModel()
const selectId = useId()
</script>

<template>
  <div>
    <label :for="selectId" class="block font-black text-xs uppercase tracking-wider mb-1 text-black">{{ label }}</label>
    <select
        :id="selectId"
        v-model="model"
        :required="required"
        class="w-full bg-white border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-[#fff9db] transition-colors"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>

      <option
          v-for="option in options"
          :key="option"
          :value="option"
      >{{ option }}</option>
    </select>
  </div>
</template>