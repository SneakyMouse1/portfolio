<script setup>
import { ref } from "vue";
import BrutalInput from "@/components/ui/Inputs/BrutalInput.vue";
import BrutalSelect from "@/components/ui/Inputs/BrutalSelect.vue";
import BrutalTextarea from "@/components/ui/Inputs/BrutalTextarea.vue";
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { AkTelegramFill, AkWhatsappFill } from '@kalimahapps/vue-icons';

const formData = ref({
  name: "",
  email: "",
  serviceType: "",
  message: "",
  acceptTerms: false,
});

const isSubmitting = ref(false);
const submitStatus = ref(null); // 'success' | 'error' | null

const serviceOptions = [
  "Full-Stack Web Application",
  "UI/UX Design System",
  "Database Schema & API Development",
  "Continuous Integration / Consultation",
];

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = null;

  const turnstileToken = document.querySelector('[name="cf-turnstile-response"]')?.value;

  if (!turnstileToken) {
    submitStatus.value = 'error';
    isSubmitting.value = false;
    return;
  }

  try {
    const response = await fetch('/api/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        serviceType: formData.value.serviceType,
        message: formData.value.message,
        turnstileToken: turnstileToken,
      }),
    });

    if (response.ok) {
      submitStatus.value = 'success';
      formData.value = {
        name: "",
        email: "",
        serviceType: "",
        message: "",
        acceptTerms: false,
      };
    } else {
      submitStatus.value = 'error';
    }

  } catch (e) {
    console.error('Contact form submission failed:', e);
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact-block"
    class="bg-white border-4 border-black shadow-md max-w-7xl mx-auto my-12 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch gap-8 ">

    <!-- CONTACT INFO -->
    <div class="md:w-5/12 flex flex-col justify-between gap-6">
      <div>
        <span
          class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-3">
          CONTACT
        </span>
        <h2 class="text-3xl sm:text-4xl font-display uppercase text-black leading-none mb-4 tracking-wide">
          LET'S BUILD SOMETHING TOGETHER.
        </h2>
        <p class="text-xs font-mono font-bold text-stone-700 leading-relaxed mb-6">
          I am a junior web developer focused on building clean, well-structured web applications using Laravel and
          Vue.js. Currently based in Alicante, Spain, I am highly motivated to join a development team, learn from
          experienced specialists, and contribute to real-world projects. Drop me a line here or catch me via instant
          channels.
        </p>

        <!-- INSTANT CHANNELS -->
        <div class="flex flex-col gap-3 font-mono text-xs font-black uppercase">

          <a href="https://wa.me/34663737463" target="_blank" rel="noreferrer"
            class="flex items-center justify-between bg-brutal-green hover:bg-black hover:text-white border-2 border-black p-3.5 shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <span class="flex items-center gap-2">
              <AkWhatsappFill class="w-5 h-5" />
              WHATSAPP: +34 663 737 463
            </span>
            <span class="font-bold text-[10px] bg-white text-black px-1.5 border border-black">PING</span>
          </a>

          <a href="https://t.me/sneaky_mouse" target="_blank" rel="noreferrer"
            class="flex items-center justify-between bg-brutal-blue hover:bg-black hover:text-white border-2 border-black p-3.5 shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <span class="flex items-center gap-2">
              <AkTelegramFill class="w-5 h-5" />
              TELEGRAM: @sneaky_mouse
            </span>
            <span class="font-bold text-[10px] bg-white text-black px-1.5 border border-black">CHAT</span>
          </a>

        </div>
      </div>

      <div class="bg-stone-50 border-2 border-black p-3 font-mono text-[9px] uppercase font-bold text-stone-600">
        ● ALL INQUIRIES GO STRAIGHT TO MY INBOX. I WILL RESPOND TO YOUR MESSAGE WITHIN 24 HOURS.
      </div>
    </div>

    <!-- CONTACT FORM -->
    <div class="md:w-7/12 bg-[#f4f4f0] border-4 border-black p-5 md:p-6 shadow-sm flex flex-col justify-between">
      <form @submit.prevent="handleSubmit" class="space-y-4">

        <div class="border-b-2 border-black/40 pb-2 mb-3">
          <span class="font-mono text-xs font-black text-stone-600 block uppercase">
            SEND A MESSAGE:
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BrutalInput v-model="formData.name" label="Name:" placeholder="E.g. John Doe" required />
          <BrutalInput v-model="formData.email" type="email" label="Email Address:" placeholder="example@domain.com"
            required />
        </div>

        <BrutalSelect v-model="formData.serviceType" label="Project Type / Interest:" :options="serviceOptions"
          placeholder="Select option..." required />

        <BrutalTextarea v-model="formData.message" label="Message Details:"
          placeholder="Describe your project, offer, or any details you'd like to share..." required />

        <div class="flex items-center gap-4 pt-2 select-none">
          <div class="brutal-checkbox">
            <input id="terms-checkbox" type="checkbox" v-model="formData.acceptTerms" required />
            <span class="brutal-checkbox-tick">✓</span>
          </div>

          <label for="terms-checkbox"
            class="font-mono text-[11px] font-bold text-stone-700 leading-tight cursor-pointer">
            I AGREE TO HAVE MY CONTACT INFO PROCESSED FOR COMMUNICATION PURPOSES.
          </label>
        </div>

        <!-- STATUS MESSAGES -->
        <div v-if="submitStatus === 'success'"
          class="font-mono text-xs font-bold uppercase bg-brutal-green border-2 border-black p-3 shadow-sm">
          ✓ MESSAGE SENT — I'LL GET BACK TO YOU SOON.
        </div>
        <div v-if="submitStatus === 'error'"
          class="font-mono text-xs font-bold uppercase text-white bg-brutal-red border-2 border-black p-3 shadow-sm">
          ✕ SOMETHING WENT WRONG — PLEASE TRY AGAIN OR USE WHATSAPP/TELEGRAM.
        </div>

        <div class="cf-turnstile" data-sitekey="0x4AAAAAADrcANSnd95aZSy_"></div>

        <BrutalButton type="submit" :disabled="isSubmitting"
          bg-class="bg-black text-white shadow-primary w-full block text-center mt-2">
          {{ isSubmitting ? 'SENDING MESSAGE...' : '➔ DISPATCH FORM' }}
        </BrutalButton>
      </form>
    </div>

  </section>
</template>

<style scoped>
/* Brutal checkbox */
.brutal-checkbox {
  position: relative;
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: 4px solid #000;
  background-color: #fff;
  box-shadow: 2px 2px 0px 0px #FF8AE2;
}

/* Hidden native input layer */
.brutal-checkbox input[type="checkbox"] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

/* Unicode character styling */
.brutal-checkbox .brutal-checkbox-tick {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 900;
  color: #000;
  opacity: 0;
  transition: opacity 0.1s ease;
  z-index: 1;
}

/* Conditional background toggle */
.brutal-checkbox:has(input:checked) {
  background-color: #FFDE4D;
}

/* Visibility status transition */
.brutal-checkbox input:checked+.brutal-checkbox-tick {
  opacity: 1;
}
</style>