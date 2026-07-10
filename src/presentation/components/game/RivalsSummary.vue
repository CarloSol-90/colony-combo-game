<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import batteryGame from '@/assets/battery-game.png'
import scrapGame from '@/assets/scrap-game-transparent.png'
import type { PlayerState } from '@/domain/player/player-state'

interface RivalsSummaryProps {
  rivals: PlayerState[]
  selectedRivalId: string | null
}

defineProps<RivalsSummaryProps>()

defineEmits<{
  selectRival: [rivalId: string]
}>()

const { t } = useI18n()

const rivalDisplayName = (rival: PlayerState) => {
  if (rival.kind === 'human') {
    return t('players.human')
  }

  const rivalNumber = rival.id.replace('rival-', '')

  return t('players.rival', { number: rivalNumber })
}
</script>

<template>
  <section class="game-rivals grid shrink-0 grid-cols-4 gap-1">
    <button
      v-for="rival in rivals"
      :key="rival.id"
      class="game-rival-card rounded-md border border-stone-300/10 bg-stone-950/35 px-1.5 py-1 text-left shadow-[0_4px_12px_rgba(0,0,0,0.35)] backdrop-blur-[1px] transition hover:scale-[1.02]"
      :class="{ 'border-teal-300/45 bg-teal-950/35': selectedRivalId === rival.id }"
      type="button"
      :aria-pressed="selectedRivalId === rival.id"
      :aria-label="rivalDisplayName(rival)"
      @click="$emit('selectRival', rival.id)"
    >
      <p class="truncate text-[0.62rem] font-bold leading-none text-stone-200">
        {{ rivalDisplayName(rival) }}
      </p>
      <div class="mt-0.5 flex items-center justify-between gap-0.5 font-mono text-[0.56rem] leading-none">
        <span class="flex min-w-0 items-center gap-0.5 text-amber-100">
          <img
            class="h-3.5 w-3.5 shrink-0 object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]"
            :src="scrapGame"
            :alt="t('resources.scrap')"
          />
          {{ rival.scrap }}
        </span>
        <span class="flex min-w-0 items-center gap-0.5 text-sky-100">
          <img
            class="h-3.5 w-3.5 shrink-0 object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]"
            :src="batteryGame"
            :alt="t('resources.batteries')"
          />
          {{ rival.batteries }}
        </span>
        <span class="shrink-0 font-black text-teal-100">{{ rival.colony.length }}/9</span>
      </div>
    </button>
  </section>
</template>
