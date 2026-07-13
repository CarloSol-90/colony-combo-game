<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cardPreviewDummy from '@/assets/card-preview-dummy.webp'
import type { CardDefinition } from '@/domain/card/card-definition'

interface CardPreviewOverlayProps {
  card: CardDefinition
  canBuy: boolean
}

const props = defineProps<CardPreviewOverlayProps>()

defineEmits<{
  close: []
  buy: []
}>()

const { t } = useI18n()

const shieldLabel = computed(() => (props.card.shields.length > 0 ? props.card.shields.join(' · ') : '—'))
</script>

<template>
  <div class="fixed inset-0 z-30 grid place-items-center bg-stone-950/85 px-4 py-4 backdrop-blur-md">
    <section class="w-full max-w-sm overflow-hidden rounded-2xl bg-stone-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
      <div class="border-b border-stone-200/10 px-4 py-3">
        <p class="text-[0.58rem] font-black uppercase tracking-[0.24em] text-cyan-100/75">
          {{ t('cardPreview.title') }}
        </p>
        <h2 class="mt-1 text-lg font-black uppercase tracking-[0.08em] text-stone-100">
          {{ card.name }}
        </h2>
      </div>

      <div class="grid gap-4 px-4 py-4">
        <div class="overflow-hidden rounded-xl bg-stone-900/40">
          <img
            class="aspect-[2/3] w-full object-cover"
            :src="cardPreviewDummy"
            :alt="card.name"
          />
        </div>

        <dl class="grid gap-2 text-sm">
          <div class="flex items-center justify-between gap-3 rounded-lg bg-stone-900/45 px-3 py-2">
            <dt class="text-[0.62rem] font-black uppercase tracking-[0.18em] text-stone-400">
              {{ t('cardPreview.cost') }}
            </dt>
            <dd class="font-mono text-base font-black text-amber-200">{{ card.cost }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3 rounded-lg bg-stone-900/45 px-3 py-2">
            <dt class="text-[0.62rem] font-black uppercase tracking-[0.18em] text-stone-400">
              {{ t('cardPreview.shields') }}
            </dt>
            <dd class="text-right text-sm font-semibold text-stone-100">
              {{ shieldLabel }}
            </dd>
          </div>
          <div class="rounded-lg bg-stone-900/45 px-3 py-2">
            <dt class="text-[0.62rem] font-black uppercase tracking-[0.18em] text-stone-400">
              {{ t('cardPreview.ability') }}
            </dt>
            <dd class="mt-1 text-sm leading-snug text-stone-100">
              {{ card.immediateAbility }}
            </dd>
          </div>
          <div class="rounded-lg bg-stone-900/45 px-3 py-2">
            <dt class="text-[0.62rem] font-black uppercase tracking-[0.18em] text-stone-400">
              {{ t('cardPreview.scoring') }}
            </dt>
            <dd class="mt-1 text-sm leading-snug text-stone-100">
              {{ card.scoringRule }}
            </dd>
          </div>
        </dl>
      </div>

      <div class="grid grid-cols-2 gap-2 border-t border-stone-200/10 px-4 py-3">
        <button
          class="rounded-lg bg-stone-800/70 px-3 py-2 text-sm font-bold text-stone-100"
          type="button"
          @click="$emit('close')"
        >
          {{ t('cardPreview.close') }}
        </button>
        <button
          v-if="canBuy"
          class="rounded-lg bg-cyan-400/90 px-3 py-2 text-sm font-black text-stone-950"
          type="button"
          @click="$emit('buy')"
        >
          {{ t('cardPreview.buy') }}
        </button>
      </div>
    </section>
  </div>
</template>
