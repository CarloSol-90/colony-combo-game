<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import bookCloseButton from '@/assets/book-close-button.png'
import challengesBookPanel from '@/assets/challenges-book-panel.png'
import statisticsRowBackground from '@/assets/statistics-row-background.webp'

defineEmits<{
  close: []
}>()

const { t } = useI18n()

const challengeItems = [
  {
    titleKey: 'statistics.currentStreak',
    value: '0',
    detailKey: 'statistics.currentStreakDetail',
  },
  {
    titleKey: 'statistics.losses',
    value: '0',
    detailKey: 'statistics.lossesDetail',
  },
  {
    titleKey: 'statistics.cardsUnlocked',
    value: '0/78',
    detailKey: 'statistics.cardsUnlockedDetail',
  },
  {
    titleKey: 'statistics.cardsUsed',
    value: '0/78',
    detailKey: 'statistics.cardsUsedDetail',
  },
  {
    titleKey: 'statistics.dailyChallenges',
    value: '0/3',
    detailKey: 'statistics.dailyChallengesDetail',
  },
  {
    titleKey: 'statistics.perfectColony',
    value: '0/9',
    detailKey: 'statistics.perfectColonyDetail',
  },
  {
    titleKey: 'statistics.resourceMastery',
    value: '0/10',
    detailKey: 'statistics.resourceMasteryDetail',
  },
  {
    titleKey: 'statistics.survivalChallenges',
    value: '0/12',
    detailKey: 'statistics.survivalChallengesDetail',
  },
  {
    titleKey: 'statistics.marketChallenges',
    value: '0/8',
    detailKey: 'statistics.marketChallengesDetail',
  },
]
</script>

<template>
  <div class="absolute inset-0 z-20 grid place-items-center bg-stone-950/60 px-2 py-2 backdrop-blur-[2px]">
    <section class="statistics-book-panel relative aspect-[941/1672] -translate-x-[1.5%] drop-shadow-[0_18px_36px_rgba(0,0,0,0.75)]">
      <img
        class="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_3px_rgba(255,255,255,0.95)] [filter:drop-shadow(0_0_3px_rgba(255,255,255,0.95))_drop-shadow(0_0_9px_rgba(255,255,255,0.7))_drop-shadow(0_0_18px_rgba(125,211,252,0.38))]"
        :src="challengesBookPanel"
        :alt="t('statistics.title')"
      />

      <button
        class="statistics-close-button absolute right-[6%] top-[9%] z-10 grid place-items-center transition hover:scale-105"
        type="button"
        :aria-label="t('common.close')"
        @click="$emit('close')"
      >
        <img
          class="h-full w-full object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]"
          :src="bookCloseButton"
          :alt="t('common.close')"
        />
      </button>

      <div class="absolute inset-x-[22%] bottom-[14%] top-[10%] z-10 overflow-hidden">
        <header class="mb-1.5 text-center">
          <p class="text-[0.58rem] font-black uppercase tracking-[0.18em] text-amber-950/75">
            {{ t('statistics.label') }}
          </p>
          <h2 class="statistics-book-title font-black uppercase leading-tight text-stone-950">
            {{ t('statistics.title') }}
          </h2>
        </header>

        <div class="book-scroll h-[calc(100%-3rem)] overflow-y-auto pr-1 text-stone-950">
          <dl class="grid gap-1.5">
            <div
              class="statistics-book-row bg-center bg-no-repeat px-3 py-2.5 sm:px-4 sm:py-3"
              :style="{ backgroundImage: `url(${statisticsRowBackground})` }"
            >
              <dt class="text-[0.68rem] font-black uppercase tracking-[0.08em]">
                {{ t('statistics.winRate') }}
              </dt>
              <dd class="mt-0.5 font-mono text-xl font-black leading-none">0%</dd>
            </div>

            <div
              v-for="item in challengeItems"
              :key="item.titleKey"
              class="statistics-book-row bg-center bg-no-repeat px-3 py-2.5 sm:px-4 sm:py-3"
              :style="{ backgroundImage: `url(${statisticsRowBackground})` }"
            >
              <div class="flex items-start justify-between gap-2">
                <dt class="text-[0.68rem] font-black uppercase leading-snug tracking-[0.08em]">
                  {{ t(item.titleKey) }}
                </dt>
                <dd class="shrink-0 font-mono text-sm font-black leading-none">
                  {{ item.value }}
                </dd>
              </div>
              <p class="mt-1 text-[0.72rem] font-semibold leading-snug text-stone-900/80">
                {{ t(item.detailKey) }}
              </p>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.statistics-book-panel {
  width: min(100%, 28rem, calc((100svh - 1rem) * 941 / 1672));
}

.statistics-close-button {
  width: clamp(2.75rem, 13vw, 3.5rem);
  height: clamp(2.75rem, 13vw, 3.5rem);
}

.statistics-book-title {
  font-size: clamp(0.95rem, 4.6vw, 1.125rem);
}

.book-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.book-scroll::-webkit-scrollbar {
  display: none;
}

.statistics-book-row {
  background-size: 100% 100%;
}
</style>
