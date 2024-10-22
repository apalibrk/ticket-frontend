<template>
    <div class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ ticket ? 'Edit Ticket' : 'Create Ticket' }}</h5>
            <button type="button" class="close" @click="$emit('close')" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="ticketName">Ticket Name:</label>
                <input v-model="form.name" id="ticketName" class="form-control" placeholder="Ticket Name" required />
              </div>
              <div class="form-group">
                <label for="ticketPrice">Price:</label>
                <input v-model="form.price" id="ticketPrice" type="number" class="form-control" placeholder="Price" required />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Save</button>
              <button type="button" class="btn btn-secondary btn-block" @click="$emit('close')">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      ticket: Object
    },
    data() {
      return {
        form: {
          name: this.ticket ? this.ticket.name : '',
          price: this.ticket ? this.ticket.price : ''
        }
      };
    },
    methods: {
      async submit() {
        if (this.ticket) {
          await this.$store.dispatch('updateTicket', { ...this.ticket, ...this.form });
        } else {
          await this.$store.dispatch('createTicket', this.form);
        }
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  .modal-title {
    margin-bottom: 0;
    line-height: 1.5;
  }
  </style>
  