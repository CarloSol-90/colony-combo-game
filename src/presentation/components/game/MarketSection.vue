<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cardBackShelter from '@/assets/card-back-shelter-square.png'
import cardBackWasteland from '@/assets/card-back-wasteland-square.png'
import colonySlotDummy from '@/assets/colony-slot-dummy-transparent.png'
import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'
import RadioMarker from './RadioMarker.vue'

interface MarketSectionProps {
  group: CardGroup
  title: string
  cards: CardDefinition[]
  isRadioActive: boolean
  hasPendingCard: boolean
}

const props = defineProps<MarketSectionProps>()

defineEmits<{
  buyCard: [cardId: string]
}>()

const { t } = useI18n()

const MARKET_CARD_SLOTS = 3

const displayCards = computed(() =>
  Array.from({ length: MARKET_CARD_SLOTS }, (_, index) => props.cards[index] ?? null),
)

const deckBackImage = computed(() => (props.group === 'shelter' ? cardBackShelter : cardBackWasteland))

const deckLabel = computed(() =>
  props.group === 'shelter' ? t('market.shelterDeck') : t('market.wastelandDeck'),
)

const cardLabel = (card: CardDefinition | null, index: number) => {
  if (!card) {
    return `${props.title} preview card ${index + 1}`
  }

  return `${card.name}. ${card.cost} ${t('resources.scrapShort')}. ${card.immediateAbility}`
}
</script>

<template>
  <article class="game-market-panel rounded-md border border-stone-300/10 bg-transparent p-1.5">
    <div class="mb-0.5 flex items-center justify-between gap-2">
      <h2 class="text-xs font-black uppercase tracking-[0.16em] text-stone-100">
        {{ title }}
      </h2>
      <div class="game-radio-slot flex h-10 w-10 items-center justify-end">
        <RadioMarker v-if="isRadioActive" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-1">
      <button
        class="game-market-card aspect-square overflow-visible rounded bg-transparent p-0"
        type="button"
        :aria-label="deckLabel"
        disabled
      >
        <img
          class="h-full w-full object-cover drop-shadow-[0_5px_10px_rgba(0,0,0,0.55)]"
          :src="deckBackImage"
          :alt="deckLabel"
        />
      </button>

      <button
        v-for="(card, index) in displayCards"
        :key="card?.id ?? `${group}-preview-${index}`"
        class="game-market-card aspect-square overflow-visible rounded bg-transparent p-0 transition hover:scale-[1.03]"
        type="button"
        :aria-disabled="hasPendingCard || !card"
        @click="card && !hasPendingCard && $emit('buyCard', card.id)"
      >
        <img
          class="h-full w-full object-cover drop-shadow-[0_5px_10px_rgba(0,0,0,0.55)]"
          :class="{ 'opacity-85 saturate-[0.86]': !card }"
          :src="card?.imageUrl || colonySlotDummy"
          :alt="cardLabel(card, index)"
        />
        <span class="sr-only">
          {{ cardLabel(card, index) }}
        </span>
      </button>
    </div>
  </article>
</template>
