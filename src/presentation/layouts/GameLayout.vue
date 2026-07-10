<script setup lang="ts">
import boardBackground01 from '@/assets/board-background-01.webp'
import boardBackground02 from '@/assets/board-background-02.webp'
import boardBackground03 from '@/assets/board-background-03.webp'
import boardBackground04 from '@/assets/board-background-04.webp'
import boardBackground05 from '@/assets/board-background-05.webp'

const boardBackgrounds = [
  boardBackground01,
  boardBackground02,
  boardBackground03,
  boardBackground04,
  boardBackground05,
]

const selectedBoardBackground =
  boardBackgrounds[Math.floor(Math.random() * boardBackgrounds.length)]
</script>

<template>
  <main
    class="game-screen relative mx-auto flex h-svh w-full max-w-md flex-col gap-1 overflow-hidden bg-cover bg-center px-2.5 pb-1.5 pt-0 text-left text-stone-100"
    :style="{
      backgroundImage: `linear-gradient(180deg, rgba(15, 12, 8, 0.18), rgba(15, 12, 8, 0.38)), url(${selectedBoardBackground})`,
    }"
  >
    <slot />
  </main>
</template>
