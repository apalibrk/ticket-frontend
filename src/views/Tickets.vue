<template>
    <div class="container mt-5">
      <h2 class="mb-4">Tickets</h2>
  
      <!-- Tickets Table -->
      <div v-if="tickets.length && events.length">
        <table class="table table-striped">
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
              <td>{{ ticket.price }}</td>
              <td>{{ ticket.status }}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="buyTicket(ticket.id)">Buy Ticket</button>
                <button class="btn btn-danger btn-sm" v-if="isOwner(ticket)" @click="deleteTicket(ticket.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Loading tickets and events...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventTickets',
    computed: {
      tickets() {
        console.log('Tickets:', this.$store.getters.tickets); // Debugging statement
        return this.$store.getters.tickets;
      },
      events() {
        console.log('Events:', this.$store.getters.events); // Debugging statement
        return this.$store.getters.events;
      }
    },
    methods: {
      async buyTicket(ticketId) {
        try {
          await this.$store.dispatch('buyTicket', ticketId);
          alert('Ticket purchased successfully!');
        } catch (error) {
          alert('Error purchasing ticket');
        }
      },
      async deleteTicket(ticketId) {
        await this.$store.dispatch('deleteTicket', ticketId);
      },
      isOwner(ticket) {
        if (!this.events || !Array.isArray(this.events)) return false;
        const event = this.events.find(event => event.id === ticket.event);
        return this.$store.state.user && event && this.$store.state.user.id === event.organizer.id;
      },
      getEventTitle(eventId) {
        if (!this.events || !Array.isArray(this.events)) return 'Unknown Event';
        const event = this.events.find(event => event.id === eventId);
        return event ? event.title : 'Unknown Event';
      }
    },
    created() {
      this.$store.dispatch('fetchTickets');
      this.$store.dispatch('fetchEvents');
    }
  };
  </script>
  
  <style scoped>
  /* Add some basic styling here */
  </style>