<script setup>
import { McLiveLocationFill, BsArrowUpRightSquareFill, AkGithubFill, AkGlobe } from '@kalimahapps/vue-icons';
import BrutalButton from "@/components/ui/BrutalButton.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-details'])
</script>

<template>
  <div class="bg-card border-4 border-border shadow-md p-5 flex flex-col justify-between h-full">

    <div v-if="project.Image1" class="border-4 border-border mb-4 overflow-hidden bg-stone-100 aspect-video">
      <img :src="project.Image1" :alt="project.Name" class="w-full h-full object-cover" />
    </div>

    <div class="grow">
      <div class="flex items-start justify-between mb-2">
        <span class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-border px-2 py-0.5 shrink-0">
          {{ project.Category }}
        </span>

        <div class="flex flex-col items-end text-right font-mono text-[11px] text-stone-500 font-bold gap-0.5">
          <span v-if="project.Location" class="flex items-center gap-1">
            <McLiveLocationFill/> {{ project.Location }}
          </span>
          <span v-if="project.Year" class="text-stone-400 text-[11px]">
            {{ project.Year?.substring(0, 4) }}
          </span>
        </div>
      </div>

      <h3 class="font-display text-2xl uppercase text-brutal-black mb-3 tracking-wide">
        {{ project.Name }}
      </h3>

      <div v-if="project.Stack && project.Stack.length" class="flex flex-wrap gap-1.5 mb-4">
        <span
            v-for="tech in project.Stack"
            :key="tech"
            class="font-mono text-[10px] uppercase font-bold bg-primary text-brutal-black border border-border px-2 py-0.5">
          {{ tech }}
        </span>
      </div>
    </div>

    <div class="border-t-2 border-black/20 pt-4 mt-2 flex gap-2 items-center">
      <BrutalButton
          @click="emit('open-details', project)"
          bg-class="flex-grow bg-brutal-black text-brutal-white text-xs font-bold flex items-center justify-center gap-2 shadow-primary">
        Details <BsArrowUpRightSquareFill/>
      </BrutalButton>

      <a v-if="project.realURL" :href="project.realURL" target="_blank"
         class="bg-primary text-black border-4 border-black p-2.5 flex items-center justify-center shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
         title="Live Project">
        <AkGlobe class="w-4 h-4"/>
      </a>

      <a v-if="project.GithubURL" :href="project.GithubURL" target="_blank"
         class="bg-white text-black border-4 border-black p-2.5 flex items-center justify-center shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
         title="GitHub Repository">
        <AkGithubFill class="w-4 h-4"/>
      </a>
    </div>

  </div>
</template>