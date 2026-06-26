<script setup>
import { computed } from 'vue';
import { McLiveLocationFill, AkGithubFill, AkGlobe } from '@kalimahapps/vue-icons';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

// create an array containing only those images that are filled
const projectImages = computed(() => {
  return [
    props.project.Image1,
    props.project.Image2,
    props.project.Image3,
    props.project.Image4
  ].filter(img => !!img); // Removing empty values
});

const swiperModules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <div class="flex flex-col gap-6">

    <div class="border-4 border-black bg-stone-100 shadow-md overflow-hidden relative">
      <swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :navigation="true"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 5000 }"
          class="h-full w-full"
      >
        <swiper-slide v-for="(image, index) in projectImages" :key="index" class="flex items-center justify-center">
          <img :src="image" :alt="project.Name" class="w-full max-h-[500px] object-cover" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <span class="font-mono text-xs uppercase font-extrabold text-black bg-stone-200 border-2 border-black px-3 py-1 inline-block">
          {{ project.Category }}
        </span>
      </div>

      <h2 class="font-display text-2xl uppercase font-black text-black tracking-wide mt-1">
        {{ project.Name }}
      </h2>

      <div v-if="project.Type && project.Type.length" class="flex flex-wrap gap-2">
        <span v-for="type in project.Type" :key="type" class="font-mono text-xs uppercase font-extrabold text-white bg-black border-2 border-black px-3 py-1">
          {{ type }}
        </span>
      </div>

      <div class="flex items-center font-mono text-xs text-stone-600 font-bold mt-1">
        <McLiveLocationFill class="w-4 h-4 pr-1 shrink-0"/>
        <span>{{ project.Location }} • {{ project.Year?.substring(0, 4) }}</span>
      </div>

      <div v-if="project.realURL || project.GithubURL" class="flex flex-wrap gap-2 my-1">
        <a v-if="project.realURL" :href="project.realURL" target="_blank" class="font-mono text-xs uppercase font-black bg-primary text-black border-2 border-black px-3 py-2 flex items-center gap-2 shadow-sm brutal-clickable transition-all">
          <AkGlobe class="w-4 h-4"/> Live Site
        </a>
        <a v-if="project.GithubURL" :href="project.GithubURL" target="_blank" class="font-mono text-xs uppercase font-black bg-white text-black border-2 border-black px-3 py-2 flex items-center gap-2 shadow-sm brutal-clickable transition-all">
          <AkGithubFill class="w-4 h-4"/> GitHub
        </a>
      </div>

      <p class="font-mono text-sm text-stone-800 leading-relaxed bg-stone-50 border-2 border-black p-4 shadow-sm">
        {{ project.Description }}
      </p>

      <div v-if="project.Stack && project.Stack.length">
        <h4 class="font-display text-sm uppercase font-black text-black mb-2 tracking-wide">Stack:</h4>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in project.Stack" :key="tech" class="font-mono text-[10px] uppercase font-bold bg-primary text-black border border-black px-2 py-0.5">
            {{ tech }}
          </span>
        </div>
      </div>

      <div v-if="project.Infrastructure && project.Infrastructure.length">
        <h4 class="font-display text-sm uppercase font-black text-black mb-2 tracking-wide">Infrastructure:</h4>
        <div class="flex flex-wrap gap-2">
          <span v-for="item in project.Infrastructure" :key="item" class="font-mono text-[10px] uppercase font-bold bg-stone-100 text-black border border-black px-2 py-0.5">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Arrows */
.swiper-button-next,
.swiper-button-prev {
  background-color: #000;
  width: 40px !important;
  height: 40px !important;
  color: #fff !important;
  border: 2px solid #000;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 18px !important;
  font-weight: bold;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: var(--color-primary);
  color: #000 !important;
}

/* Pagination */
.swiper-pagination-bullet {
  background: #000 !important;
  opacity: 0.5 !important;
  width: 12px !important;
  height: 12px !important;
  border: 1px solid #000;
}

.swiper-pagination-bullet-active {
  opacity: 1 !important;
  background: var(--color-primary) !important;
  transform: scale(1.2);
}
</style>