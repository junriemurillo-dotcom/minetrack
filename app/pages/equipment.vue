<script setup>
const { data, pending, error } = await useFetch('/mock/equipment.json', { server: false })
</script>

<template>
  <main>
    <h1>Equipment</h1>
    <p v-if="pending">Loading...</p>
    <p v-else-if="error" role="alert">Could not load equipment: {{ error.message }}</p>
    <table v-else-if="data">
      <thead>
        <tr><th>Name</th><th>Type</th><th>Site</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in data.data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.site_name }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>