import { createRouter, createWebHistory } from 'vue-router'
import WelcomeScreen from '../views/WelcomeScreen.vue'
import GameScreen from '../views/GameScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WewlcomeScreen',
      component: WelcomeScreen
    },
    {
      path: '/game',
      name: 'GameScreen',
      component: GameScreen
    }
  ]
})

export default router
