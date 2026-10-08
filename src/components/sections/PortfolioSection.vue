<script setup>
import { onMounted, ref, computed } from "vue";
import { BxSolidError } from '@kalimahapps/vue-icons';
import CardPortfolio from "@/components/ui/Portfolio/CardPortfolio.vue";
import SkeletonBox from '@/components/ui/SkeletonBox.vue';
import { useI18n } from "@/composables/useI18n.js";

const { t } = useI18n();

const portfolio = ref([]);
const loading = ref(false);
const error = ref(null);
const activeFilter = ref('all');

const filterCategories = [
  { key: 'all', labelKey: 'portfolio.filters.all', match: null },
  { key: 'fullstack', labelKey: 'portfolio.filters.fullstack', match: 'Full-Stack & Backend' },
  { key: 'modern', labelKey: 'portfolio.filters.modern', match: 'Astro & Modern Web' },
  { key: 'cms', labelKey: 'portfolio.filters.cms', match: 'WordPress & E-commerce' },
];

const matchesFilter = (project, filterKey) => {
  if (filterKey === 'all') return true;

  // 1. Primary source: Airtable "Project Category" multiple-select
  const projectCategories = project['Project Category'];
  const catList = Array.isArray(projectCategories)
    ? projectCategories
    : (projectCategories ? [projectCategories] : []);

  if (catList.length > 0) {
    const target = filterCategories.find(c => c.key === filterKey)?.match;
    if (target) {
      return catList.some(c => c.toLowerCase() === target.toLowerCase());
    }
  }

  // 2. Fallback heuristic if "Project Category" is empty
  const types = Array.isArray(project.Type) ? project.Type : [];
  const stack = Array.isArray(project.Stack) ? project.Stack : [];
  const allTags = [...types, ...stack].map(t => String(t).toLowerCase());

  if (filterKey === 'fullstack') {
    return allTags.some(t =>
      t.includes('laravel') ||
      t.includes('pgsql') ||
      t.includes('postgres') ||
      t.includes('node.js') ||
      t.includes('express') ||
      t.includes('backend development') ||
      t.includes('telegram bot') ||
      t.includes('monolith') ||
      t === 'api' ||
      t.includes('rest api') ||
      t.includes('custom app')
    );
  }

  if (filterKey === 'modern') {
    return allTags.some(t =>
      t.includes('astro') ||
      t.includes('sanity') ||
      t === 'static' ||
      t.includes('headless') ||
      t.includes('corporate website')
    );
  }

  if (filterKey === 'cms') {
    return allTags.some(t =>
      t.includes('wordpress') ||
      t === 'woocommerce' ||
      t.includes('elementor') ||
      t.includes('acf')
    );
  }

  return true;
};

const filteredProjects = computed(() => {
  return portfolio.value.filter(p => matchesFilter(p, activeFilter.value));
});

const getCategoryCount = (filterKey) => {
  if (filterKey === 'all') return portfolio.value.length;
  return portfolio.value.filter(p => matchesFilter(p, filterKey)).length;
};

onMounted(async () => {
  loading.value = true;

  try {
    const response = await fetch('/api/projects');
    const data = await response.json();
    portfolio.value = data.records.map((item) => ({
      id: item.id,
      ...item.fields,
    }));
  } catch (e) {
    error.value = e.message;
    console.error('[PortfolioSection] error fetching records:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section id="portfolio-block" class="max-w-7xl mx-auto my-12 px-4 md:px-0 scroll-mt-20 md:scroll-mt-40">

    <div class="mb-8">
      <span
        class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-2"
      >
        {{ t('portfolio.badge') }}
      </span>
      <h2 class="text-3xl sm:text-4xl font-display uppercase text-black tracking-wide">
        {{ t('portfolio.heading') }}
      </h2>
    </div>

    <!-- FILTER TABS -->
    <div v-if="!loading && !error && portfolio.length > 0" class="mb-8 flex flex-wrap items-center gap-2 sm:gap-3 select-none">
      <button
        v-for="cat in filterCategories"
        :key="cat.key"
        @click="activeFilter = cat.key"
        type="button"
        class="border-2 sm:border-3 border-black px-3.5 sm:px-4 py-2 font-mono text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-2"
        :class="activeFilter === cat.key
          ? 'bg-black text-white shadow-primary -translate-x-0.5 -translate-y-0.5'
          : 'bg-white hover:bg-stone-100 text-black shadow-sm active:translate-x-0.5 active:translate-y-0.5'"
      >
        <span>{{ t(cat.labelKey) }}</span>
        <span
          class="text-[10px] px-1.5 py-0.2 border transition-colors"
          :class="activeFilter === cat.key
            ? 'bg-primary text-black border-black font-black'
            : 'bg-stone-100 text-stone-600 border-black/30'"
        >
          {{ getCategoryCount(cat.key) }}
        </span>
      </button>
    </div>

    <!-- LOADING STATE VIA SKELETON -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white border-3 border-black shadow-md p-4 flex flex-col gap-3">
        <SkeletonBox height="h-48" />
        <SkeletonBox width="w-24" height="h-3" />
        <SkeletonBox height="h-6" />
        <SkeletonBox height="h-3" />
        <SkeletonBox width="w-3/4" height="h-3" />
        <div class="flex gap-2 mt-auto pt-2">
          <SkeletonBox width="w-24" height="h-8" />
          <SkeletonBox width="w-24" height="h-8" />
        </div>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="error"
      class="font-mono text-xs text-brutal-white bg-brutal-red border-2 border-black p-4 shadow-sm font-bold uppercase"
    >
      <BxSolidError /> {{ t('portfolio.error') }}
    </div>

    <!-- SUCCESS STATE -->
    <div v-else-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardPortfolio v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>

    <!-- EMPTY FILTER STATE -->
    <div
      v-else
      class="bg-white border-3 border-black p-8 text-center font-mono text-xs uppercase font-bold text-stone-600 shadow-md"
    >
      {{ t('portfolio.empty') }}
    </div>

  </section>
</template>

<style scoped></style>