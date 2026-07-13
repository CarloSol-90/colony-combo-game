<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import gameMenuCloseButton from '@/assets/game-menu-close-button.webp'
import gameMenuMuteButton from '@/assets/game-menu-mute-button.webp'
import gameMenuOptionBackground from '@/assets/game-menu-option-background.webp'

defineEmits<{
  close: []
}>()

const { t } = useI18n()

const menuActions = [
  { labelKey: 'menu.resume', event: 'close', tone: 'primary' },
  { labelKey: 'menu.credits', tone: 'default' },
  { labelKey: 'menu.exit', tone: 'danger' },
]
</script>

<template>
  <div class="absolute inset-0 z-20 grid place-items-center bg-stone-950/60 px-6 py-6 backdrop-blur-[2px]">
    <button
      class="game-menu-close absolute right-4 top-4 z-10 grid place-items-center transition hover:scale-105"
      type="button"
      :aria-label="t('common.close')"
      @click="$emit('close')"
    >
      <img
        class="h-full w-full object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)]"
        :src="gameMenuCloseButton"
        :alt="t('common.close')"
      />
    </button>

    <section class="game-menu-actions grid justify-items-center gap-2.5">
      <button
        v-for="action in menuActions"
        :key="action.labelKey"
        class="game-menu-action bg-center bg-no-repeat px-5 text-center text-sm font-black uppercase tracking-[0.14em] transition hover:scale-[1.02]"
        :class="{
          'text-teal-100': action.tone === 'primary',
          'text-stone-100': action.tone === 'default',
          'text-red-100': action.tone === 'danger',
        }"
        :style="{ backgroundImage: `url(${gameMenuOptionBackground})` }"
        type="button"
        @click="action.event === 'close' ? $emit('close') : undefined"
      >
        {{ t(action.labelKey) }}
      </button>

      <button
        class="game-menu-mute justify-self-end transition hover:scale-105"
        type="button"
        :aria-label="t('menu.mute')"
      >
        <img
          class="h-full w-full object-contain"
          :src="gameMenuMuteButton"
          :alt="t('menu.mute')"
        />
      </button>
    </section>
  </div>
</template>

<style scoped>
.game-menu-close {
  width: clamp(2.5rem, 12vw, 3.25rem);
  height: clamp(2.5rem, 12vw, 3.25rem);
  filter:
    drop-shadow(0 0 3px rgba(255, 255, 255, 0.95))
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.7))
    drop-shadow(0 0 18px rgba(125, 211, 252, 0.38))
    drop-shadow(0 4px 10px rgba(0, 0, 0, 0.42));
}

.game-menu-actions {
  width: min(56vw, 11.5rem);
}

.game-menu-action {
  width: min(56vw, 11.5rem);
  aspect-ratio: 889 / 451;
  background-size: 100% 100%;
  filter:
    drop-shadow(0 0 3px rgba(255, 255, 255, 0.95))
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.7))
    drop-shadow(0 0 18px rgba(125, 211, 252, 0.38))
    drop-shadow(0 4px 10px rgba(0, 0, 0, 0.42));
}

.game-menu-mute {
  width: clamp(2.35rem, 13vw, 3.2rem);
  aspect-ratio: 1;
  filter:
    drop-shadow(0 0 3px rgba(255, 255, 255, 0.95))
    drop-shadow(0 0 9px rgba(255, 255, 255, 0.7))
    drop-shadow(0 0 18px rgba(125, 211, 252, 0.38))
    drop-shadow(0 4px 10px rgba(0, 0, 0, 0.42));
}
</style>
