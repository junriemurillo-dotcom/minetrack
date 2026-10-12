<script setup>
defineProps({ label: String, value: [String, Number] })
</script>

<template>
  <div class="card">
    <p class="label">{{ label }}</p>
    <p class="value">{{ value }}</p>
  </div>
</template>

<style scoped>
.card { background: var(--panel); padding: 1rem; border-radius: 8px; border-left: 6px solid var(--accent); }
.label { margin: 0; color: var(--muted); }
.value { margin: 0.25rem 0 0; font-size: 2rem; font-weight: 700; }
</style>