<script setup>
import { computed } from 'vue';

// Dynamic year helper
const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="max-w-7xl mx-auto border-t-4 border-b-brutal-black pt-6 pb-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-600 font-bold text-xs select-none px-4">

    <div class="flex items-center gap-3">
      <span class="font-mono text-brutal-black uppercase">
        © {{ currentYear }} <a href="/" class="hover:text-brutal-orange">SMYSLOV.DEV</a>
      </span>
      <span class="hidden sm:inline-block border border-stone-300 h-4"></span>
      <span class="font-sans text-stone-500">
        All design systems configured within Neo-Brutalist parameters.
      </span>
    </div>

    <div class="flex gap-4 font-mono text-stone-900 uppercase">
      <a
          href="https://github.com/SneakyMouse1"
          target="_blank"
          rel="noreferrer"
          class="hover:text-brutal-pink transition-colors border-b-2 border-transparent hover:border-b-brutal-pink"
      >
        GitHub
      </a>
      <a
          href="https://www.linkedin.com/in/semyonsmyslov/"
          target="_blank"
          rel="noreferrer"
          class="hover:text-brutal-blue transition-colors border-b-2 border-transparent hover:border-b-brutal-blue"
      >
        LinkedIn
      </a>
    </div>

  </footer>
</template>