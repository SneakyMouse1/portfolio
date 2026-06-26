<script setup>
import {onMounted, ref} from "vue";
import { BxSolidError, McSandglassLine } from '@kalimahapps/vue-icons';
import CardPortfolio from "@/components/ui/Portfolio/CardPortfolio.vue";
import BrutalModal from "@/components/ui/BrutalModal.vue";
import CardDetails from "@/components/ui/Portfolio/CardDetails.vue";
import SkeletonBox from '@/components/ui/SkeletonBox.vue';

const portfolio = ref([])
const loading = ref(false)
const error = ref(null)

const selectedProject = ref(null)

onMounted(async () => {
  loading.value = true

  try {
    const response = await fetch('/api/projects')
    // console.log('response ', response)
    const data = await response.json()
    // console.log('data ', data)
    portfolio.value = data.records.map((item) => ({
      id: item.id,
      ...item.fields,
    }))
    // console.log('portfolio ', portfolio)
  } catch(e) {
    error.value = e.message
    console.error(e)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <section id="portfolio-block" class="max-w-7xl mx-auto my-12 px-4 md:px-0">

    <div class="mb-8">
      <span class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-2">
        PORTFOLIO_RECORDS //
      </span>
      <h2 class="text-3xl sm:text-4xl font-display uppercase text-black tracking-wide">
        SELECTED WORKS & PRODUCTION PROJECTS
      </h2>
    </div>

    <!-- LOADING STATE VIA SKELETON -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="n in 6"
        :key="n"
        class="bg-white border-3 border-black shadow-md p-4 flex flex-col gap-3"
      >
        <!-- IMG -->
        <SkeletonBox height="h-48" />
        <!-- TAG -->
        <SkeletonBox width="w-24" height="h-3" />
        <!-- TEASER -->
        <SkeletonBox height="h-6" />
        <!-- DESCRIPTION -->
        <SkeletonBox height="h-3" />
        <SkeletonBox width="w-3/4" height="h-3" />
        <!-- BUTTONS -->
        <div class="flex gap-2 mt-auto pt-2">
          <SkeletonBox width="w-24" height="h-8" />
          <SkeletonBox width="w-24" height="h-8" />
        </div>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="font-mono text-xs text-brutal-white bg-brutal-red border-2 border-black p-4 shadow-sm font-bold uppercase">
      <BxSolidError/>️ Failed to fetch records. Check network layer or environment configuration.
    </div>

    <!-- SUCCESS STATE -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardPortfolio
          v-for="project in portfolio"
          :key="project.id"
          :project="project"
          @open-details="selectedProject = $event"
      />
    </div>

    <!-- PORTFOLIO DETAILS MODAL -->
    <BrutalModal :isOpen="selectedProject !== null" @close="selectedProject = null">
      <CardDetails v-if="selectedProject" :project="selectedProject"/>
    </BrutalModal>

  </section>
</template>

<style scoped>

</style>