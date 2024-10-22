<template>
    <div class="modal fade show" style="display: block;" tabindex="-1" role="dialog" aria-labelledby="eventFormModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="eventFormModalLabel">{{ localEvent.id ? 'Edit Event' : 'Create Event' }}</h5>
            <button type="button" class="close" @click="$emit('close')" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" v-model="localEvent.title" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="date">Date:</label>
                <input type="datetime-local" v-model="localEvent.date" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="venue">Venue:</label>
                <input type="text" v-model="localEvent.venue" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="capacity">Capacity:</label>
                <input type="number" v-model="localEvent.capacity" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="localEvent.description" class="form-control" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">{{ localEvent.id ? 'Save Changes' : 'Create Event' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: {
        type: Object,
        default: () => ({ title: '', date: '', venue: '', capacity: 0, description: '' })
      }
    },
    data() {
      return {
        localEvent: { ...this.event }
      };
    },
    methods: {
      submitForm() {
        this.$emit('submit', this.localEvent);
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>