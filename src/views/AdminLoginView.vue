<script setup>
import { ref } from "vue";
import BrutalInput from "@/components/ui/Inputs/BrutalInput.vue";
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { BxSolidError } from "@kalimahapps/vue-icons";

import { useRouter } from "vue-router";

const username = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const router = useRouter()

async function handleLogin() {

  if (!username.value) {
    error.value = "Username is required"
    return
  } else if (!password.value) {
    error.value = "Password is required"
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/auth/login',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      error.value = data.error
      return
    }

    localStorage.setItem("admin_token", data.token)
    await router.push('/admin')

  } catch (e) {
    error.value = "Error occured"
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">

    <!-- GRID LINES -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none"
         style="background-image: linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="mb-4 flex justify-center">
        <span class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block">
          ACCESS_CONTROL //
        </span>
      </div>

      <!-- LOGIN -->
      <div class="bg-white border-4 border-black shadow-xl p-8 relative">

        <!-- Corner accent -->
        <div class="absolute -top-3 -left-3 w-6 h-6 bg-primary border-2 border-black"></div>

        <h1 class="font-display text-4xl uppercase text-black mb-1 tracking-wide">
          Admin Login
        </h1>
        <p class="font-mono text-xs text-stone-500 mb-6 uppercase">
          Restricted area // authorized personnel only
        </p>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">

          <BrutalInput
              v-model="username"
              label="Username"
              type="text"
              placeholder="enter username"
              required
          />

          <BrutalInput
              v-model="password"
              label="Password"
              type="password"
              placeholder="enter password"
              required
          />

          <!-- ERROR -->
          <div v-if="error"
               class="font-mono text-xs text-brutal-white bg-brutal-red border-2 border-black p-3 shadow-sm font-bold uppercase flex items-center gap-2">
            <BxSolidError />
            {{ error }}
          </div>

          <BrutalButton
              type="submit"
              bg-class="bg-primary text-black mt-2"
              :class="{ 'opacity-60 pointer-events-none': loading }"
          >
            {{ loading ? 'Authenticating...' : 'Sign In' }}
          </BrutalButton>

        </form>

      </div>

      <!-- NOTE -->
      <p class="font-mono text-[11px] text-stone-500 text-center mt-4 uppercase">
        smyslov.dev // dashboard v1.0
      </p>

    </div>
  </div>
</template>

<style scoped>
</style>