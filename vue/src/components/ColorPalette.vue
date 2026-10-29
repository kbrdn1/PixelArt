<template>
  <div class="selection">
    <button
      v-for="{ name, label } in COLORS"
      :key="name"
      :class="[`btn-${name}`, { active: name === selected }]"
      :aria-label="label"
      :aria-pressed="String(name === selected)"
      @click="selected = name" />
  </div>
</template>

<script setup>
import { COLORS } from '@/lib/pixel-art.js'

const selected = defineModel({ type: String, required: true })
</script>
