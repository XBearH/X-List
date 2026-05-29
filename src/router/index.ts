//路由配置
import { createRouter, createWebHistory } from 'vue-router'
import Today from '../views/Today.vue'

const routes = [
    { path: '/', name: 'Today', component: Today },
    { path: '/history', name: 'History', component: () => 
        import('../views/History.vue') },
    { path: '/settings', name: 'Settings', component: () =>
        import('../views/Settings.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router