import { createWebHistory, createRouter } from 'vue-router'

import HomeView from "@/views/HomeView.vue";
import ProjectView from "@/views/ProjectView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";
import AdminLoginView from "@/views/AdminLoginView.vue";
import AdminProjectFormView from "@/views/AdminProjectFormView.vue";
import { registerI18nRouter, setLangInternal } from "@/composables/useI18n.js";

const routes = [
  // English
  { path: '/', name: 'home-en', component: HomeView },
  { path: '/project/:id', name: 'project-en', component: ProjectView },

  // Spanish
  { path: '/es', name: 'home-es', component: HomeView },
  { path: '/es/project/:id', name: 'project-es', component: ProjectView },

  // Admin
  { path: '/admin', component: AdminDashboardView },
  { path: '/admin/login', component: AdminLoginView },
  { path: '/admin/project/new', component: AdminProjectFormView },
  { path: '/admin/project/:id', component: AdminProjectFormView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Register router with i18n
registerI18nRouter(router);

router.beforeEach((to, from) => {
  // Admin protection
  if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !localStorage.getItem('admin_token')) {
    return '/admin/login'
  }

  // Redirect ?lang=es parameter to /es
  if (to.query.lang === 'es' && !to.path.startsWith('/es')) {
    const cleanQuery = { ...to.query };
    delete cleanQuery.lang;
    const targetPath = to.path === '/' ? '/es' : `/es${to.path}`;
    return { path: targetPath, query: cleanQuery, hash: to.hash };
  }

  // Sync language state
  if (to.path.startsWith('/es')) {
    setLangInternal('es', false);
  } else if (!to.path.startsWith('/admin')) {
    setLangInternal('en', false);
  }
})

export default router