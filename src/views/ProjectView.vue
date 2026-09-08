<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  BxArrowBack,
  McLiveLocationFill,
  AkGithubFill,
  AkGlobe,
  BxSolidError,
  BxChevronLeft,
  BxChevronRight
} from '@kalimahapps/vue-icons';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
import FooterGlobal from '@/components/global/FooterGlobal.vue';
import BrutalButton from '@/components/ui/BrutalButton.vue';
import SkeletonBox from '@/components/ui/SkeletonBox.vue';
import { useI18n } from '@/composables/useI18n.js';
import { slugify } from '@/utils/slugify.js';

const route = useRoute();
const router = useRouter(); 1
const { t, getLocalizedField, localePath } = useI18n();

const allProjects = ref([]);
const project = ref(null);
const loading = ref(true);
const error = ref(null);

const swiperModules = [Navigation, Pagination, Autoplay];

const loadProjects = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      throw new Error(`Failed to load project data (${response.status})`);
    }

    const data = await response.json();
    const records = data.records.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    allProjects.value = records;
    findCurrentProject();
  } catch (err) {
    error.value = err.message;
    console.error('[ProjectView] fetch error:', err);
  } finally {
    loading.value = false;
  }
};

const findCurrentProject = () => {
  const param = route.params.id;
  const found = allProjects.value.find((p) => p.id === param || slugify(p.Name) === param.toLowerCase());
  if (found) {
    project.value = found;
  } else if (allProjects.value.length > 0) {
    error.value = 'Project not found or record was archived.';
  }
};

// Re-eval on route param change
watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (allProjects.value.length > 0) {
    findCurrentProject();
  } else {
    loadProjects();
  }
});

onMounted(() => {
  window.scrollTo({ top: 0 });
  loadProjects();
});

const projectImages = computed(() => {
  if (!project.value) return [];
  return [
    project.value.Image1,
    project.value.Image2,
    project.value.Image3,
    project.value.Image4
  ].filter(Boolean);
});

// Adjacent projects navigation (Prev / Next)
const currentIndex = computed(() => {
  if (!project.value || !allProjects.value.length) return -1;
  return allProjects.value.findIndex((p) => p.id === project.value.id);
});

const prevProject = computed(() => {
  if (currentIndex.value <= 0) return null;
  return allProjects.value[currentIndex.value - 1];
});

