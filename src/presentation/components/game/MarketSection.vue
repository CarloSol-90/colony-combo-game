<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cardBackShelter from '@/assets/card-back-shelter-square.png'
import cardBackWasteland from '@/assets/card-back-wasteland-square.png'
import cardPreviewDummy from '@/assets/card-preview-dummy.webp'
import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'
import RadioMarker from './RadioMarker.vue'

interface MarketSectionProps {
  group: CardGroup
  title: string
  cards: CardDefinition[]
  isRadioActive: boolean
}

const props = defineProps<MarketSectionProps>()

defineEmits<{
  'view-card': [card: CardDefinition]
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
  <article class="game-market-panel rounded-md bg-transparent p-0.5">
    <div class="mb-0 flex items-center gap-0.5">
      <h2 class="min-w-0 flex-1 text-[0.58rem] font-black uppercase tracking-[0.16em] text-stone-100">
        {{ title }}
      </h2>
    </div>

    <div
      class="relative mt-0.5 rounded-md px-0.5 py-0.5"
      :class="
        isRadioActive
          ? 'border-2 border-cyan-300/70 shadow-[0_0_0_1px_rgba(45,212,191,0.1),0_0_14px_rgba(45,212,191,0.22)]'
          : 'border border-transparent'
      "
    >
      <div
        v-if="isRadioActive"
        class="absolute right-0.5 top-[-1.55rem] z-10 flex h-10 w-10 items-center justify-center"
      >
        <RadioMarker />
      </div>

      <div class="grid grid-cols-4 gap-[1px]">
        <button
          class="game-market-card aspect-square h-full w-full overflow-visible rounded bg-transparent p-0"
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
          class="game-market-card aspect-square h-full w-full overflow-visible rounded bg-transparent p-0 transition hover:scale-[1.02]"
          type="button"
          :aria-disabled="!card"
          @click="card && $emit('view-card', card)"
        >
          <img
            class="h-full w-full object-cover drop-shadow-[0_5px_10px_rgba(0,0,0,0.55)]"
            :class="{ 'opacity-85 saturate-[0.86]': !card }"
            :src="card?.imageUrl || cardPreviewDummy"
            :alt="cardLabel(card, index)"
          />
          <span class="sr-only">
            {{ cardLabel(card, index) }}
          </span>
        </button>
      </div>
    </div>
  </article>
</template>
