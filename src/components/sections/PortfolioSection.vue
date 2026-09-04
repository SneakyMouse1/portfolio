<script setup>
import { onMounted, ref } from "vue";
import { BxSolidError } from '@kalimahapps/vue-icons';
import CardPortfolio from "@/components/ui/Portfolio/CardPortfolio.vue";
import SkeletonBox from '@/components/ui/SkeletonBox.vue';
import { useI18n } from "@/composables/useI18n.js";

const { t } = useI18n();

const portfolio = ref([]);
const loading = ref(false);
const error = ref(null);

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
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardPortfolio v-for="project in portfolio" :key="project.id" :project="project" />
    </div>

  </section>
</template>

<style scoped></style>