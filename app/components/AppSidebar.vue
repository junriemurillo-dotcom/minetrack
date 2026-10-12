<script setup>
import { useAuthStore } from '~/stores/auth'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['navigate'])

const auth = useAuthStore()
const router = useRouter()

const menu = [
  { label: 'Dashboard', to: '/', roles: ['admin', 'supervisor', 'safety_officer', 'worker'] },
  { label: 'Equipment', to: '/equipment', roles: ['admin', 'supervisor'] },
  { label: 'Incident Report', to: '/incidents/new', roles: ['admin', 'safety_officer', 'worker'] }
]

const visibleMenu = computed(() =>
  menu.filter((item) => item.roles.includes(auth.role))
)

function logout() {
  auth.logout()
  emit('navigate')
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar" :class="{ open: props.open }" aria-label="Main navigation">
    <h2>MineTrack</h2>
    <p class="user">{{ auth.user?.name }} ({{ auth.role }})</p>
    <nav>
      <NuxtLink
        v-for="item in visibleMenu"
        :key="item.to"
        :to="item.to"
        @click="emit('navigate')"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
    <button class="logout" @click="logout">Log out</button>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: var(--dark);
  color: #fff;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
}
h2 { margin: 0 0 0.25rem; }
.user { color: #d1d5db; font-size: 0.85rem; margin: 0; }
nav { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 1.5rem; }
nav a { color: #fff; padding: 0.6rem 0.75rem; border-radius: 6px; text-decoration: none; }
nav a:hover { background: #3d434d; }
nav a.router-link-exact-active { background: var(--accent); color: #1f2937; font-weight: 600; }
.logout {
  margin-top: auto;
  padding: 0.6rem;
  border: 1px solid #6b7280;
  background: transparent;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.2s; padding-top: 4rem; }
  .sidebar.open { transform: translateX(0); }
}
</style>