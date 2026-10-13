<script setup>
const route = useRoute()

const title = computed(() => {
  const name = String(route.params.section || '')
  return name.charAt(0).toUpperCase() + name.slice(1)
})
</script>

<template>
  <section>
    <h1>{{ title }}</h1>
    <p class="subtitle">(For finals na ni).</p>
  </section>
</template>