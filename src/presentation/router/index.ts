import type { RouteRecordRaw } from 'vue-router'
import GameView from '@/presentation/views/GameView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'game',
    component: GameView,
  },
]