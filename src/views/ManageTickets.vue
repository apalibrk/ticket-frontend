<template>
    <div class="container mt-5">
      <h2 class="mb-4 text-center">Manage Tickets</h2>
  
      <!-- Create Ticket Form -->
      <form @submit.prevent="submitTicket" class="mb-4 border p-4 rounded shadow-sm bg-light">
        <h5 class="text-center">Add New Ticket</h5>
        <div class="form-group">
          <label for="event">Event:</label>
          <select v-model="newTicket.eventId" class="form-control" required>
            <option disabled value="">Select an event</option>
            <option v-for="event in events" :key="event.id" :value="event.id">{{ event.title }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="seatNumber">Seat Number:</label>
          <input type="text" v-model="newTicket.seatNumber" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="price">Ticket Price:</label>
          <input type="number" v-model="newTicket.price" class="form-control" required min="1" />
        </div>
        <button type="submit" class="btn btn-success btn-block">Add Ticket</button>
      </form>
  
      <!-- Tickets Table -->
      <table class="table table-striped text-center">
        <thead class="thead-dark">
          <tr>
            <th>Event</th>
            <th>Seat Number</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ getEventTitle(ticket.event) }}</td>
            <td>{{ ticket.seatNumber }}</td>
            <td>${{ ticket.price.toFixed(2) }}</td>
            <td>{{ ticket.status }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editTicket(ticket)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteTicket(ticket.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit Ticket Modal -->
      <div v-if="showEditModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog" aria-labelledby="editTicketModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editTicketModalLabel">Edit Ticket</h5>
              <button type="button" class="close" @click="closeEditModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateTicket">
                <div class="form-group">
                  <label for="editEvent">Event:</label>
                  <select v-model="editTicketData.eventId" class="form-control" required>
                    <option disabled value="">Select an event</option>
                    <option v-for="event in events" :key="event.id" :value="event.id">{{ event.title }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="editSeatNumber">Seat Number:</label>
                  <input type="text" v-model="editTicketData.seatNumber" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="editPrice">Ticket Price:</label>
                  <input type="number" v-model="editTicketData.price" class="form-control" required min="1" />
                </div>
                <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManageTickets',
    data() {
      return {
        newTicket: {
          eventId: '',
          seatNumber: '',
          price: 0
        },
        editTicketData: {
          id: null,
          eventId: '',
          seatNumber: '',
          price: 0
        },
        showEditModal: false
      };
    },
    computed: {
      events() {
        return this.$store.getters.events || [];
      },
      tickets() {
        return this.$store.getters.tickets || [];
      }
    },
    methods: {
      async submitTicket() {
        if (this.newTicket.eventId && this.newTicket.seatNumber && this.newTicket.price > 0) {
          await this.$store.dispatch('createTicket', this.newTicket);
          this.resetNewTicket();
        }
      },
      resetNewTicket() {
        this.newTicket.eventId = '';
        this.newTicket.seatNumber = '';
        this.newTicket.price = 0;
      },
      editTicket(ticket) {
        this.editTicketData = { ...ticket };
        this.showEditModal = true;
      },
      async updateTicket() {
        await this.$store.dispatch('updateTicket', this.editTicketData);
        this.showEditModal = false;
      },
      closeEditModal() {
        this.showEditModal = false;
      },
      async deleteTicket(ticketId) {
        await this.$store.dispatch('deleteTicket', ticketId);
      },
      getEventTitle(eventId) {
        if (!this.events || !Array.isArray(this.events)) return 'Unknown Event';
        const event = this.events.find(event => event.id === eventId);
        return event ? event.title : 'Unknown Event';
      }
    },
    created() {
      this.$store.dispatch('fetchEvents');
      this.$store.dispatch('fetchTickets');
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
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
  
  .table {
    margin-top: 20px;
  }
  </style>
  