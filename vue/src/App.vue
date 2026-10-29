<template>
  <ConfigBar @submit="configure" />
  <section>
    <PixelGrid :grid="grid" :size="size" @paint="paint" />
    <div class="actions">
      <button id="clear" @click="clear">Clear</button>
      <button id="reset" @click="reset">Reset</button>
    </div>
    <ColorPalette v-model="color" />
    <PixelCursor :color="colorHex(color)" />
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import ColorPalette from '@/components/ColorPalette.vue'
import ConfigBar from '@/components/ConfigBar.vue'
import PixelCursor from '@/components/PixelCursor.vue'
import PixelGrid from '@/components/PixelGrid.vue'
import { colorHex, createGrid, DEFAULT_COLOR, DEFAULT_GRID, DEFAULT_SIZE, keyToAction } from '@/lib/pixel-art.js'

const grid = ref(createGrid(DEFAULT_GRID))
const size = ref(DEFAULT_SIZE)
const color = ref(DEFAULT_COLOR)

function paint(row, col, paintColor = color.value) {
  grid.value[row][col] = paintColor
}

function clear() {
  grid.value = createGrid(grid.value.length)
}

function reset() {
  grid.value = createGrid(DEFAULT_GRID)
  size.value = DEFAULT_SIZE
}

function configure(gridSize, pixelSize) {
  grid.value = createGrid(gridSize)
  size.value = pixelSize
}

// raccourcis clavier : 1-4 pour la couleur, c pour clear, r pour reset
function onKeyDown(event) {
  const action = keyToAction(event)
  if (!action) return
  if (action.type === 'select') color.value = action.color
  if (action.type === 'clear') clear()
  if (action.type === 'reset') reset()
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>
