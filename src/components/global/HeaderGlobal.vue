<script setup>
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { useScrollTo } from "@/composables/useScrollTo.js";

const { scrollToSection } = useScrollTo();
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 md:top-4 md:left-4 md:right-4 z-50 w-full md:w-auto max-w-7xl mx-auto bg-white border-b-4 md:border-4 border-black shadow-sm md:shadow-md flex flex-row justify-between items-center p-3 md:p-6 gap-2 md:gap-4">

    <RouterLink to="/" class="flex items-center gap-2 md:gap-3">
      <div
        class="bg-black text-white text-lg md:text-2xl font-display py-1.5 px-3 md:py-2 md:px-5 uppercase tracking-wider hover:bg-primary-hover hover:text-black transition-colors duration-150 border-2 border-black inline-block select-none">
        SMYSLOV.DEV
      </div>
      <div
        class="hidden sm:inline-block bg-primary border-2 border-black py-1 px-3 text-xs font-mono font-bold uppercase text-black">
        Alicante, Spain
      </div>
    </RouterLink>

    <nav class="flex items-center gap-1 md:gap-2 font-bold text-sm uppercase">
      <button @click="scrollToSection('about-block')"
        class="w-auto md:w-20 border-2 border-transparent hover:border-black hover:bg-primary py-1 px-2.5 md:py-1.5 md:px-3.5 transition-all text-xs tracking-wider cursor-pointer">
        About
      </button>

      <button @click="scrollToSection('portfolio-block')"
        class="w-auto md:w-20 border-2 border-transparent hover:border-black hover:bg-primary py-1 px-2.5 md:py-1.5 md:px-3.5 transition-all text-xs tracking-wider cursor-pointer">
        Projects
      </button>

      <button @click="scrollToSection('contact-block')"
        class="w-auto md:w-20 border-2 border-transparent hover:border-black hover:bg-brutal-green py-1 px-2.5 md:py-1.5 md:px-3.5 transition-all tracking-wider text-xs cursor-pointer">
        Contact
      </button>
    </nav>

    <BrutalButton type="button" bg-class="bg-primary text-black hidden md:block"
      @click="scrollToSection('contact-block')">
      Let's Talk
    </BrutalButton>
  </header>
</template>