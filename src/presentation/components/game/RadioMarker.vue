<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import radioGame from '@/assets/radio-game-transparent.png'

const { t } = useI18n()
</script>

<template>
  <div class="radio-signal">
    <img
      class="h-12 w-12 object-contain"
      :src="radioGame"
      :alt="t('radio.label')"
    />
  </div>
</template>
