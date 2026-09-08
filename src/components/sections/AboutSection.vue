<script setup>
import { computed } from 'vue';
import { useI18n } from "@/composables/useI18n.js";

const { t } = useI18n();

const frontendSkills = [
  'React',
  'JavaScript (ES6+)',
  'TypeScript',
  'Responsive Web Design',
  'Component Architecture',
  'State Management',
  'REST API Integration',
  'Form Validation',
  'Performance Optimization'
];

const uiSkills = [
  'Tailwind CSS',
  'Design Systems',
  'Component Libraries',
  'Design Tokens',
  'Theming & Dark Mode',
  'Figma-to-Code Workflow',
  'Micro-Animations',
  'Cross-Browser Consistency',
  'Accessibility (WCAG)'
];

const backendSkills = [
  'Laravel Monoliths',
  'PHP',
  'PostgreSQL',
  'PL/pgSQL',
  'REST API Blueprinting',
  'Filament Administration',
  'ERP Web Services',
  'Postman API Testing',
  'WordPress / PHP Patches'
];

const productSkills = computed(() => {
  const list = t('about.softSkills');
  return Array.isArray(list) ? list : [];
});

const clientCities = computed(() => {
  const list = t('about.clientWork.card1_cities');
  return Array.isArray(list) ? list : [];
});

const clientPoints2 = computed(() => {
  const list = t('about.clientWork.card2_points');
  return Array.isArray(list) ? list : [];
});

const clientPoints3 = computed(() => {
  const list = t('about.clientWork.card3_points');
  return Array.isArray(list) ? list : [];
});
</script>

