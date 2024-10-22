<template>
    <div>
      <h2>Tickets</h2>
  
      <!-- Tickets Table -->
      <table>
        <thead>
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
            <td>{{ ticket.event.title }}</td>
            <td>{{ ticket.seatNumber }}</td>
            <td>{{ ticket.price }}</td>
            <td>{{ ticket.status }}</td>
            <td>
              <button @click="buyTicket(ticket.id)">Buy Ticket</button>
              <button v-if="isOwner(ticket)" @click="deleteTicket(ticket.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Tickets',
    computed: {
      tickets() {
        return this.$store.getters.tickets;
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
        return this.$store.state.user && this.$store.state.user.id === ticket.event.organizer.id;
      }
    },
    created() {
      this.$store.dispatch('fetchTickets');
    }
  };
  </script>
  
  <style scoped>
  </style>