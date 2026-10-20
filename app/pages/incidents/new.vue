<script setup>
const { data: equipment } = await useFetch('/mock/equipment.json', { server: false })
const equipmentList = computed(() => equipment.value?.data ?? [])

const sites = ['North Ridge', 'West Quarry', 'East Basin']
const severities = ['Low', 'Medium', 'High', 'Critical']
const types = ['Equipment failure', 'Injury or near miss', 'Environmental', 'Safety violation', 'Other']

const form = reactive({
  when: '',
  site: '',
  severity: '',
  type: '',
  description: '',
  equipment: ''
})

const errors = reactive({
  when: '',
  site: '',
  severity: '',
  type: '',
  description: ''
})

const submitted = ref(false)

function validate() {
  errors.when = ''
  errors.site = ''
  errors.severity = ''
  errors.type = ''
  errors.description = ''

  if (!form.when) {
    errors.when = 'Please enter the date and time.'
  } else if (new Date(form.when) > new Date()) {
    errors.when = 'The date and time cannot be in the future.'
  }

  if (!form.site) errors.site = 'Please select a site.'
  if (!form.severity) errors.severity = 'Please select a severity.'
  if (!form.type) errors.type = 'Please select an incident type.'

  if (!form.description.trim()) {
    errors.description = 'Please describe what happened.'
  } else if (form.description.trim().length < 20) {
    errors.description = 'Please write at least 20 characters.'
  }

  return !errors.when && !errors.site && !errors.severity && !errors.type && !errors.description
}

function clearForm() {
  form.when = ''
  form.site = ''
  form.severity = ''
  form.type = ''
  form.description = ''
  form.equipment = ''
  errors.when = ''
  errors.site = ''
  errors.severity = ''
  errors.type = ''
  errors.description = ''
}

function submit() {
  submitted.value = false
  if (!validate()) return
  // Midterm: no backend yet. At the Final this will send a POST request to /api/incidents.
  submitted.value = true
  clearForm()
}

function resetAll() {
  clearForm()
  submitted.value = false
}
</script>

<template>
  <section>
    <h1>Report an incident</h1>
    <p class="subtitle">Record the details promptly. Fields marked with * are required.</p>

    <form class="card" novalidate @submit.prevent="submit">
      <p v-if="submitted" class="success" role="status">
        Incident report submitted. (Saved locally for the midterm demo.)
      </p>

      <div class="grid">
        <div>
          <label class="field" for="when">Date and time *
            <input
              id="when"
              v-model="form.when"
              type="datetime-local"
              :aria-invalid="!!errors.when"
              aria-describedby="when-error"
            />
          </label>
          <p v-if="errors.when" id="when-error" class="error" role="alert">{{ errors.when }}</p>
        </div>

        <div>
          <label class="field" for="site">Site *
            <select id="site" v-model="form.site" :aria-invalid="!!errors.site" aria-describedby="site-error">
              <option value="">Select a site</option>
              <option v-for="s in sites" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>
          <p v-if="errors.site" id="site-error" class="error" role="alert">{{ errors.site }}</p>
        </div>

        <div>
          <label class="field" for="severity">Severity *
            <select id="severity" v-model="form.severity" :aria-invalid="!!errors.severity" aria-describedby="severity-error">
              <option value="">Select severity</option>
              <option v-for="s in severities" :key="s" :value="s">{{ s }}</option>
            </select>
          </label>
          <p v-if="errors.severity" id="severity-error" class="error" role="alert">{{ errors.severity }}</p>
        </div>

        <div>
          <label class="field" for="type">Incident type *
            <select id="type" v-model="form.type" :aria-invalid="!!errors.type" aria-describedby="type-error">
              <option value="">Select incident type</option>
              <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>
          <p v-if="errors.type" id="type-error" class="error" role="alert">{{ errors.type }}</p>
        </div>
      </div>

      <label class="field" for="description">Description *
        <textarea
          id="description"
          v-model="form.description"
          rows="5"
          placeholder="Describe the event, immediate actions taken and people involved..."
          :aria-invalid="!!errors.description"
          aria-describedby="description-error"
        ></textarea>
      </label>
      <p v-if="errors.description" id="description-error" class="error" role="alert">{{ errors.description }}</p>

      <label class="field" for="equipment">Equipment involved (optional)
        <select id="equipment" v-model="form.equipment">
          <option value="">None</option>
          <option v-for="item in equipmentList" :key="item.id" :value="item.name">{{ item.name }}</option>
        </select>
      </label>

      <div class="actions">
        <button type="button" class="btn" @click="resetAll">Clear</button>
        <button type="submit" class="btn btn-primary">Submit report</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1.25rem; }
.actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }
.success {
  background: #dcfce7;
  color: #166534;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin: 0 0 1rem;
  font-weight: 600;
}
@media (max-width: 700px) {
  .grid { grid-template-columns: 1fr; }
}
</style>