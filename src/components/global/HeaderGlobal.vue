<script setup>
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { useScrollTo } from "@/composables/useScrollTo.js";

const { scrollToSection } = useScrollTo();
</script>

<template>
  <header class="fixed top-4 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-4 mb-4 bg-white border-4 border-black shadow-md flex flex-col md:flex-row justify-between items-center p-4 md:p-6 gap-4">

    <RouterLink to="/" class="flex items-center gap-3">
      <div class="bg-black text-white text-xl md:text-2xl font-display py-2 px-5 uppercase tracking-wider hover:bg-primary-hover hover:text-black transition-colors duration-150 border-2 border-black inline-block select-none">
        SMYSLOV.DEV
      </div>
      <div class="hidden sm:inline-block bg-primary border-2 border-black py-1 px-3 text-xs font-mono font-bold uppercase text-black">
        Alicante, Spain
      </div>
    </RouterLink>

    <nav class="flex items-center gap-2 font-bold text-sm uppercase">
      <button
          @click="scrollToSection('about-block')"
          class="w-20 border-2 border-transparent hover:border-black hover:bg-primary py-1.5 px-3.5 transition-all text-xs tracking-wider cursor-pointer"
      >
        About
      </button>

      <button
          @click="scrollToSection('portfolio-block')"
          class="w-20 border-2 border-transparent hover:border-black hover:bg-primary py-1.5 px-3.5 transition-all text-xs tracking-wider cursor-pointer"
      >
        Projects
      </button>

      <button
          @click="scrollToSection('contact-block')"
          class="w-20 border-2 border-transparent hover:border-black hover:bg-brutal-green py-1.5 px-3.5 transition-all tracking-wider text-xs cursor-pointer"
      >
        Contact
      </button>
    </nav>

    <BrutalButton
        type="button"
        bg-class="bg-primary text-black hidden md:block"
        @click="scrollToSection('contact-block')"
    >
      Let's Talk
    </BrutalButton>
  </header>
</template>