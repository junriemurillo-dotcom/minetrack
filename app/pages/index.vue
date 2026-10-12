<script setup>
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <section>
    <h1>Welcome, {{ auth.user?.name }}</h1>
    <div class="grid">
      <StatCard label="Active equipment" :value="2" />
      <StatCard label="In maintenance" :value="1" />
      <StatCard label="Open incidents" :value="0" />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 1rem;
}
</style>