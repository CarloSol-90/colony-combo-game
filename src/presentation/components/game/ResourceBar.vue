<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import batteryGame from '@/assets/battery-game.png'
import scrapGame from '@/assets/scrap-game-transparent.png'

interface ResourceBarProps {
  scrap: number
  batteries: number
  turn: number
  totalTurns: number
}

defineProps<ResourceBarProps>()

const { t } = useI18n()
</script>

<template>
  <section class="game-resource-row grid shrink-0 grid-cols-3 gap-1.5">
    <div class="game-resource-card flex items-center gap-0.5 rounded-md border border-amber-300/20 bg-stone-950/35 px-1.5 py-0 shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px]">
      <img
        class="game-resource-icon h-14 w-14 object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.78)]"
        :src="scrapGame"
        :alt="t('resources.scrap')"
      />
      <div>
        <p class="text-[0.62rem] uppercase tracking-[0.14em] text-amber-100/75">{{ t('resources.scrap') }}</p>
        <p class="font-mono text-xl font-black leading-none text-amber-200">{{ scrap }}</p>
      </div>
    </div>

    <div class="game-resource-card flex items-center gap-0.5 rounded-md border border-sky-300/20 bg-stone-950/35 px-1.5 py-0 shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px]">
      <img
        class="game-resource-icon h-14 w-14 object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.78)]"
        :src="batteryGame"
        :alt="t('resources.batteries')"
      />
      <div>
        <p class="text-[0.62rem] uppercase tracking-[0.14em] text-sky-100/75">{{ t('resources.batteries') }}</p>
        <p class="font-mono text-xl font-black leading-none text-sky-200">{{ batteries }}</p>
      </div>
    </div>

    <div class="game-turn-card grid place-items-center rounded-md border border-teal-300/20 bg-stone-950/35 px-1.5 py-0 text-center shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px]">
      <div>
        <p class="text-[0.56rem] uppercase tracking-[0.14em] text-teal-100/80">{{ t('turn.label') }}</p>
        <p class="font-mono text-xl font-black leading-none text-teal-200">{{ turn }}/{{ totalTurns }}</p>
      </div>
    </div>
  </section>
</template>
