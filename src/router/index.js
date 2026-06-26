import { createWebHistory, createRouter } from 'vue-router'

import HomeView from "@/views/HomeView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";
import AdminLoginView from "@/views/AdminLoginView.vue";
import AdminProjectFormView from "@/views/AdminProjectFormView.vue";


const routes = [
    { path: '/', component: HomeView },
    { path: '/admin', component: AdminDashboardView },
    { path: '/admin/login', component: AdminLoginView },
    { path: '/admin/project/new', component: AdminProjectFormView },
    { path: '/admin/project/:id', component: AdminProjectFormView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !localStorage.getItem('admin_token')) {
        return '/admin/login'
    }
})

export default router