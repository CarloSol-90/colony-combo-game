<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="absolute inset-0 z-20 grid place-items-center bg-stone-950/55 px-4 backdrop-blur-[2px]">
    <section class="w-full max-w-xs rounded-md bg-stone-950/80 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
      <div class="mb-3 flex items-center justify-between gap-3">
        <h2 class="text-sm font-black uppercase tracking-[0.18em] text-stone-100">
          {{ t('statistics.title') }}
        </h2>
        <button
          class="rounded px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-stone-200"
          type="button"
          @click="$emit('close')"
        >
          {{ t('common.close') }}
        </button>
      </div>

      <dl class="grid gap-1.5 text-sm">
        <div class="flex items-center justify-between rounded bg-stone-900/45 px-3 py-2">
          <dt class="font-bold text-stone-200">{{ t('statistics.winRate') }}</dt>
          <dd class="font-mono font-black text-teal-100">0%</dd>
        </div>
        <div class="flex items-center justify-between rounded bg-stone-900/45 px-3 py-2">
          <dt class="font-bold text-stone-200">{{ t('statistics.cardsPlayed') }}</dt>
          <dd class="font-mono font-black text-teal-100">0/78</dd>
        </div>
        <div class="flex items-center justify-between rounded bg-stone-900/45 px-3 py-2">
          <dt class="font-bold text-stone-200">{{ t('statistics.achievements') }}</dt>
          <dd class="font-mono font-black text-teal-100">0/0</dd>
        </div>
      </dl>
    </section>
  </div>
</template>
