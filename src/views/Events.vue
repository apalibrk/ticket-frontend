<template>
    <div>
      <h2>Events Management</h2>
  
      <!-- Create Event Form -->
      <form @submit.prevent="submitEvent">
        <div>
          <label for="name">Event Name:</label>
          <input type="text" v-model="newEvent.name" required />
        </div>
        <div>
          <label for="date">Event Date:</label>
          <input type="date" v-model="newEvent.date" required />
        </div>
        <button type="submit">Add Event</button>
      </form>
  
      <!-- Events Table -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.name }}</td>
            <td>{{ event.date }}</td>
            <td>
              <button @click="editEvent(event)">Edit</button>
              <button @click="deleteEvent(event.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventManagement', // Updated component name
    data() {
      return {
        newEvent: {
          name: '',
          date: ''
        }
      };
    },
    computed: {
      events() {
        return this.$store.getters.events;
      }
    },
    methods: {
      async submitEvent() {
        if (this.newEvent.name && this.newEvent.date) {
          await this.$store.dispatch('createEvent', this.newEvent);
          this.newEvent.name = '';
          this.newEvent.date = '';
        }
      },
      editEvent(event) {
        // Logic for editing event (to be implemented)
        console.log('Edit event:', event); // Use the event variable
      },
      async deleteEvent(eventId) {
        await this.$store.dispatch('deleteEvent', eventId);
      }
    },
    created() {
      this.$store.dispatch('fetchEvents');
    }
  };
  </script>
  
  <style scoped>
  /* Add some basic styling here */
  </style>