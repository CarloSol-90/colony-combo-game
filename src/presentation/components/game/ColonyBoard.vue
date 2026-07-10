<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import colonySlotDummy from '@/assets/colony-slot-dummy-transparent.png'
import type { CardDefinition } from '@/domain/card/card-definition'
import type { PlacedColonyCard } from '@/domain/colony/colony-card'

interface ColonyBoardProps {
  placedCards: PlacedColonyCard[]
  cards: CardDefinition[]
  hasPendingCard: boolean
}

const props = defineProps<ColonyBoardProps>()

defineEmits<{
  placeCard: [row: 0 | 1 | 2, column: 0 | 1 | 2]
}>()

const { t } = useI18n()

const gridCells = Array.from({ length: 9 }, (_, index) => ({
  row: Math.floor(index / 3) as 0 | 1 | 2,
  column: (index % 3) as 0 | 1 | 2,
}))

const placedCardAt = (row: number, column: number) =>
  props.placedCards.find((card) => card.position.row === row && card.position.column === column)

const cardName = (cardId: string) => props.cards.find((card) => card.id === cardId)?.name ?? cardId

const colonyCardImage = (cardId: string) =>
  props.cards.find((card) => card.id === cardId)?.imageUrl || colonySlotDummy

const cellLabel = (row: number, column: number) => {
  const placedCard = placedCardAt(row, column)

  return placedCard ? cardName(placedCard.cardId) : `${t('board.title')} ${row + 1}.${column + 1}`
}

const cellImage = (row: number, column: number) => {
  const placedCard = placedCardAt(row, column)

  return placedCard ? colonyCardImage(placedCard.cardId) : colonySlotDummy
}
</script>

<template>
  <section class="game-board-panel flex min-h-0 flex-1 flex-col rounded-md border border-stone-300/10 bg-transparent p-2">
    <div class="mb-1.5 flex items-center justify-between">
      <h2 class="text-xs font-black uppercase tracking-[0.16em]">{{ t('board.title') }}</h2>
      <p class="font-mono text-xs text-stone-400">{{ placedCards.length }}/9</p>
    </div>

    <div class="game-board-grid mx-auto grid aspect-square h-full min-h-0 max-h-full max-w-full grid-cols-3 grid-rows-3 gap-0.5">
      <button
        v-for="cell in gridCells"
        :key="`${cell.row}-${cell.column}`"
        class="game-board-card aspect-square min-h-0 overflow-visible rounded bg-transparent p-0 transition hover:scale-[1.02] disabled:hover:scale-100"
        type="button"
        :aria-label="cellLabel(cell.row, cell.column)"
        :disabled="Boolean(placedCardAt(cell.row, cell.column)) || !hasPendingCard"
        @click="$emit('placeCard', cell.row, cell.column)"
      >
        <img
          class="h-full w-full object-cover drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
          :src="cellImage(cell.row, cell.column)"
          :alt="cellLabel(cell.row, cell.column)"
        />
      </button>
    </div>
  </section>
</template>
