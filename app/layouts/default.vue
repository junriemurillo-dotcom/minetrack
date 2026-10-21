<script setup>
const open = ref(false)
</script>

<template>
  <div>
    <button
      class="menu-btn"
      aria-label="Toggle menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      ☰
    </button>
    <AppSidebar :open="open" @navigate="open = false" />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.content { padding: 1.5rem; }
.menu-btn { display: none; }

@media (min-width: 768px) {
  .content { margin-left: 280px; }
}

@media (max-width: 767px) {
  .menu-btn {
    display: block;
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 20;
    padding: 0.5rem 0.75rem;
    font-size: 1.25rem;
    background: var(--dark);
    color: #fff;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
  }
  .content { padding-top: 4.5rem; }
}
</style>