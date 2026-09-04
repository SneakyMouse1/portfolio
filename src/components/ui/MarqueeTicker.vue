<script setup>
import { computed } from 'vue';
import { useI18n } from '@/composables/useI18n.js';

const { currentLang } = useI18n();

const items = computed(() => {
  if (currentLang.value === 'es') {
    return [
      'LARAVEL',
      'REACT',
      'POSTGRESQL',
      'APIS REST',
      'TAILWIND CSS',
      'DOCKER',
      'DISEÑO UI/UX',
      'INTEGRACIÓN DE SERVICIOS',
      'ALICANTE, ESPAÑA',
      'FULL-STACK',
    ];
  }
  return [
    'LARAVEL',
    'REACT',
    'POSTGRESQL',
    'REST APIS',
    'TAILWIND CSS',
    'DOCKER',
    'UI/UX BACKGROUND',
    'API INTEGRATIONS',
    'ALICANTE, SPAIN',
    'FULL-STACK',
  ];
});
</script>

<template>
  <div class="w-full bg-primary border-y-4 border-black py-3 overflow-hidden select-none relative shadow-sm">
    <div class="marquee-track flex w-max items-center">
      <!-- Loop set 1 (repeated 4x to exceed any ultra-wide or 4K resolution) -->
      <div class="flex items-center gap-6 whitespace-nowrap px-3">
        <template v-for="r in 4" :key="'r1-' + r">
          <template v-for="(item, idx) in items" :key="'a-' + r + '-' + idx">
            <span class="font-mono text-xs md:text-sm font-black uppercase text-black tracking-widest">
              {{ item }}
            </span>
            <span class="text-black font-black text-xs">✦</span>
          </template>
        </template>
      </div>

      <!-- Loop set 2 (exact duplicate for 100% continuous infinite loop) -->
      <div class="flex items-center gap-6 whitespace-nowrap px-3" aria-hidden="true">
        <template v-for="r in 4" :key="'r2-' + r">
          <template v-for="(item, idx) in items" :key="'b-' + r + '-' + idx">
            <span class="font-mono text-xs md:text-sm font-black uppercase text-black tracking-widest">
              {{ item }}
            </span>
            <span class="text-black font-black text-xs">✦</span>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marqueeScroll 100s linear infinite;
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