<template>
  <section id="about-block" class="max-w-7xl mx-auto my-12 px-4 md:px-0 scroll-mt-20 md:scroll-mt-40">

    <div class="mb-8">
      <span
        class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-2">
        {{ t('about.badge') }}
      </span>
      <h2 class="text-3xl sm:text-4xl font-display uppercase text-black tracking-wide">
        {{ t('about.heading') }}
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- EXPERIENCE -->
      <div class="md:col-span-2 bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
            <h3 class="font-display text-xl uppercase text-black tracking-wide">
              {{ t('about.erp.title') }}
            </h3>
            <span class="font-mono text-xs bg-brutal-green text-black border-2 border-black px-2 py-0.5 font-bold">
              {{ t('about.erp.tag') }}
            </span>
          </div>

          <p class="font-mono text-xs text-stone-700 leading-relaxed mb-4">
            {{ t('about.erp.desc') }}
          </p>

          <ul class="space-y-2 font-mono text-xs font-bold text-black">
            <li class="flex items-start gap-2">
              <span class="text-brutal-orange">➔</span>
              <span><strong>{{ t('about.erp.point1_title') }}</strong> {{ t('about.erp.point1_desc') }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-brutal-orange">➔</span>
              <span><strong>{{ t('about.erp.point2_title') }}</strong> {{ t('about.erp.point2_desc') }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-brutal-orange">➔</span>
              <span><strong>{{ t('about.erp.point3_title') }}</strong> {{ t('about.erp.point3_desc') }}</span>
            </li>
          </ul>
        </div>

        <div class="border-t-2 border-black/10 pt-3 mt-4 text-[10px] font-mono text-stone-500 uppercase">
          {{ t('about.erp.footer') }}
        </div>
      </div>

      <!-- CORE PROFILE -->
      <div class="bg-primary text-black border-4 border-black shadow-lg p-6 flex flex-col justify-between">
        <div class="font-mono">
          <div class="text-[10px] uppercase font-bold text-black/60 mb-3">
            {{ t('about.stats.tag') }}
          </div>
          <div class="space-y-4">
            <div class="border-b-2 border-black/15 pb-3">
              <div class="font-display text-4xl sm:text-5xl font-black leading-none text-black">
                {{ t('about.stats.item1_val') }}
              </div>
              <div class="text-xs font-bold uppercase tracking-wider mt-1 text-black">
                {{ t('about.stats.item1_lbl') }}
              </div>
            </div>
            <div class="border-b-2 border-black/15 pb-3">
              <div class="font-display text-2xl sm:text-3xl font-black tracking-wide leading-none text-black">
                {{ t('about.stats.item2_val') }}
              </div>
              <div class="text-xs font-bold uppercase tracking-wider mt-1 text-black">
                {{ t('about.stats.item2_lbl') }}
              </div>
            </div>
            <div>
              <div class="font-display text-2xl sm:text-3xl font-black tracking-wide leading-none text-black">
                {{ t('about.stats.item3_val') }}
              </div>
              <div class="text-xs font-bold uppercase tracking-wider mt-1 text-black">
                {{ t('about.stats.item3_lbl') }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-black text-white p-2.5 border-2 border-black font-mono text-[11px] uppercase text-center font-bold tracking-wider mt-6">
          {{ t('about.stats.status') }}
        </div>
      </div>

      <!-- ROW 2: FREELANCE & CLIENT FOOTPRINT (3 CARDS, 1 COL EACH) -->
      <!-- CARD 1: CROSS-BORDER CLIENTS -->
      <div
        class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
        <div>
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
            <h3 class="font-display text-xl uppercase text-black tracking-wide">
              {{ t('about.clientWork.card1_title') }}
            </h3>
            <span
              class="font-mono text-xs bg-brutal-teal text-black border-2 border-black px-2 py-0.5 font-bold uppercase">
              {{ t('about.clientWork.card1_tag') }}
            </span>
          </div>

          <p class="font-mono text-xs text-stone-700 leading-relaxed mb-4">
            {{ t('about.clientWork.card1_desc') }}
          </p>

          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase font-bold">
            <span v-for="city in clientCities" :key="city"
              class="bg-stone-100 border border-black px-2 py-0.5 text-black">
              {{ city }}
            </span>
          </div>
        </div>

        <div class="border-t-2 border-black/10 pt-3 mt-4 text-[10px] font-mono text-stone-500 uppercase font-bold">
          {{ t('about.clientWork.card1_footer') }}
        </div>
      </div>

      <!-- CARD 2: DIRECT COLLABORATION -->
      <div
        class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
        <div>
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
            <h3 class="font-display text-xl uppercase text-black tracking-wide">
              {{ t('about.clientWork.card2_title') }}
            </h3>
            <span
              class="font-mono text-xs bg-brutal-orange text-white border-2 border-black px-2 py-0.5 font-bold uppercase">
              {{ t('about.clientWork.card2_tag') }}
            </span>
          </div>

          <p class="font-mono text-xs text-stone-700 leading-relaxed mb-4">
            {{ t('about.clientWork.card2_desc') }}
          </p>

          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase font-bold">
            <span v-for="point in clientPoints2" :key="point"
              class="bg-stone-100 border border-black px-2 py-0.5 text-black">
              {{ point }}
            </span>
          </div>
        </div>

        <div class="border-t-2 border-black/10 pt-3 mt-4 text-[10px] font-mono text-stone-500 uppercase font-bold">
          {{ t('about.clientWork.card2_footer') }}
        </div>
      </div>

      <!-- CARD 3: PRAGMATIC DEV -->
      <div
        class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
        <div>
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
            <h3 class="font-display text-xl uppercase text-black tracking-wide">
              {{ t('about.clientWork.card3_title') }}
            </h3>
            <span
              class="font-mono text-xs bg-brutal-purple text-white border-2 border-black px-2 py-0.5 font-bold uppercase">
              {{ t('about.clientWork.card3_tag') }}
            </span>
          </div>

          <p class="font-mono text-xs text-stone-700 leading-relaxed mb-4">
            {{ t('about.clientWork.card3_desc') }}
          </p>

          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase font-bold">
            <span v-for="point in clientPoints3" :key="point"
              class="bg-stone-100 border border-black px-2 py-0.5 text-black">
              {{ point }}
            </span>
          </div>
        </div>

        <div class="border-t-2 border-black/10 pt-3 mt-4 text-[10px] font-mono text-stone-500 uppercase font-bold">
          {{ t('about.clientWork.card3_footer') }}
        </div>
      </div>

      <!-- ROW 3: VISUAL DNA & INTERFACE IMPLEMENTATION (FULL WIDTH 3-COL CARD) -->
      <div
        class="md:col-span-3 bg-brutal-pink text-black border-4 border-black shadow-lg p-6 sm:p-8 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
        <div>
          <div class="flex flex-wrap items-center justify-between border-b-2 border-black/20 pb-4 mb-5 gap-2">
            <div>
              <h3 class="font-display text-2xl sm:text-3xl uppercase text-black tracking-wide">
                {{ t('about.design.title') }}
              </h3>
            </div>
            <span
              class="font-mono text-xs bg-white text-black border-2 border-black px-2.5 py-1 font-black shadow-sm uppercase">
              {{ t('about.design.tag') }}
            </span>
          </div>

          <p class="font-mono text-xs sm:text-sm text-black font-semibold leading-relaxed mb-6 max-w-4xl">
            {{ t('about.design.desc') }}
          </p>

          <!-- 4 PILLARS IN EXPANDED DESIGN DNA -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <!-- PILLAR 1: VECTOR & BRAND -->
            <div class="bg-white/80 border-2 border-black p-4 flex flex-col justify-between shadow-sm">
              <div>
                <div class="text-[10px] font-black uppercase text-black/60 mb-1">
                  {{ t('about.design.col1_title') }}
                </div>
                <div class="text-xs font-black text-black mb-2">
                  {{ t('about.design.col1_tools') }}
                </div>
                <p class="text-[11px] text-stone-800 leading-relaxed font-medium">
                  {{ t('about.design.col1_desc') }}
                </p>
              </div>
            </div>

            <!-- PILLAR 2: UI/UX & DESIGN SYSTEMS -->
            <div class="bg-white/80 border-2 border-black p-4 flex flex-col justify-between shadow-sm">
              <div>
                <div class="text-[10px] font-black uppercase text-black/60 mb-1">
                  {{ t('about.design.col2_title') }}
                </div>
                <div class="text-xs font-black text-black mb-2">
                  {{ t('about.design.col2_tools') }}
                </div>
                <p class="text-[11px] text-stone-800 leading-relaxed font-medium">
                  {{ t('about.design.col2_desc') }}
                </p>
              </div>
            </div>

            <!-- PILLAR 3: DESIGN-TO-CODE -->
            <div class="bg-white/80 border-2 border-black p-4 flex flex-col justify-between shadow-sm">
              <div>
                <div class="text-[10px] font-black uppercase text-black/60 mb-1">
                  {{ t('about.design.col3_title') }}
                </div>
                <div class="text-xs font-black text-black mb-2">
                  {{ t('about.design.col3_tools') }}
                </div>
                <p class="text-[11px] text-stone-800 leading-relaxed font-medium">
                  {{ t('about.design.col3_desc') }}
                </p>
              </div>
            </div>

            <!-- PILLAR 4: CMS THEMING & PATCHES -->
            <div class="bg-white/80 border-2 border-black p-4 flex flex-col justify-between shadow-sm">
              <div>
                <div class="text-[10px] font-black uppercase text-black/60 mb-1">
                  {{ t('about.design.col4_title') }}
                </div>
                <div class="text-xs font-black text-black mb-2">
                  {{ t('about.design.col4_tools') }}
                </div>
                <p class="text-[11px] text-stone-800 leading-relaxed font-medium">
                  {{ t('about.design.col4_desc') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="border-t-2 border-black/20 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-black font-bold">
          <div>
            {{ t('about.design.footnote') }}
          </div>
          <div class="text-[10px] uppercase font-black tracking-widest text-black/70">
            FIGMA ➔ CODE FLOW
          </div>
        </div>
      </div>

    </div>

    <!-- TECHNICAL SKILLS MATRIX -->
    <div class="mt-14 pt-10 border-t-4 border-black">
      <div class="mb-8">
        <span
          class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-2">
          {{ t('about.skillsMatrix.tag') }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-display uppercase text-black tracking-wide">
          {{ t('about.skillsMatrix.heading') }}
        </h2>
        <p class="font-mono text-xs text-stone-600 max-w-2xl mt-1 leading-relaxed">
          {{ t('about.skillsMatrix.subheading') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- FRONTEND ENGINEERING -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-green border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.frontend') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase">
                CORE_DEV
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span v-for="skill in frontendSkills" :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- UI SYSTEMS & STYLING -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-pink border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.ui') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase">
                DESIGN_SYS
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span v-for="skill in uiSkills" :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- BACKEND & DATABASES -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-orange border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.backend') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase">
                SERVER_DATA
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span v-for="skill in backendSkills" :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- PRODUCT DELIVERY & SOFT SKILLS -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform duration-150">
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-purple border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.product') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase">
                PROCESS_UX
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span v-for="skill in productSkills" :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>