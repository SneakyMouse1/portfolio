<script setup>
import BrutalButton from "@/components/ui/BrutalButton.vue";

</script>

<template>
  <div
    class="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4 gap-6 pointer-events-none pb-24">

    <div class="select-none">
      <div class="name-label font-mono text-md md:text-lg uppercase tracking-widest font-black mb-1">Semyon Smyslov
      </div>
      <h1 class="text-6xl md:text-8xl font-display uppercase tracking-wide">DEVELOPER</h1>
    </div>

    <p class="font-mono text-base md:text-lg max-w-2xl text-black font-medium select-none">
      Junior web developer with experience in graphic and web design — I create clean and high-performing web solutions.
      I live in Alicante, Spain.
    </p>

    <div class="pointer-events-auto mt-2">
      <!-- Test: Convert btn to <a> tag based on presence of prop href -->
      <BrutalButton bg-class="bg-brutal-orange text-white" href='#portfolio-block'>
        Explore Projects
      </BrutalButton>
    </div>

  </div>
</template>

<style scoped>
.name-label {
  color: var(--color-brutal-orange, #FF6B00);
  text-shadow: 1px 2px 0px rgba(0, 0, 0, 0.55);
}
</style>