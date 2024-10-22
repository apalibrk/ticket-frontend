<template>
    <div>
      <h2>Events</h2>
      <ul>
        <li v-for="event in events" :key="event.id">{{ event.name }}</li>
      </ul>
      <button @click="createEvent">Create Event</button>
      <div v-if="showForm">
        <!-- Event form goes here -->
        <button @click="closeForm">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventList', // Updated component name
    data() {
      return {
        showForm: false,
        selectedEvent: null
      };
    },
    computed: {
      events() {
        return this.$store.getters.events;
      }
    },
    methods: {
      createEvent() {
        this.selectedEvent = null;
        this.showForm = true;
      },
      editEvent(event) {
        this.selectedEvent = event;
        this.showForm = true;
      },
      closeForm() {
        this.showForm = false;
        this.$store.dispatch('fetchEvents');
      },
      async deleteEvent(id) {
        await this.$store.dispatch('deleteEvent', id);
        this.$store.dispatch('fetchEvents');
      }
    },
    created() {
      this.$store.dispatch('fetchEvents');
    }
  };
  </script>