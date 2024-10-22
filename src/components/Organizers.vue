<template>
    <div>
      <h2>Organizers</h2>
      <ul>
        <li v-for="organizer in organizers" :key="organizer.id">{{ organizer.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrganizerList', // Updated component name
    computed: {
      organizers() {
        return this.$store.getters.organizers;
      }
    },
    created() {
      this.$store.dispatch('fetchOrganizers');
    }
  };
  </script>