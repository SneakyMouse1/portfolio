<script setup>
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { useI18n } from "@/composables/useI18n.js";

const { t } = useI18n();
</script>

<template>
  <div
    class="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 gap-6 pointer-events-none pb-20 sm:pb-24 relative"
  >
    <!-- LEFT SYSTEM CONSOLE (VISIBLE ON WIDE SCREENS >= 1280px / 1440px) -->
    <div
      class="hidden xl:flex flex-col gap-1.5 text-left bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] font-mono text-xs select-none absolute left-2 2xl:left-6 top-1/2 -translate-y-1/2 max-w-[230px] z-10 pointer-events-auto"
    >
      <div class="flex items-center justify-between border-b-2 border-black/20 pb-1.5 mb-1 font-black text-stone-600">
        <span>{{ t('hero.systemSpec') }}</span>
        <span class="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-black">
          <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> OK
        </span>
      </div>
      <div class="font-black text-black tracking-tight">{{ t('hero.coreStack') }}</div>
      <div class="text-stone-700 font-bold text-[11px]">{{ t('hero.db') }}</div>
      <div class="text-stone-700 font-bold text-[11px]">{{ t('hero.focus') }}</div>
      <div class="mt-1 pt-1.5 border-t border-black/15 text-[9px] font-black uppercase text-stone-500">
        {{ t('hero.crafted') }}
      </div>
    </div>

    <!-- RIGHT LOCATION & TELEMETRY CONSOLE (VISIBLE ON WIDE SCREENS >= 1280px / 1440px) -->
    <div
      class="hidden xl:flex flex-col gap-1.5 text-right bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] font-mono text-xs select-none absolute right-2 2xl:right-6 top-1/2 -translate-y-1/2 max-w-[230px] z-10 pointer-events-auto"
    >
      <div class="flex items-center justify-between border-b-2 border-black/20 pb-1.5 mb-1 font-black text-stone-600">
        <span class="inline-flex items-center gap-1 text-[10px] text-orange-600 font-black">
          <span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span> LIVE
        </span>
        <span>{{ t('hero.locationSpec') }}</span>
      </div>
      <div class="font-black text-black tracking-tight">{{ t('hero.base') }}</div>
      <div class="text-stone-700 font-bold text-[11px]">{{ t('hero.coords') }}</div>
      <div class="text-stone-700 font-bold text-[11px]">{{ t('hero.readyStatus') }}</div>
      <div class="mt-1 pt-1.5 border-t border-black/15 text-[9px] font-black uppercase text-stone-500">
        LATENCY: &lt;15MS // CET ZONE
      </div>
    </div>

    <!-- CENTRAL CONTENT COLUMN -->
    <div class="flex flex-col items-center gap-4 max-w-3xl z-10">

      <!-- AVAILABLE FOR WORK PULSING BADGE -->
      <div
        class="inline-flex items-center gap-2.5 bg-white border-2 border-black px-4 py-1.5 shadow-[3px_3px_0px_#000] select-none pointer-events-auto"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span class="font-mono text-xs font-black uppercase tracking-wider text-black">
          {{ t('hero.status') }}
        </span>
      </div>

      <!-- NAME STAMP & TITLE -->
      <div class="select-none flex flex-col items-center mt-1">
        <div
          class="inline-block bg-black text-white border-2 border-black px-4 py-1.5 font-mono text-xs sm:text-sm uppercase tracking-widest font-black shadow-[3px_3px_0px_#000] rotate-[-0.5deg]"
        >
          {{ t('hero.name') }}
        </div>

        <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display uppercase tracking-wide text-black leading-none mt-3">
          {{ t('hero.title') }}
        </h1>
      </div>

      <!-- BIO -->
      <p class="font-mono text-sm sm:text-base md:text-lg max-w-2xl text-black font-semibold leading-relaxed select-none">
        {{ t('hero.bio') }}
      </p>

      <!-- DUAL CALL TO ACTION -->
      <div class="flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto mt-2">
        <BrutalButton bg-class="bg-primary text-black font-black shadow-md hover:shadow-lg" href="#portfolio-block">
          {{ t('hero.explore') }} ↗
        </BrutalButton>

        <BrutalButton bg-class="bg-white text-black font-black shadow-md hover:shadow-lg" href="#contact-block">
          {{ t('hero.contact') }} ✉
        </BrutalButton>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>