<template>
  <div class="cursor" aria-hidden="true" :style="{ backgroundColor: color, ...position }" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// pastille de la couleur sélectionnée qui suit la souris
defineProps({
  color: { type: String, required: true },
})

const position = ref(null)

function move(event) {
  position.value = { top: `${event.pageY + 5}px`, left: `${event.pageX + 5}px` }
}

onMounted(() => document.addEventListener('mousemove', move))
onUnmounted(() => document.removeEventListener('mousemove', move))
</script>
