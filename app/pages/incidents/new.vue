<template>
  <section>
    <h1>Incident Report</h1>
    
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Incident Title:</label>
        <input type="text" id="title" placeholder="e.g., Equipment Malfunction" required>
      </div>

      <div>
        <label for="date">Date of Incident:</label>
        <input type="date" id="date" required>
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea id="description" rows="4" placeholder="Describe what happened..." required></textarea>
      </div>

      <button type="submit">Submit Report</button>
    </form>
    
  </section>
</template>

<script setup>
// You can add your JavaScript logic for handling the form submission here later
function submitForm() {
  alert("Form submitted!");
}
</script>

<style scoped>
/* You can add CSS styling here to make the form look good */
div {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
}
input, textarea {
  width: 100%;
  padding: 8px;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>