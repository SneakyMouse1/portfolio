<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { McLiveLocationFill, BsArrowUpRightSquareFill, AkGithubFill, AkGlobe } from '@kalimahapps/vue-icons';
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { useI18n } from "@/composables/useI18n.js";
import { slugify } from "@/utils/slugify.js";

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const { t, getLocalizedField, localePath } = useI18n();

const isCommercial = computed(() => {
  const cat = props.project.Category || '';
  return /commercial/i.test(cat);
});
</script>

<template>
  <div class="bg-card border-4 border-border shadow-md p-5 flex flex-col justify-between h-full group/card hover:shadow-lg transition-shadow">

    <!-- PROJECT IMAGE / LINK WITH STICKER BADGES -->
    <div
      v-if="project.Image1"
      class="border-4 border-border mb-4 overflow-hidden bg-stone-100 aspect-video relative group/img"
    >
      <RouterLink
        :to="localePath(`/project/${slugify(project.Name)}`)"
        class="block w-full h-full cursor-pointer"
        :title="`Open case study for ${project.Name}`"
      >
        <img
          :src="project.Image1"
          :alt="project.Name"
          class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors pointer-events-none" />
      </RouterLink>

      <!-- FLOATING ACTION STICKERS -->
      <div
        v-if="project.realURL || project.GithubURL"
        class="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10"
      >
        <a
          v-if="project.realURL"
          :href="project.realURL"
          target="_blank"
          rel="noreferrer"
          class="bg-primary text-black border-2 border-black p-2 flex items-center justify-center shadow-sm brutal-press"
          :title="t('portfolio.liveSite')"
          @click.stop
        >
          <AkGlobe class="w-4 h-4" />
        </a>

        <a
          v-if="project.GithubURL"
          :href="project.GithubURL"
          target="_blank"
          rel="noreferrer"
          class="bg-white text-black border-2 border-black p-2 flex items-center justify-center shadow-sm brutal-press"
          :title="t('portfolio.github')"
          @click.stop
        >
          <AkGithubFill class="w-4 h-4" />
        </a>
      </div>
    </div>

    <div class="grow">
      <!-- CATEGORY & YEAR BADGES -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span
          class="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-black text-black bg-white border-2 border-black px-2.5 py-1 shadow-sm shrink-0"
        >
          <span
            class="w-2 h-2 rounded-full shrink-0"
            :class="/commercial/i.test(project.Category || '') ? 'bg-emerald-500' : 'bg-brutal-blue'"
          ></span>
          <span>{{ getLocalizedField(project, 'Category') || 'PROJECT' }}</span>
        </span>

        <span
          v-if="project.Year"
          class="font-mono text-xs font-black text-black bg-stone-100 border-2 border-black px-2 py-1 shadow-sm shrink-0"
        >
          {{ project.Year?.substring(0, 4) }}
        </span>
      </div>

      <!-- PROJECT TITLE -->
      <RouterLink :to="localePath(`/project/${slugify(project.Name)}`)" class="block">
        <h3 class="font-display text-2xl uppercase text-brutal-black tracking-wide hover:text-brutal-orange transition-colors">
          {{ project.Name }}
        </h3>
      </RouterLink>

      <!-- PROJECT LOCATION (FULL-WIDTH SUBTITLE, NEVER SQUEEZED) -->
      <div
        v-if="getLocalizedField(project, 'Location')"
        class="flex items-center gap-1.5 font-mono text-xs text-stone-600 font-bold mt-1 mb-3"
      >
        <McLiveLocationFill class="text-brutal-orange w-3.5 h-3.5 shrink-0" />
        <span>{{ getLocalizedField(project, 'Location') }}</span>
      </div>

      <div v-if="project.Stack && project.Stack.length" class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="tech in project.Stack"
          :key="tech"
          class="font-mono text-[10px] uppercase font-bold bg-primary text-brutal-black border border-border px-2 py-0.5"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- PRIMARY ACTION BUTTON (FULL-WIDTH 100% UNIFORM ACROSS ALL CARDS) -->
    <div class="border-t-2 border-black/20 pt-4 mt-2">
      <BrutalButton
        :to="localePath(`/project/${slugify(project.Name)}`)"
        bg-class="w-full bg-brutal-black text-brutal-white text-xs font-bold flex items-center justify-center gap-2 shadow-primary"
      >
        {{ t('portfolio.caseStudy') }} <BsArrowUpRightSquareFill class="w-3.5 h-3.5" />
      </BrutalButton>
    </div>

  </div>
</template>