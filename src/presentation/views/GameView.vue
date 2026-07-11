<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'
import ColonyBoard from '@/presentation/components/game/ColonyBoard.vue'
import CardPreviewOverlay from '@/presentation/components/game/CardPreviewOverlay.vue'
import GameHeader from '@/presentation/components/game/GameHeader.vue'
import GameMenuOverlay from '@/presentation/components/game/GameMenuOverlay.vue'
import MarketSection from '@/presentation/components/game/MarketSection.vue'
import RivalsSummary from '@/presentation/components/game/RivalsSummary.vue'
import StatisticsOverlay from '@/presentation/components/game/StatisticsOverlay.vue'
import GameLayout from '@/presentation/layouts/GameLayout.vue'
import { useGameStore } from '@/presentation/stores/game.store'

const { t } = useI18n()
const gameStore = useGameStore()
const TOTAL_TURNS = 9
const selectedRivalId = ref<string | null>(null)
const isGameMenuOpen = ref(false)
const isStatisticsOpen = ref(false)
const previewCard = ref<CardDefinition | null>(null)
const previewSource = ref<'market' | 'board' | null>(null)
const previewDebug = ref<string | null>(null)

const marketGroups: CardGroup[] = ['shelter', 'wasteland']

const activePlayer = computed(() =>
  gameStore.gameState?.players.find((player) => player.id === gameStore.gameState?.activePlayerId),
)

const rivals = computed(() =>
  gameStore.gameState?.players.filter((player) => player.id !== gameStore.gameState?.activePlayerId) ?? [],
)

const displayedPlayer = computed(() => {
  if (!gameStore.gameState || !activePlayer.value) {
    return null
  }

  return (
    gameStore.gameState.players.find((player) => player.id === selectedRivalId.value) ?? activePlayer.value
  )
})

const pendingCard = computed(() =>
  gameStore.cards.find((card) => card.id === gameStore.gameState?.pendingPlacementCardId) ?? null,
)

const marketCards = (group: CardGroup): CardDefinition[] => {
  const market = gameStore.gameState?.markets[group]

  if (!market) {
    return []
  }

  return market.visibleCardIds
    .map((cardId) => gameStore.cards.find((card) => card.id === cardId))
    .filter((card): card is CardDefinition => Boolean(card))
}

const marketTitle = (group: CardGroup) =>
  group === 'shelter' ? t('markets.shelter') : t('markets.wasteland')

const radioIsHere = (group: CardGroup) => gameStore.gameState?.radioPosition === group

const openCardPreview = (card: CardDefinition, source: 'market' | 'board') => {
  previewDebug.value = `${source}:${card.id}`
  previewCard.value = card
  previewSource.value = source
}

const closeCardPreview = () => {
  previewCard.value = null
  previewSource.value = null
  previewDebug.value = null
}

const handleBuyFromPreview = async () => {
  if (!previewCard.value || previewSource.value !== 'market') {
    return
  }

  const cardId = previewCard.value.id
  closeCardPreview()
  await gameStore.buyVisibleCard(cardId)
}

const handleGridCellClick = async (row: 0 | 1 | 2, column: 0 | 1 | 2) => {
  if (!pendingCard.value || selectedRivalId.value) {
    return
  }

  await gameStore.placePendingCardAt({ row, column })
}

const handleRivalClick = (rivalId: string) => {
  selectedRivalId.value = selectedRivalId.value === rivalId ? null : rivalId
}

const handleMarketCardClick = (card: CardDefinition) => {
  openCardPreview(card, 'market')
}

const handleBoardCardClick = (card: CardDefinition) => {
  openCardPreview(card, 'board')
}

onMounted(() => {
  void gameStore.initializeGame()
})
</script>

<template>
  <GameLayout>
    <section
      v-if="gameStore.isLoading"
      class="rounded-lg bg-transparent p-3 text-sm text-stone-300"
    >
      {{ t('game.loading') }}
    </section>

    <section
      v-else-if="gameStore.gameState && activePlayer"
      class="game-content flex min-h-0 flex-1 flex-col gap-1.5"
    >
      <GameHeader
        :scrap="activePlayer.scrap"
        :batteries="activePlayer.batteries"
        :turn="gameStore.gameState.turn"
        :total-turns="TOTAL_TURNS"
        @open-settings="isGameMenuOpen = true"
        @open-statistics="isStatisticsOpen = true"
      />

      <section
        v-if="pendingCard"
        class="shrink-0 rounded-md bg-transparent px-2.5 py-1.5"
      >
        <p class="text-xs uppercase tracking-[0.18em] text-teal-100/75">{{ t('game.pendingCard') }}</p>
        <p class="mt-1 text-sm font-bold text-teal-100">{{ pendingCard.name }}</p>
      </section>

      <section
        v-if="previewDebug"
        class="shrink-0 rounded-md bg-cyan-950/35 px-2.5 py-1 text-[0.58rem] font-mono uppercase tracking-[0.16em] text-cyan-100"
      >
        {{ previewDebug }}
      </section>

      <section class="game-markets grid shrink-0 gap-0.5">
        <MarketSection
          v-for="group in marketGroups"
          :key="group"
          :group="group"
          :title="marketTitle(group)"
          :cards="marketCards(group)"
          :is-radio-active="radioIsHere(group)"
          @view-card="handleMarketCardClick"
        />
      </section>

      <ColonyBoard
        v-if="displayedPlayer"
        :placed-cards="displayedPlayer.colony"
        :cards="gameStore.cards"
        :has-pending-card="Boolean(pendingCard) && !selectedRivalId"
        @place-card="handleGridCellClick"
        @view-card="handleBoardCardClick"
      />

      <RivalsSummary
        :rivals="rivals"
        :selected-rival-id="selectedRivalId"
        @select-rival="handleRivalClick"
      />
    </section>

    <section
      v-else
      class="rounded-lg bg-red-950/30 p-3 text-sm text-red-100"
    >
      {{ gameStore.error ?? t('game.unavailable') }}
    </section>

    <GameMenuOverlay v-if="isGameMenuOpen" @close="isGameMenuOpen = false" />
    <StatisticsOverlay v-if="isStatisticsOpen" @close="isStatisticsOpen = false" />
    <Teleport to="body">
      <CardPreviewOverlay
        v-if="previewCard"
        :card="previewCard"
        :can-buy="previewSource === 'market'"
        @close="closeCardPreview"
        @buy="handleBuyFromPreview"
      />
    </Teleport>
  </GameLayout>
</template>
