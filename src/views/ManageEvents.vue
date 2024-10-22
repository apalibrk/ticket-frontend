<template>
  <div class="container mt-5" style="margin-left: auto; margin-right: auto;">
    <h2 class="mb-4 text-center">Manage Events</h2>

    <!-- Create Event Button -->
    <button class="btn btn-success btn-block mb-4" @click="createEvent">Create New Event</button>

    <!-- Events Table -->
    <table class="table table-striped text-center" style="margin-left: auto; margin-right: auto;">
      <thead class="thead-dark">
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Venue</th>
          <th>Capacity</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ event.date }}</td>
          <td>{{ event.venue }}</td>
          <td>{{ event.capacity }}</td>
          <td>{{ event.description }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editEvent(event)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteEvent(event.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Event Modal -->
    <EventForm v-if="showForm" :event="selectedEvent" @close="closeForm" @submit="submitForm" />
  </div>
</template>

<script>
import EventForm from '@/components/EventForm.vue';

export default {
  components: { EventForm },
  data() {
    return {
      showForm: false,
      selectedEvent: null
    };
  },
  computed: {
    events() {
      return this.$store.getters.events || [];
    }
  },
  methods: {
    createEvent() {
      this.selectedEvent = { title: '', date: '', venue: '', capacity: 0, description: '' };
      this.showForm = true;
    },
    editEvent(event) {
      this.selectedEvent = { ...event };
      this.showForm = true;
    },
    async submitForm(event) {
      if (event.id) {
        await this.$store.dispatch('updateEvent', event);
      } else {
        await this.$store.dispatch('createEvent', event);
      }
      this.showForm = false;
    },
    closeForm() {
      this.showForm = false;
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
.container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
  padding: 10px;
  text-align: right;
}

.close {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}

.table {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.btn-block {
  width: 100%;
}
</style>