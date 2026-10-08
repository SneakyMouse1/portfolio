<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import BrutalInput from "@/components/ui/Inputs/BrutalInput.vue";
import BrutalSelect from "@/components/ui/Inputs/BrutalSelect.vue";
import BrutalTextarea from "@/components/ui/Inputs/BrutalTextarea.vue";
import BrutalButton from "@/components/ui/BrutalButton.vue";
import { AkTelegramFill, AkWhatsappFill } from '@kalimahapps/vue-icons';
import { useI18n } from "@/composables/useI18n.js";

const { t } = useI18n();

const formData = ref({
  name: "",
  email: "",
  serviceType: "",
  message: "",
  acceptTerms: false,
});

const isSubmitting = ref(false);
const submitStatus = ref(null); // null | 'success' | 'error'
const turnstileToken = ref(null);
let turnstileWidgetId = null;
let turnstilePollTimer = null;

const serviceOptions = computed(() => {
  const list = t('contact.serviceOptions');
  return Array.isArray(list) ? list : [];
});

onMounted(() => {
  if (window.turnstile) {
    renderTurnstile();
    return;
  }

  // Wait for Turnstile script to load
  turnstilePollTimer = setInterval(() => {
    if (window.turnstile) {
      clearInterval(turnstilePollTimer);
      turnstilePollTimer = null;
      renderTurnstile();
    }
  }, 100);

  // Stop polling after 10 seconds
  setTimeout(() => {
    if (turnstilePollTimer) {
      clearInterval(turnstilePollTimer);
      turnstilePollTimer = null;
    }
  }, 10000);
});

onBeforeUnmount(() => {
  if (turnstilePollTimer) {
    clearInterval(turnstilePollTimer);
    turnstilePollTimer = null;
  }
  if (turnstileWidgetId !== null && window.turnstile) {
    try {
      window.turnstile.remove(turnstileWidgetId);
    } catch (e) {
      console.warn('[ContactForm] Error removing Turnstile widget:', e);
    }
    turnstileWidgetId = null;
  }
});

const renderTurnstile = () => {
  const container = document.getElementById('cf-turnstile-container');
  if (!container || !window.turnstile) return;

  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAADrcANSnd95aZSy_';
  if (!sitekey) {
    console.error('[ContactForm] Missing Turnstile sitekey');
    return;
  }

  if (turnstileWidgetId !== null) return;

  try {
    turnstileWidgetId = window.turnstile.render(container, {
      sitekey,
      theme: 'light',
      callback: (token) => {
        turnstileToken.value = token;
      },
      'expired-callback': () => {
        turnstileToken.value = null;
      },
      'error-callback': () => {
        turnstileToken.value = null;
      },
    });
  } catch (err) {
    console.error('[ContactForm] Failed to render Turnstile:', err);
  }
};

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message || !formData.value.acceptTerms) {
    return;
  }

  if (!turnstileToken.value) {
    console.warn('[ContactForm] Turnstile token missing. Please complete verification.');
    submitStatus.value = 'error';
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        serviceType: formData.value.serviceType,
        message: formData.value.message,
        turnstileToken: turnstileToken.value,
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
      turnstileToken.value = null;
      if (turnstileWidgetId !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
    } else {
      const errData = await response.json().catch(() => ({}));
      console.error('[ContactForm] Server error:', response.status, errData);
      submitStatus.value = 'error';
      turnstileToken.value = null;
      if (turnstileWidgetId !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
    }

  } catch (e) {
    console.error('[ContactForm] Submission failed:', e);
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section id="contact-block"
    class="bg-white border-4 border-black shadow-md max-w-7xl mx-auto my-12 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch gap-8 scroll-mt-20 md:scroll-mt-40">

    <!-- CONTACT INFO -->
    <div class="md:w-5/12 flex flex-col justify-between gap-6">
      <div>
        <span
          class="font-mono text-xs uppercase font-extrabold text-stone-600 bg-stone-100 border-2 border-black px-2 py-0.5 inline-block mb-3">
          {{ t('contact.tag') }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-display uppercase text-black leading-none mb-4 tracking-wide">
          {{ t('contact.heading') }}
        </h2>
        <p class="text-xs font-mono font-bold text-stone-700 leading-relaxed mb-6">
          {{ t('contact.bio') }}
        </p>

        <!-- INSTANT CHANNELS -->
        <div class="flex flex-col gap-3 font-mono text-xs font-black uppercase">

          <a href="https://wa.me/34663737463" target="_blank" rel="noreferrer"
            class="flex items-center justify-between bg-brutal-green hover:bg-black hover:text-white border-2 border-black p-3.5 shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <span class="flex items-center gap-2">
              <AkWhatsappFill class="w-5 h-5" />
              WHATSAPP: +34 663 737 463
            </span>
            <span class="font-bold text-[10px] bg-white text-black px-1.5 border border-black">PING</span>
          </a>

          <a href="https://t.me/sneaky_mouse" target="_blank" rel="noreferrer"
            class="flex items-center justify-between bg-brutal-blue hover:bg-black hover:text-white border-2 border-black p-3.5 shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
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
            SEND A MESSAGE //
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BrutalInput v-model="formData.name" :label="t('contact.nameLabel')"
            :placeholder="t('contact.namePlaceholder')" required />
          <BrutalInput v-model="formData.email" type="email" :label="t('contact.emailLabel')"
            :placeholder="t('contact.emailPlaceholder')" required />
        </div>

        <BrutalSelect v-model="formData.serviceType" :label="t('contact.serviceLabel')" :options="serviceOptions"
          :placeholder="t('contact.servicePlaceholder')" required />

        <BrutalTextarea v-model="formData.message" :label="t('contact.messageLabel')"
          :placeholder="t('contact.messagePlaceholder')" required />

        <div class="flex items-center gap-4 pt-2 select-none">
          <div class="brutal-checkbox">
            <input id="terms-checkbox" type="checkbox" v-model="formData.acceptTerms" required />
            <span class="brutal-checkbox-tick">✓</span>
          </div>

          <label for="terms-checkbox"
            class="font-mono text-[11px] font-bold text-stone-700 leading-tight cursor-pointer uppercase">
            {{ t('contact.termsText') }}
          </label>
        </div>

        <!-- STATUS MESSAGES -->
        <div v-if="submitStatus === 'success'"
          class="font-mono text-xs font-bold uppercase bg-brutal-green border-2 border-black p-3 shadow-sm">
          ✓ {{ t('contact.successTitle') }} — {{ t('contact.successDesc') }}
        </div>
        <div v-if="submitStatus === 'error'"
          class="font-mono text-xs font-bold uppercase text-white bg-brutal-red border-2 border-black p-3 shadow-sm">
          ✕ {{ t('contact.errorTitle') }} — {{ t('contact.errorDesc') }}
        </div>

        <div id="cf-turnstile-container" class="min-h-[65px] my-2"></div>

        <BrutalButton type="submit" :disabled="isSubmitting"
          bg-class="bg-black text-white shadow-primary w-full block text-center mt-2">
          {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
        </BrutalButton>

      </form>
    </div>

  </section>
</template>

<style scoped>
.brutal-checkbox {
  position: relative;
  width: 24px;
  height: 24px;
  min-width: 24px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 2px 2px 0px 0px #000;
  cursor: pointer;
}

.brutal-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
  z-index: 10;
  margin: 0;
}

.brutal-checkbox-tick {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  font-weight: 900;
  font-size: 16px;
  line-height: 1;
  color: #000;
}

.brutal-checkbox input:checked~.brutal-checkbox-tick {
  display: block;
}

.brutal-checkbox:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px 0px #000;
}
</style>