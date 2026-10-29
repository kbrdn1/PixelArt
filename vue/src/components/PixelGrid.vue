<template>
  <div id="invader" @dragstart.prevent>
    <div v-for="(cells, row) in grid" :key="row" class="row">
      <div
        v-for="(color, col) in cells"
        :key="col"
        class="cell"
        :class="{ [color]: color !== 'none' }"
        :style="{ width: `${size}px`, height: `${size}px` }"
        @mousedown="start($event, row, col)"
        @mouseenter="enter(row, col)"
        @dblclick="emit('paint', row, col, 'none')" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  grid: { type: Array, required: true },
  size: { type: Number, required: true },
})

const emit = defineEmits(['paint'])

let painting = false

function start(event, row, col) {
  if (event.button !== 0) return
  painting = true
  emit('paint', row, col)
}

function enter(row, col) {
  if (painting) emit('paint', row, col)
}

// arrêter de peindre quand on relâche la souris, même hors de la grille
function stop() {
  painting = false
}

onMounted(() => window.addEventListener('mouseup', stop))
onUnmounted(() => window.removeEventListener('mouseup', stop))
</script>
