<template>
  <div class="config">
    <input
      v-model="grid"
      type="number"
      name="grid"
      id="grid"
      placeholder="Taille de grille"
      aria-label="Taille de grille"
      min="1"
      :max="MAX_GRID" />
    <input
      v-model="pixels"
      type="number"
      name="pixels"
      id="pixels"
      placeholder="Taille des pixels"
      aria-label="Taille des pixels"
      min="1"
      :max="MAX_SIZE" />
    <button class="valid" @click="submit">Valider</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DEFAULT_GRID, DEFAULT_SIZE, MAX_GRID, MAX_SIZE, readSetting } from '@/lib/pixel-art.js'

const emit = defineEmits(['submit'])

// v-model sur un input number renvoie un nombre, ou '' si le champ est vide
const grid = ref('')
const pixels = ref('')

function submit() {
  const gridSize = readSetting(grid.value, MAX_GRID, DEFAULT_GRID, `Veuillez entrer un nombre entre 1 et ${MAX_GRID}`)
  const pixelSize = readSetting(
    pixels.value,
    MAX_SIZE,
    DEFAULT_SIZE,
    `Veuillez entrer une taille des pixels entre 1 et ${MAX_SIZE}`,
  )
  emit('submit', gridSize, pixelSize)
}
</script>
