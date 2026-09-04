import { ref, computed } from 'vue';
import en from '@/locales/en.js';
import es from '@/locales/es.js';

const messages = { en, es };

let routerInstance = null;

export function registerI18nRouter(router) {
  routerInstance = router;
}

// Detect initial language from current URL pathname or fallback
const getInitialLang = () => {
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/es')) {
      return 'es';
    }
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    if (queryLang === 'es') return 'es';
  }
  return 'en';
};

const currentLang = ref(getInitialLang());

export const updateDOMMeta = (lang) => {
  if (typeof document === 'undefined') return;

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update Title & Meta Description
  const localizedSeo = messages[lang]?.seo;
  if (localizedSeo) {
    document.title = localizedSeo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', localizedSeo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', localizedSeo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', localizedSeo.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', localizedSeo.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', localizedSeo.description);
  }
};

export function setLangInternal(lang, navigate = true) {
  if (!['en', 'es'].includes(lang)) return;
  currentLang.value = lang;

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('portfolio_lang', lang);
  }

  updateDOMMeta(lang);

  if (navigate && routerInstance) {
    const currentPath = routerInstance.currentRoute.value.path;
    const currentHash = routerInstance.currentRoute.value.hash || '';

    // Never modify admin route paths
    if (currentPath.startsWith('/admin')) return;

    let targetPath = currentPath;
    if (lang === 'es' && !currentPath.startsWith('/es')) {
      targetPath = currentPath === '/' ? '/es' : `/es${currentPath}`;
    } else if (lang === 'en' && currentPath.startsWith('/es')) {
      targetPath = currentPath.replace(/^\/es(\/|$)/, '$1') || '/';
    }

    if (targetPath !== currentPath) {
      routerInstance.replace({ path: targetPath, hash: currentHash });
    }
  }
}

export function useI18n() {
  const setLang = (lang) => {
    setLangInternal(lang, true);
  };

  /**
   * Helper to fetch static string from current language dictionary
   */
  const t = (path) => {
    const keys = path.split('.');
    let current = messages[currentLang.value];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = messages.en;
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  /**
   * Airtable dynamic field resolver with automatic Spanish fallback
   * e.g. getLocalizedField(project, 'Category') -> checks 'Category ES', falls back to 'Category'
   */
  const getLocalizedField = (record, field) => {
    if (!record) return '';

    if (currentLang.value === 'es') {
      const esValue = record[`${field} ES`] || record[`${field}_ES`] || record[`${field} es`];
      if (esValue && String(esValue).trim() !== '') {
        return esValue;
      }
    }

    return record[field] || '';
  };

  /**
   * Helper to prefix internal route paths with /es when currentLang is 'es'
   */
  const localePath = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/admin')) return path;

    const isSpanish = currentLang.value === 'es';
    const normalizedPath = path.startsWith('/es')
      ? (path.replace(/^\/es(\/|$)/, '$1') || '/')
      : path;

    if (isSpanish) {
      if (normalizedPath === '/') return '/es';
      if (normalizedPath.startsWith('/#')) return `/es${normalizedPath.slice(1)}`;
      if (normalizedPath.startsWith('#')) return `/es#${normalizedPath.slice(1)}`;
      return `/es${normalizedPath.startsWith('/') ? '' : '/'}${normalizedPath}`;
    } else {
      return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    }
  };

  return {
    currentLang: computed(() => currentLang.value),
    setLang,
    t,
    getLocalizedField,
    localePath,
  };
}

// Initial DOM sync
if (typeof window !== 'undefined') {
  updateDOMMeta(currentLang.value);
}
