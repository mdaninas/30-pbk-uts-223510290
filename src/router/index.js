import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
  path: '/todos',
  name: 'todo',
  component: () => import('../views/Todo.vue')
},
{
  path: '/posts',
  name: 'post',
  component: () => import('../views/Post.vue')
},
    {
  path: '/albums',
  name: 'albums',
  component: () => import('../views/Album.vue')
}

  ]
})

export default router
