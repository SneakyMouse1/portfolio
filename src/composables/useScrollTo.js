import { useRouter, useRoute } from 'vue-router';
import { useI18n } from '@/composables/useI18n.js';

export function useScrollTo() {
  const router = useRouter();
  const route = useRoute();
  const { currentLang } = useI18n();

  const scrollToSection = async (id) => {
    const isSpanish = currentLang.value === 'es' || (route?.path && route.path.startsWith('/es'));
    const homePath = isSpanish ? '/es' : '/';

    if (route && route.path !== homePath) {
      await router.push({ path: homePath, hash: `#${id}` });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollToSection };
}
