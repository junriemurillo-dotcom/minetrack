<script setup>
import { Tractor, TriangleAlert, Plus, ChevronRight } from 'lucide-vue-next'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const { data: equipment } = await useFetch('/mock/equipment.json', { server: false })
const { data: incidents } = await useFetch('/mock/incidents.json', { server: false })
const { data: shiftData, error } = await useFetch('/mock/shift.json', { server: false })

const equipmentList = computed(() => equipment.value?.data ?? [])
const incidentList = computed(() => incidents.value?.data ?? [])
const shift = computed(() => shiftData.value?.data)

const activeCount = computed(() => equipmentList.value.filter((e) => e.status === 'active').length)
const maintenanceCount = computed(() => equipmentList.value.filter((e) => e.status === 'maintenance').length)
const openIncidents = computed(() => incidentList.value.filter((i) => i.status === 'open'))
const highCount = computed(() => openIncidents.value.filter((i) => i.severity === 'high').length)
const recent = computed(() => incidentList.value.slice(0, 3))
const percent = computed(() =>
  shift.value ? Math.round((shift.value.checked_in / shift.value.total) * 100) : 0
)

function formatDate(text) {
  return new Date(text).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <section>
    <div class="head">
      <div>
        <h1>Welcome, {{ auth.user?.name }}</h1>
        <p class="subtitle">Here's what's happening across your operations today.</p>
      </div>
      <NuxtLink to="/incidents/new" class="btn btn-primary">
        <Plus :size="18" /> Report incident
      </NuxtLink>
    </div>

    <p v-if="error" class="error" role="alert">Could not load dashboard data.</p>

    <div class="stats">
      <StatCard label="Active equipment" :value="activeCount" :note="'of ' + equipmentList.length + ' total'" color="green">
        <Tractor :size="22" />
      </StatCard>
      <StatCard label="In maintenance" :value="maintenanceCount" note="Needs attention" color="amber">
        <Tractor :size="22" />
      </StatCard>
      <StatCard label="Active equipment" :value="activeCount" :note="'of ' + equipmentList.length + ' total'" color="green">
        <TriangleAlert :size="22" />
      </StatCard>
    </div>

    <div class="panels">
      <div class="card">
        <div class="panel-head">
          <div>
            <h2>Recent incidents</h2>
            <p class="sub">Latest safety reports across all sites</p>
          </div>
          <NuxtLink to="/incidents" class="link">View all <ChevronRight :size="16" /></NuxtLink>
        </div>
        <ul class="list">
          <li v-for="item in recent" :key="item.id">
            <span class="sev" :class="item.severity"></span>
            <div class="info">
              <p class="title">{{ item.title }}</p>
              <p class="sub">{{ item.id }} · {{ item.site_name }}</p>
            </div>
            <span class="time">{{ formatDate(item.reported_at) }}</span>
          </li>
        </ul>
      </div>

      <div v-if="shift" class="card">
        <h2>Today's shift</h2>
        <p class="sub">{{ shift.name }} overview</p>

        <div class="shift-box">
          <strong>{{ shift.start }} — {{ shift.end }}</strong>
          <span class="pill">Active</span>
        </div>

        <div class="checked">
          <span>Team checked in</span>
          <strong>{{ shift.checked_in }} / {{ shift.total }}</strong>
        </div>
        <div
          class="progress"
          role="progressbar"
          aria-label="Team checked in"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="percent"
        >
          <div class="progress-fill" :style="{ width: percent + '%' }"></div>
        </div>

        <div class="site-row">
          <span class="avatar">{{ shift.site.slice(0, 2).toUpperCase() }}</span>
          <div>
            <p class="title">{{ shift.site }}</p>
            <p class="sub">{{ shift.weather }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
.head .btn { text-decoration: none; }
.stats { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.panels { display: grid; gap: 1.25rem; grid-template-columns: 3fr 2fr; margin-top: 1.25rem; }

h2 { margin: 0; font-size: 1.25rem; font-weight: 500; }
.sub { margin: 0.2rem 0 0; font-size: 0.85rem; color: var(--muted); }
.title { margin: 0; font-weight: 600; }

.panel-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
.link { display: inline-flex; align-items: center; color: #92600a; font-weight: 600; text-decoration: none; }

.list { list-style: none; margin: 1rem 0 0; padding: 0; }
.list li { display: flex; align-items: center; gap: 0.9rem; padding: 0.9rem 0; border-top: 1px solid var(--border); }
.info { flex: 1; }
.time { font-size: 0.85rem; color: var(--muted); }
.sev { width: 4px; align-self: stretch; border-radius: 4px; }
.sev.high { background: var(--red); }
.sev.medium { background: var(--accent); }
.sev.low { background: var(--green); }

.shift-box {
  display: flex; justify-content: space-between; align-items: center;
  background: #f3f4f6; border-radius: 10px; padding: 0.9rem 1rem; margin: 1rem 0;
}
.pill { background: #dcfce7; color: #166534; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.7rem; border-radius: 999px; }
.checked { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.progress { height: 8px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); }
.site-row { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border); }
.avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--dark); color: #fff; font-weight: 600; display: grid; place-items: center; }

@media (max-width: 900px) {
  .panels { grid-template-columns: 1fr; }
}
</style>