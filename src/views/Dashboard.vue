<template>
    <div>
      <h3 class="mt-4 text-center">Available Tickets</h3>
      <div class="row justify-content-center">
        <div class="col-md-4" v-for="ticket in tickets" :key="ticket.id">
          <div class="card mb-4">
            <div class="card-body text-center">
              <h5 class="card-title">{{ getEventTitle(ticket.event) }}</h5>
              <p class="card-text">
                <strong>Seat Number:</strong> {{ ticket.seatNumber }}<br />
                <strong>Price:</strong> {{ ticket.price }}<br />
                <strong>Status:</strong> {{ ticket.status }}
              </p>
              <button
                class="btn btn-primary"
                @click="buyTicket(ticket.id)"
                :disabled="ticket.status !== 'available'"
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard',
    computed: {
      tickets() {
        return this.$store.getters.tickets || [];
      },
      events() {
        return this.$store.getters.events || [];
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
  .card {
    border: 1px solid #007bff;
    border-radius: 0.5rem;
  }
  .card-title {
    font-size: 1.25rem;
    font-weight: bold; 
  }
  .card-text {
    font-size: 1rem;
  }
  </style>
  