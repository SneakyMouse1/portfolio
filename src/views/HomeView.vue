<script setup>
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import PortfolioSection from "@/components/sections/PortfolioSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import FooterGlobal from "@/components/global/FooterGlobal.vue";
import HeaderGlobal from "@/components/global/HeaderGlobal.vue";
import DotGrid from "@/components/ui/DotGrid/DotGrid.vue";
import MarqueeTicker from "@/components/ui/MarqueeTicker.vue";
</script>

<template>
  <HeaderGlobal />

  <div class="relative w-full bg-background">

    <div class="absolute inset-0 z-0">
      <DotGrid
          :dot-size="5"
          :gap="15"
          base-color="#E2DFD5"
          active-color="#FE6A36"
          :proximity="120"
          :speed-trigger="80"
          class="w-full h-full"
      />
    </div>

    <div class="relative z-10 flex flex-col min-h-screen pt-24 md:pt-28">
      <HeroSection />
    </div>
  </div>

  <!-- MARQUEE TICKER (BETWEEN HERO & ABOUT) -->
  <MarqueeTicker />

  <main>
    <AboutSection />
    <PortfolioSection />
    <ContactSection />
  </main>

  <FooterGlobal />
</template>

<style scoped>
</style>