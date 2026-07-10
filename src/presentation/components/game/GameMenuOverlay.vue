<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="absolute inset-0 z-20 grid place-items-center bg-stone-950/55 px-4 backdrop-blur-[2px]">
    <section class="w-full max-w-xs rounded-md border border-stone-200/15 bg-stone-950/80 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
      <div class="mb-3 flex items-center justify-between gap-3">
        <h2 class="text-sm font-black uppercase tracking-[0.18em] text-stone-100">
          {{ t('menu.title') }}
        </h2>
        <button
          class="rounded border border-stone-200/15 px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-stone-200"
          type="button"
          @click="$emit('close')"
        >
          {{ t('common.close') }}
        </button>
      </div>

      <div class="grid gap-1.5">
        <button class="rounded border border-teal-300/20 bg-teal-950/35 px-3 py-2 text-left text-sm font-bold text-teal-100" type="button" @click="$emit('close')">
          {{ t('menu.resume') }}
        </button>
        <button class="rounded border border-stone-200/10 bg-stone-900/45 px-3 py-2 text-left text-sm font-bold text-stone-100" type="button">
          {{ t('menu.mute') }}
        </button>
        <button class="rounded border border-stone-200/10 bg-stone-900/45 px-3 py-2 text-left text-sm font-bold text-stone-100" type="button">
          {{ t('menu.credits') }}
        </button>
        <button class="rounded border border-red-300/20 bg-red-950/35 px-3 py-2 text-left text-sm font-bold text-red-100" type="button">
          {{ t('menu.exit') }}
        </button>
      </div>
    </section>
  </div>
</template>
