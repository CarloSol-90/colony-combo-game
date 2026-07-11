<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import batteryGame from '@/assets/battery-game.png'
import hamburgerGame from '@/assets/hamburger-game-transparent.png'
import scrapGame from '@/assets/scrap-game-transparent.png'
import statisticsGame from '@/assets/statistics-game-transparent.png'

interface GameHeaderProps {
  scrap: number
  batteries: number
  turn: number
  totalTurns: number
}

defineProps<GameHeaderProps>()

const { t } = useI18n()

defineEmits<{
  openSettings: []
  openStatistics: []
}>()
</script>

<template>
  <header class="game-header grid shrink-0 grid-cols-[3rem_1fr_3rem] items-center gap-1 rounded-md bg-transparent px-0 py-0">
    <button
      class="game-header-button grid h-11 w-12 place-items-center transition hover:scale-105"
      type="button"
      :aria-label="t('settings.label')"
      @click="$emit('openSettings')"
    >
      <img
        class="h-14 w-14 object-contain brightness-110 drop-shadow-[0_3px_7px_rgba(0,0,0,0.85)]"
        :src="hamburgerGame"
        :alt="t('settings.label')"
      />
    </button>

    <section class="game-resource-row flex min-w-0 translate-y-0.5 items-center justify-end gap-1">
      <div class="game-resource-card flex h-7 min-w-[3.25rem] items-center justify-center gap-0 rounded-md bg-stone-950/35 px-2.5 py-0 shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px]">
        <img
          class="game-resource-icon h-8 w-8 object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.78)]"
          :src="scrapGame"
          :alt="t('resources.scrap')"
        />
        <p class="-ml-1.5 font-mono text-lg font-black leading-none text-amber-200">{{ scrap }}</p>
      </div>

      <div class="game-resource-card flex h-7 w-10 items-center justify-center gap-0 rounded-md bg-stone-950/35 pr-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px]">
        <img
          class="game-resource-icon h-8 w-8 object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.78)]"
          :src="batteryGame"
          :alt="t('resources.batteries')"
        />
        <p class="-ml-1.5 font-mono text-lg font-black leading-none text-sky-200">{{ batteries }}</p>
      </div>

      <div class="game-turn-card grid h-7 w-10 place-items-center rounded-md bg-stone-950/35 px-1.5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px]">
        <p class="font-mono text-base font-black leading-none text-teal-200">{{ turn }}/{{ totalTurns }}</p>
      </div>
    </section>

    <button
      class="game-statistics-button grid h-11 w-12 place-items-center transition hover:scale-105"
      type="button"
      :aria-label="t('statistics.label')"
      @click="$emit('openStatistics')"
    >
      <img
        class="game-statistics-icon h-14 w-14 object-contain brightness-125 drop-shadow-[0_3px_7px_rgba(0,0,0,0.85)]"
        :src="statisticsGame"
        :alt="t('statistics.label')"
      />
    </button>
  </header>
</template>
