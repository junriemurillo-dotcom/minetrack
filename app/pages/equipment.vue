<script setup>
const { data, pending, error } = await useFetch('/mock/equipment.json', { server: false })

const search = ref('')

const items = computed(() => {
  const list = data.value?.data ?? []
  const text = search.value.toLowerCase()
  return list.filter((item) => item.name.toLowerCase().includes(text))
})
</script>

<template>
  <section>
    <h1>Equipment</h1>
    <p class="subtitle">Monitor your fleet, inspections and maintenance status.</p>

    <div class="card">
      <label class="field" for="search">
        Search equipment
        <input id="search" v-model="search" type="text" placeholder="Search by name..." />
      </label>

      <p v-if="pending">Loading...</p>
      <p v-else-if="error" class="error" role="alert">
        Could not load equipment: {{ error.message }}
      </p>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Site</th>
              <th>Status</th>
              <th>Last inspection</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="name">{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.site_name }}</td>
              <td>
                <span class="badge" :class="item.status">{{ item.status }}</span>
              </td>
              <td>{{ item.last_inspection }}</td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="5" class="empty">No equipment found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.field { max-width: 320px; margin-top: 0; }
.table-wrap { overflow-x: auto; margin-top: 1rem; }
table { width: 100%; border-collapse: collapse; }
th {
  text-align: left;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 0.75rem;
  background: #faf9f7;
  border-bottom: 1px solid var(--border);
}
td { padding: 0.9rem 0.75rem; border-bottom: 1px solid var(--border); }
.name { font-weight: 600; }
.empty { text-align: center; color: var(--muted); }
.badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}
.badge.active { background: #dcfce7; color: #166534; }
.badge.maintenance { background: #fef3c7; color: #92400e; }
</style>