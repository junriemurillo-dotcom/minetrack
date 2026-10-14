<script setup>
defineProps({
  label: String,
  value: [String, Number],
  note: String,
  color: { type: String, default: 'amber' }
})
</script>

<template>
  <div class="stat" :class="color">
    <div class="top">
      <span class="icon"><slot /></span>
      <span v-if="note" class="note">{{ note }}</span>
    </div>
    <p class="value">{{ value }}</p>
    <p class="label">{{ label }}</p>
  </div>
</template>

<style scoped>
.stat {
  background: var(--panel);
  border: 1px solid var(--border);
  border-left-width: 6px;
  border-radius: 12px;
  padding: 1.25rem;
}
.stat.green { border-left-color: var(--green); }
.stat.amber { border-left-color: var(--accent); }
.stat.red { border-left-color: var(--red); }
.top { display: flex; justify-content: space-between; align-items: center; }
.icon {
  width: 48px; height: 48px; border-radius: 10px;
  background: #f3f4f6; display: grid; place-items: center;
}
.note {
  background: #f3f4f6; color: #4b5563;
  font-size: 0.8rem; padding: 0.25rem 0.7rem; border-radius: 999px;
}
.value { font-size: 2.5rem; font-weight: 700; margin: 1rem 0 0; }
.label { margin: 0; color: var(--muted); }
</style>