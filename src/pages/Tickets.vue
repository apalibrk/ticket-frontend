<template>
    <div>
      <h2>Tickets</h2>
      <TicketForm v-if="showForm" :ticket="selectedTicket" @close="closeForm" />
      <button @click="createTicket">Create New Ticket</button>
      <ul>
        <li v-for="ticket in tickets" :key="ticket.id">
          {{ ticket.name }}
          <button @click="editTicket(ticket)">Edit</button>
          <button @click="deleteTicket(ticket.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import TicketForm from '@/components/TicketForm.vue';
  
  export default {
    components: { TicketForm },
    data() {
      return {
        showForm: false,
        selectedTicket: null
      };
    },
    computed: {
      tickets() {
        return this.$store.getters.tickets;
      }
    },
    methods: {
      createTicket() {
        this.selectedTicket = null;
        this.showForm = true;
      },
      editTicket(ticket) {
        this.selectedTicket = ticket;
        this.showForm = true;
      },
      closeForm() {
        this.showForm = false;
        this.$store.dispatch('fetchTickets');
      },
      async deleteTicket(id) {
        await this.$store.dispatch('deleteTicket', id);
        this.$store.dispatch('fetchTickets');
      }
    },
    created() {
      this.$store.dispatch('fetchTickets');
    }
  };
  </script>
  