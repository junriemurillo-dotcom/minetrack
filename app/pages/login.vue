<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

const auth = useAuthStore()
const router = useRouter()
const name = ref('')
const role = ref('')
const error = ref('')

function submit() {
  if (!name.value.trim()) {
    error.value = 'Please enter your name.'
    return
  }
  if (!role.value) {
    error.value = 'Please choose a role.'
    return
  }
  error.value = ''
  auth.login(name.value.trim(), role.value)
  router.push('/')
}
</script>

<template>
  <main class="login">
    <div class="box">
      <h1>MineTrack</h1>
      <p>Sign in to continue</p>

      <label for="name">Name</label>
      <input id="name" v-model="name" type="text" />

      <label for="role">Role</label>
      <select id="role" v-model="role">
        <option value="">Select a role</option>
        <option value="admin">Admin</option>
        <option value="supervisor">Site Supervisor</option>
        <option value="safety_officer">Safety Officer</option>
        <option value="worker">Worker</option>
      </select>

      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <button @click="submit">Sign in</button>
    </div>
  </main>
</template>

<style scoped>
.login { min-height: 100vh; display: grid; place-items: center; padding: 1rem; background: var(--dark); }
.box { background: var(--panel); padding: 2rem; border-radius: 10px; width: 100%; max-width: 380px; }
h1 { margin: 0; }
label { display: block; margin-top: 1rem; font-weight: 600; }
input, select { width: 100%; padding: 0.6rem; margin-top: 0.25rem; border: 1px solid #9ca3af; border-radius: 6px; font-size: 1rem; }
button { width: 100%; margin-top: 1.25rem; padding: 0.7rem; background: var(--accent); color: #1f2937; font-weight: 700; border: 0; border-radius: 6px; font-size: 1rem; cursor: pointer; }
.error { color: #b91c1c; margin: 0.75rem 0 0; }
</style>