const nextProject = computed(() => {
  if (currentIndex.value === -1 || currentIndex.value >= allProjects.value.length - 1) return null;
  return allProjects.value[currentIndex.value + 1];
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-black font-sans">
    <HeaderGlobal />

    <main class="flex-1 w-full max-w-7xl mx-auto px-4 xl:px-0 pt-24 md:pt-32 pb-16">

      <!-- TOP BREADCRUMB / BACK LINK -->
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <RouterLink :to="localePath('/#portfolio-block')"
          class="inline-flex items-center gap-2 font-mono text-xs uppercase font-extrabold bg-white border-3 border-black px-3.5 py-2 shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-0 transition-all select-none">
          <BxArrowBack class="w-4 h-4" />
          <span>{{ t('project.back') }}</span>
        </RouterLink>

        <div v-if="project" class="font-mono text-xs uppercase font-extrabold text-stone-500">
          {{ t('project.caseStudyNumber') }} {{ (currentIndex + 1).toString().padStart(2, '0') }} {{ t('project.of') }}
          {{ allProjects.length.toString().padStart(2, '0') }}
        </div>
      </div>

      <!-- LOADING STATE -->
      <div v-if="loading" class="space-y-8">
        <div class="space-y-4">
          <SkeletonBox width="w-36" height="h-6" />
          <SkeletonBox width="w-3/4" height="h-16" />
          <SkeletonBox width="w-64" height="h-4" />
        </div>
        <SkeletonBox height="h-96" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SkeletonBox height="h-48" />
          <SkeletonBox height="h-48" />
        </div>
      </div>

      <!-- ERROR STATE -->
      <div v-else-if="error || !project"
        class="bg-white border-4 border-black p-8 shadow-lg max-w-2xl mx-auto text-center space-y-6 my-12">
        <div class="inline-flex p-4 bg-brutal-red text-white border-2 border-black shadow-sm">
          <BxSolidError class="w-8 h-8" />
        </div>
        <h2 class="font-display text-3xl uppercase tracking-wide">{{ t('project.notFoundTitle') }}</h2>
        <p class="font-mono text-xs text-stone-600 leading-relaxed">
          {{ error || t('project.notFoundDesc') }}
        </p>
        <div>
          <RouterLink :to="localePath('/#portfolio-block')"
            class="inline-block bg-primary text-black font-mono text-xs uppercase font-black border-3 border-black px-6 py-3 shadow-md hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-sm transition-all">
            {{ t('project.returnToPortfolio') }}
          </RouterLink>
        </div>
      </div>

      <!-- PROJECT CONTENT -->
      <div v-else class="space-y-10">

        <!-- HEADER BANNER -->
        <header class="border-b-4 border-black pb-8">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span
              class="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-black text-black bg-white border-2 border-black px-3 py-1 shadow-sm">
              <span class="w-2 h-2 rounded-full shrink-0"
                :class="/commercial/i.test(project.Category || '') ? 'bg-emerald-500' : 'bg-brutal-blue'"></span>
              <span>{{ getLocalizedField(project, 'Category') || 'PROJECT_RECORD' }}</span>
            </span>

            <div v-if="project.Type && project.Type.length" class="flex flex-wrap gap-2">
              <span v-for="item in project.Type" :key="item"
                class="font-mono text-xs uppercase font-extrabold text-white bg-black border-2 border-black px-3 py-1">
                {{ item }}
              </span>
            </div>
          </div>

          <h1
            class="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-black tracking-wide leading-none mb-4">
            {{ project.Name }}
          </h1>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center font-mono text-xs sm:text-sm text-stone-600 font-bold gap-2">
              <span v-if="getLocalizedField(project, 'Location')" class="flex items-center gap-1">
                <McLiveLocationFill class="w-4 h-4 text-brutal-orange" />
                {{ getLocalizedField(project, 'Location') }}
              </span>
              <span v-if="getLocalizedField(project, 'Location') && project.Year">•</span>
              <span v-if="project.Year">
                {{ t('project.yearLabel') }} {{ project.Year?.substring(0, 4) }}
              </span>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="flex flex-wrap gap-3">
              <a v-if="project.realURL" :href="project.realURL" target="_blank" rel="noreferrer"
                class="bg-primary text-black font-mono text-xs uppercase font-black border-3 border-black px-4 py-2.5 flex items-center gap-2 shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all select-none">
                <AkGlobe class="w-4 h-4" />
                <span>{{ t('project.visitLive') }}</span>
              </a>

              <a v-if="project.GithubURL" :href="project.GithubURL" target="_blank" rel="noreferrer"
                class="bg-white text-black font-mono text-xs uppercase font-black border-3 border-black px-4 py-2.5 flex items-center gap-2 shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all select-none">
                <AkGithubFill class="w-4 h-4" />
                <span>{{ t('project.githubRepo') }}</span>
              </a>
            </div>
          </div>
        </header>

        <!-- IMAGE SHOWCASE GALLERY -->
        <section v-if="projectImages.length"
          class="border-4 border-black bg-stone-950 shadow-xl overflow-hidden relative">
          <swiper :key="`${project.id}-${projectImages.length}`" :modules="swiperModules" :slides-per-view="1"
            :loop="projectImages.length > 1" :navigation="projectImages.length > 1" :pagination="{ clickable: true }"
            :autoplay="{ delay: 5000, disableOnInteraction: true }"
            class="w-full aspect-4/3 sm:aspect-16/10 max-h-[80vh]">
            <swiper-slide v-for="(image, index) in projectImages" :key="index"
              class="relative flex items-center justify-center bg-stone-950 overflow-hidden select-none">
              <!-- Ambient blurred background for mixed aspect ratios -->
              <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <img :src="image" alt="" aria-hidden="true"
                  class="w-full h-full object-cover blur-2xl scale-110 opacity-35 brightness-75" />
                <div class="absolute inset-0 bg-black/40"></div>
              </div>

              <!-- Main sharp image (never cropped) -->
              <img :src="image" :alt="`${project.Name} showcase ${index + 1}`"
                class="relative z-10 w-full h-full object-contain p-1 sm:p-2 md:p-3 drop-shadow-2xl" />
            </swiper-slide>
          </swiper>
        </section>

        <!-- CASE OVERVIEW BRIEF (FULL WIDTH) -->
        <section class="bg-white border-4 border-black p-6 md:p-8 shadow-md space-y-4">
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3">
            <h2 class="font-display text-2xl uppercase tracking-wide">
              {{ t('project.overviewTitle') }}
            </h2>
            <span
              class="font-mono text-xs font-bold bg-primary text-black border-2 border-black px-2.5 py-0.5 uppercase">
              {{ t('project.caseBrief') }}
            </span>
          </div>

          <p class="font-mono text-sm sm:text-base text-stone-900 leading-relaxed whitespace-pre-line">
            {{ getLocalizedField(project, 'Description') }}
          </p>
        </section>

        <!-- BALANCED TWO-COLUMN SPECS GRID (EQUAL HEIGHT, NO HOLES) -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">

          <!-- CORE TECH STACK & ARCHITECTURE -->
          <div class="bg-card border-4 border-black p-6 shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div class="border-b-2 border-black/20 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <span class="font-mono text-[10px] uppercase font-bold text-stone-500 block">{{ t('project.sysSpecs')
                  }}</span>
                  <h3 class="font-display text-2xl uppercase tracking-wide">{{ t('project.coreStack') }}</h3>
                </div>
                <span class="font-mono text-[10px] font-bold bg-stone-100 border-2 border-black px-2 py-0.5 uppercase">
                  {{ t('project.stackBadge') }}
                </span>
              </div>

              <div v-if="project.Stack && project.Stack.length" class="flex flex-wrap gap-2">
                <span v-for="tech in project.Stack" :key="tech"
                  class="font-mono text-xs uppercase font-bold bg-primary text-black border-2 border-black px-2.5 py-1 shadow-sm">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div v-if="project.Type && project.Type.length" class="border-t-2 border-black/10 pt-4">
              <span class="font-mono text-[10px] uppercase font-bold text-stone-500 block mb-2">{{
                t('project.architecture') }}</span>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="t in project.Type" :key="t"
                  class="font-mono text-xs uppercase font-bold bg-stone-100 text-black border border-black px-2 py-0.5">
                  {{ t }}
                </span>
              </div>
            </div>
          </div>

          <!-- INFRASTRUCTURE & QUICK ACTION -->
          <div class="bg-card border-4 border-black p-6 shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div class="border-b-2 border-black/20 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <span class="font-mono text-[10px] uppercase font-bold text-stone-500 block">{{
                    t('project.deploymentSpecs') }}</span>
                  <h3 class="font-display text-2xl uppercase tracking-wide">{{ t('project.infraTitle') }}</h3>
                </div>
                <span class="font-mono text-[10px] font-bold bg-stone-100 border-2 border-black px-2 py-0.5 uppercase">
                  {{ t('project.hostingBadge') }}
                </span>
              </div>

              <div v-if="project.Infrastructure && project.Infrastructure.length" class="flex flex-wrap gap-2 mb-4">
                <span v-for="infra in project.Infrastructure" :key="infra"
                  class="font-mono text-xs uppercase font-bold bg-stone-100 text-black border-2 border-black px-2.5 py-1">
                  {{ infra }}
                </span>
              </div>

              <div class="border-t-2 border-black/10 pt-3 space-y-2 font-mono text-xs text-stone-600">
                <div class="flex justify-between items-center">
                  <span class="uppercase text-stone-500">{{ t('project.statusLabel') }}</span>
                  <span class="font-bold text-black">{{ t('project.statusValue') }}</span>
                </div>
                <div v-if="getLocalizedField(project, 'Location')" class="flex justify-between items-center">
                  <span class="uppercase text-stone-500">{{ t('project.locationLabel') }}</span>
                  <span class="font-bold text-black">{{ getLocalizedField(project, 'Location') }}</span>
                </div>
                <div v-if="project.Year" class="flex justify-between items-center">
                  <span class="uppercase text-stone-500">{{ t('project.yearLabel') }}</span>
                  <span class="font-bold text-black">{{ project.Year?.substring(0, 4) }}</span>
                </div>
              </div>
            </div>

            <!-- COLLABORATION CTA -->
            <div
              class="bg-primary text-black border-3 border-black p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p class="font-mono text-xs font-bold leading-tight text-center sm:text-left">
                {{ t('project.ctaText') }}
              </p>
              <RouterLink :to="localePath('/#contact-block')"
                class="shrink-0 bg-black text-white font-mono text-xs font-black uppercase px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors">
                {{ t('project.ctaButton') }}
              </RouterLink>
            </div>
          </div>

        </section>

        <!-- PREVIOUS / NEXT PROJECT PAGINATION -->
        <nav class="border-t-4 border-black pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RouterLink v-if="prevProject" :to="localePath(`/project/${slugify(prevProject.Name)}`)"
            class="group bg-white border-4 border-black p-5 shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg active:translate-0 transition-all flex flex-col justify-between select-none">
            <div class="flex items-center gap-1 font-mono text-xs font-bold text-stone-500 uppercase mb-2">
              <BxChevronLeft class="w-4 h-4 text-black group-hover:-translate-x-1 transition-transform" />
              <span>{{ t('project.prevProject') }}</span>
            </div>
            <div
              class="font-display text-2xl uppercase tracking-wide text-black group-hover:text-brutal-orange transition-colors">
              {{ prevProject.Name }}
            </div>
          </RouterLink>
          <div v-else class="hidden sm:block"></div>

          <RouterLink v-if="nextProject" :to="localePath(`/project/${slugify(nextProject.Name)}`)"
            class="group bg-white border-4 border-black p-5 shadow-md hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg active:translate-0 transition-all flex flex-col justify-between text-right select-none">
            <div class="flex items-center justify-end gap-1 font-mono text-xs font-bold text-stone-500 uppercase mb-2">
              <span>{{ t('project.nextProject') }}</span>
              <BxChevronRight class="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </div>
            <div
              class="font-display text-2xl uppercase tracking-wide text-black group-hover:text-brutal-orange transition-colors">
              {{ nextProject.Name }}
            </div>
          </RouterLink>
        </nav>

      </div>

    </main>

    <FooterGlobal />
  </div>
</template>

<style>
/* Custom swiper arrow styles in neo-brutalist theme */
.swiper-button-next,
.swiper-button-prev {
  background-color: #000000;
  width: 44px !important;
  height: 44px !important;
  color: #ffffff !important;
  border: 3px solid #000000;
  opacity: 0.9;
  transition: all 0.15s ease;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 18px !important;
  font-weight: 900;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: var(--color-primary, #FFDE4D);
  color: #000000 !important;
  transform: translate(2px, 2px);
}

.swiper-pagination-bullet {
  background: #000000 !important;
  opacity: 0.4 !important;
  width: 12px !important;
  height: 12px !important;
  border: 2px solid #000000;
  border-radius: 0 !important;
}

.swiper-pagination-bullet-active {
  opacity: 1 !important;
  background: var(--color-primary, #FFDE4D) !important;
  transform: scale(1.2);
}
</style>
