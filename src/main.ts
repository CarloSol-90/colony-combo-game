import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import { routes } from '@/presentation/router'
import { messages } from '@/i18n'

const router = createRouter({
	history: createWebHistory(),
	routes,
})

const i18n = createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages,
})

createApp(App).use(createPinia()).use(router).use(i18n).mount('#app')
