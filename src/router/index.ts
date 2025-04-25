import { createRouter, createWebHistory } from 'vue-router'
import JarList from '@/views/JarList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: JarList,
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddJar.vue'),
    },
  ],
})

export default router
