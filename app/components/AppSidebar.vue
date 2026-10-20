<script setup>
import {
  LayoutDashboard, Warehouse, Tractor, Users, Factory,
  TriangleAlert, ClipboardCheck, User, LogOut, ChevronRight
} from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['navigate'])

const auth = useAuthStore()
const router = useRouter()

const all = ['admin', 'supervisor', 'safety_officer', 'worker']

const menu = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard, roles: all },
  { label: 'Sites', to: '/sites', icon: Warehouse, roles: ['admin', 'supervisor'] },
  { label: 'Equipment', to: '/equipment', icon: Tractor, roles: ['admin', 'supervisor'] },
  { label: 'Personnel', to: '/personnel', icon: Users, roles: ['admin', 'supervisor'] },
  { label: 'Production', to: '/production', icon: Factory, roles: ['admin', 'supervisor'] },
  { label: 'Incidents', to: '/incidents/new', icon: TriangleAlert, roles: ['admin', 'safety_officer', 'worker'] },
  { label: 'Inspections', to: '/inspections', icon: ClipboardCheck, roles: ['admin', 'safety_officer'] },
  { label: 'Profile', to: '/profile', icon: User, roles: all }
]

const roleLabels = {
  admin: 'Admin',
  supervisor: 'Site Supervisor',
  safety_officer: 'Safety Officer',
  worker: 'Worker'
}

const visibleMenu = computed(() =>
  menu.filter((item) => item.roles.includes(auth.role))
)

const initials = computed(() =>
  (auth.user?.name || '')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)

function logout() {
  auth.logout()
  emit('navigate')
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar" :class="{ open: props.open }" aria-label="Main navigation">
    <div class="logo">
      <span class="logo-box"><Factory :size="22" /></span>
      <span class="logo-text">MineTrack</span>
    </div>

    <div class="site">
      <span class="dot"></span>
      <div>
        <p class="site-label">Current Site:</p>
        <p class="site-name">AMPAYON</p>
      </div>
    </div>

    <nav>
      <NuxtLink
        v-for="item in visibleMenu"
        :key="item.label"
        :to="item.to"
        @click="emit('navigate')"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.label }}</span>
        <ChevronRight class="chev" :size="16" />
      </NuxtLink>
    </nav>

    <div class="user">
      <span class="avatar">{{ initials }}</span>
      <div class="user-text">
        <p class="user-name">{{ auth.user?.name }}</p>
        <p class="user-role">{{ roleLabels[auth.role] }}</p>
      </div>
      <button class="logout" aria-label="Log out" @click="logout">
        <LogOut :size="20" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--dark);
  color: #fff;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  z-index: 10;
}

.logo { display: flex; align-items: center; gap: 0.75rem; }
.logo-box {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--accent); color: var(--text);
  display: grid; place-items: center;
}
.logo-text { font-size: 1.5rem; font-weight: 700; }

.site {
  display: flex; align-items: center; gap: 0.75rem;
  background: var(--dark-light); border-radius: 12px; padding: 0.75rem;
}
.dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
.site-label { margin: 0; font-size: 0.7rem; letter-spacing: 0.08em; color: #d1d5db; }
.site-name { margin: 0; font-weight: 600; }

nav { display: flex; flex-direction: column; gap: 0.25rem; overflow-y: auto; }
nav a {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.7rem 0.85rem; border-radius: 10px;
  color: #d1d5db; text-decoration: none; font-weight: 500;
}
nav a:hover { background: var(--dark-light); }
nav a .chev { margin-left: auto; display: none; }
nav a.router-link-exact-active { background: var(--accent); color: var(--text); font-weight: 600; }
nav a.router-link-exact-active .chev { display: block; }

.user {
  margin-top: auto; padding-top: 1rem;
  border-top: 1px solid var(--dark-light);
  display: flex; align-items: center; gap: 0.75rem;
}
.avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: #e8dcc8; color: var(--text); font-weight: 600;
  display: grid; place-items: center;
}
.user-text { flex: 1; min-width: 0; }
.user-name { margin: 0; font-weight: 600; }
.user-role { margin: 0; font-size: 0.85rem; color: #9ca3af; }
.logout { background: none; border: 0; color: #d1d5db; cursor: pointer; padding: 0.25rem; }

@media (max-width: 767px) {
  .sidebar { transform: translateX(-100%); transition: transform 0.2s; padding-top: 4rem; }
  .sidebar.open { transform: translateX(0); }
}
</style>