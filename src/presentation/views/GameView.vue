<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="min-h-screen px-4 py-6 text-slate-100">
    <section class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <header class="space-y-2">
        <p class="text-xs uppercase tracking-[0.35em] text-emerald-300/80">{{ t('app.subtitle') }}</p>
        <h1 class="text-3xl font-black tracking-tight">{{ t('app.title') }}</h1>
      </header>

      <section class="rounded-2xl border border-dashed border-white/15 bg-slate-950/35 p-4">
        <p class="text-sm text-slate-300">
          {{ t('app.intro') }}
        </p>
      </section>

      <button
        class="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
        type="button"
      >
        {{ t('app.enter') }}
      </button>
    </section>
  </main>
</template>