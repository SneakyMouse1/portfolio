<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { useScrollTo } from "@/composables/useScrollTo.js";
import { useI18n } from "@/composables/useI18n.js";

const route = useRoute();
const { scrollToSection } = useScrollTo();
const { currentLang, setLang, t, localePath } = useI18n();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 25;
};

const handleNavClick = (sectionId) => {
  isMobileMenuOpen.value = false;
  scrollToSection(sectionId);
};

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false;
});

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="fixed z-50 transition-all duration-300 ease-out left-0 right-0 max-w-7xl mx-auto w-full md:w-[calc(100%-2rem)] xl:w-full"
    :class="[
      isScrolled
        ? 'top-0 bg-white/95 backdrop-blur-sm border-b-4 md:border-x-4 md:border-b-4 md:border-t-0 border-black shadow-md py-2 px-3 sm:px-4 md:py-2.5 md:px-6'
        : 'top-0 md:top-4 bg-white border-b-4 md:border-4 border-black shadow-sm md:shadow-md py-2.5 px-3 sm:px-4 md:py-5 md:px-6'
    ]"
  >
    <div class="w-full flex flex-row justify-between items-center gap-2 md:gap-4">
      <RouterLink :to="localePath('/')" @click="isMobileMenuOpen = false" class="flex items-center gap-2 md:gap-3 group">
        <div
          class="bg-black text-white font-display uppercase tracking-wider transition-all duration-200 border-2 border-black inline-block select-none group-hover:bg-primary group-hover:text-black"
          :class="isScrolled ? 'text-base md:text-xl py-1 px-2.5 md:py-1.5 md:px-4' : 'text-base sm:text-lg md:text-2xl py-1 px-2.5 sm:py-1.5 sm:px-3 md:py-2 md:px-5'"
        >
          SMYSLOV.DEV
        </div>
        <div
          class="hidden sm:inline-block whitespace-nowrap bg-primary border-2 border-black font-mono font-bold uppercase text-black transition-all duration-200"
          :class="isScrolled ? 'py-0.5 px-2.5 text-[11px]' : 'py-1 px-3 text-xs'"
        >
          {{ t('nav.location') }}
        </div>
      </RouterLink>

      <!-- DESKTOP NAVIGATION -->
      <nav class="hidden md:flex items-center gap-1 md:gap-2 font-bold uppercase font-mono text-xs">
        <button
          @click="scrollToSection('about-block')"
          class="whitespace-nowrap border-2 border-transparent hover:border-black hover:bg-primary py-1 px-2.5 md:py-1.5 md:px-3.5 transition-all tracking-wider cursor-pointer select-none text-center"
        >
          {{ t('nav.about') }}
        </button>

        <button
          @click="scrollToSection('portfolio-block')"
          class="whitespace-nowrap border-2 border-transparent hover:border-black hover:bg-primary py-1 px-2.5 md:py-1.5 md:px-3.5 transition-all tracking-wider cursor-pointer select-none text-center"
        >
          {{ t('nav.projects') }}
        </button>

        <button
          @click="scrollToSection('contact-block')"
          class="whitespace-nowrap border-2 border-transparent hover:border-black hover:bg-brutal-green py-1 px-2.5 md:py-1.5 md:px-3.5 transition-all tracking-wider cursor-pointer select-none text-center"
        >
          {{ t('nav.contact') }}
        </button>
      </nav>

      <!-- RIGHT SIDE: LANGUAGE SWITCHER + DESKTOP ACTION BUTTON / MOBILE BURGER -->
      <div class="flex items-center gap-2 md:gap-3">
        <!-- BRUTALIST LANGUAGE SWITCHER -->
        <div class="flex items-center border-2 border-black bg-stone-100 font-mono text-xs font-black shadow-sm overflow-hidden select-none">
          <button
            @click="setLang('en')"
            type="button"
            class="px-2 py-1 transition-all cursor-pointer font-bold"
            :class="currentLang === 'en' ? 'bg-black text-white' : 'text-stone-600 hover:bg-stone-200'"
            title="English version"
          >
            EN
          </button>
          <div class="w-[2px] h-4 bg-black"></div>
          <button
            @click="setLang('es')"
            type="button"
            class="px-2 py-1 transition-all cursor-pointer font-bold"
            :class="currentLang === 'es' ? 'bg-primary text-black' : 'text-stone-600 hover:bg-stone-200'"
            title="Versión en Español"
          >
            ES
          </button>
        </div>

        <!-- DESKTOP LET'S TALK BUTTON -->
        <div class="hidden md:block">
          <BrutalButton
            type="button"
            bg-class="bg-primary text-black transition-all whitespace-nowrap"
            :class="isScrolled ? 'text-xs py-1.5 px-3.5' : 'text-sm py-2 px-5'"
            @click="scrollToSection('contact-block')"
          >
            {{ t('nav.letsTalk') }}
          </BrutalButton>
        </div>

        <!-- MOBILE BURGER BUTTON -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          type="button"
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 border-2 border-black bg-white hover:bg-primary transition-colors cursor-pointer shadow-sm select-none p-1"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="w-4 h-4 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="square"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            v-else
            class="w-4 h-4 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="square"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- MOBILE DROPDOWN MENU -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden mt-2.5 pt-2.5 border-t-2 border-black flex flex-col gap-2 font-mono text-xs font-bold uppercase select-none"
      >
        <button
          @click="handleNavClick('about-block')"
          class="w-full text-left py-2 px-3 border-2 border-black bg-white hover:bg-primary transition-colors cursor-pointer shadow-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          {{ t('nav.about') }}
        </button>
        <button
          @click="handleNavClick('portfolio-block')"
          class="w-full text-left py-2 px-3 border-2 border-black bg-white hover:bg-primary transition-colors cursor-pointer shadow-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          {{ t('nav.projects') }}
        </button>
        <button
          @click="handleNavClick('contact-block')"
          class="w-full text-left py-2 px-3 border-2 border-black bg-white hover:bg-brutal-green transition-colors cursor-pointer shadow-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          {{ t('nav.contact') }}
        </button>
        <button
          @click="handleNavClick('contact-block')"
          class="w-full text-center py-2 px-3 border-2 border-black bg-primary text-black hover:bg-primary-hover transition-colors cursor-pointer shadow-sm font-black mt-1 active:translate-x-0.5 active:translate-y-0.5"
        >
          {{ t('nav.letsTalk') }}
        </button>
      </div>
    </transition>
  </header>
</template>