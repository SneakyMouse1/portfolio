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
</script>

<template>
  <section id="about-block" class="max-w-7xl mx-auto my-12 px-4 md:px-0 scroll-mt-20 md:scroll-mt-40">

    <div class="mb-8">
      <span
        class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-2"
      >
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

      <!-- STATS -->
      <div class="bg-primary text-black border-4 border-black shadow-lg p-6 flex flex-col justify-between">
        <div class="font-mono">
          <div class="text-[10px] uppercase font-bold text-black/60 mb-2">
            {{ t('about.stats.tag') }}
          </div>
          <div class="space-y-4">
            <div>
              <div class="text-4xl font-black leading-none">500+</div>
              <div class="text-xs font-bold uppercase tracking-wider">
                {{ t('about.stats.hours') }}
              </div>
            </div>
            <div>
              <div class="text-4xl font-black leading-none">2</div>
              <div class="text-xs font-bold uppercase tracking-wider">
                {{ t('about.stats.monoliths') }}
              </div>
            </div>
            <div>
              <div class="text-4xl font-black leading-none">5+</div>
              <div class="text-xs font-bold uppercase tracking-wider">
                {{ t('about.stats.designYears') }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-black text-white p-3 border-2 border-black font-mono text-xs uppercase text-center font-bold tracking-wider"
        >
          {{ t('about.stats.status') }}
        </div>
      </div>

      <!-- DEGREE PROJECT -->
      <div class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
            <h3 class="font-display text-xl uppercase text-black tracking-wide">
              {{ t('about.degree.title') }}
            </h3>
            <span class="font-mono text-xs bg-brutal-orange text-white border-2 border-black px-2 py-0.5 font-bold">
              {{ t('about.degree.tag') }}
            </span>
          </div>

          <p class="font-mono text-xs text-stone-700 leading-relaxed mb-4">
            {{ t('about.degree.desc') }}
          </p>

          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase font-bold">
            <span class="bg-stone-100 border border-black px-2 py-0.5 text-black">Laravel Monolith</span>
            <span class="bg-stone-100 border border-black px-2 py-0.5 text-black">Filament Administration</span>
            <span class="bg-stone-100 border border-black px-2 py-0.5 text-black">PostgreSQL</span>
            <span class="bg-stone-100 border border-black px-2 py-0.5 text-black">Mapbox GL JS</span>
            <span class="bg-stone-100 border border-black px-2 py-0.5 text-black">Alpine.js</span>
            <span class="bg-stone-100 border border-black px-2 py-0.5 text-black">Swup Transitions</span>
          </div>
        </div>

        <div class="text-[10px] font-mono text-stone-500 uppercase mt-4">
          {{ t('about.degree.footer') }}
        </div>
      </div>

      <!-- DESIGN DNA -->
      <div
        class="md:col-span-2 bg-brutal-pink text-black border-4 border-black shadow-lg p-6 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
            <h3 class="font-display text-xl uppercase text-black tracking-wide">
              {{ t('about.design.title') }}
            </h3>
            <span class="font-mono text-xs bg-white text-black border-2 border-black px-2 py-0.5 font-bold">
              {{ t('about.design.tag') }}
            </span>
          </div>

          <p class="font-mono text-xs text-black font-medium leading-relaxed mb-4">
            {{ t('about.design.desc') }}
          </p>

          <div class="grid grid-cols-2 gap-4 font-mono text-xs font-bold pt-1">
            <div>
              <div class="text-black/60 uppercase mb-1">{{ t('about.design.vectorTitle') }}</div>
              <div>{{ t('about.design.vectorTools') }}</div>
            </div>
            <div>
              <div class="text-black/60 uppercase text-[10px] mb-1">{{ t('about.design.uiTitle') }}</div>
              <div>{{ t('about.design.uiTools') }}</div>
            </div>
          </div>
        </div>

        <p class="font-mono text-[11px] text-black/80 font-bold border-t border-black/20 pt-3 mt-4">
          {{ t('about.design.footnote') }}
        </p>
      </div>

    </div>

    <!-- TECHNICAL SKILLS MATRIX -->
    <div class="mt-14 pt-10 border-t-4 border-black">
      <div class="mb-8">
        <span
          class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-2"
        >
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
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-150"
        >
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-green border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.frontend') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase"
              >
                CORE_DEV
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span
                v-for="skill in frontendSkills"
                :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- UI SYSTEMS & STYLING -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-150"
        >
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-pink border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.ui') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase"
              >
                DESIGN_SYS
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span
                v-for="skill in uiSkills"
                :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- BACKEND & DATABASES -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-150"
        >
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-orange border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.backend') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase"
              >
                SERVER_DATA
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span
                v-for="skill in backendSkills"
                :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- PRODUCT DELIVERY & SOFT SKILLS -->
        <div
          class="bg-white border-4 border-black shadow-lg p-6 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform duration-150"
        >
          <div>
            <div class="flex items-center justify-between border-b-2 border-black/20 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brutal-purple border-2 border-black inline-block"></span>
                <h3 class="font-display text-xl uppercase text-black tracking-wide">
                  {{ t('about.skillsMatrix.product') }}
                </h3>
              </div>
              <span
                class="font-mono text-[10px] bg-stone-100 text-black border-2 border-black px-2 py-0.5 font-extrabold uppercase"
              >
                PROCESS_UX
              </span>
            </div>

            <div class="flex flex-wrap gap-2 pt-1">
              <span
                v-for="skill in productSkills"
                :key="skill"
                class="bg-stone-50 hover:bg-black hover:text-white text-black border-2 border-black px-2.5 py-1 font-mono text-xs font-bold transition-colors cursor-default select-none"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>