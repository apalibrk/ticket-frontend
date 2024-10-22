<template>
    <div class="organizers-management">
      <h2>Organizers Management</h2>
  
      <!-- Create Organizer Form -->
      <form @submit.prevent="submitOrganizer" class="organizer-form">
        <div class="form-group">
          <label for="name">Organizer Name:</label>
          <input type="text" v-model="newOrganizer.name" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="newOrganizer.email" required class="form-input" />
        </div>
        <button type="submit" class="btn btn-primary">Add Organizer</button>
      </form>
  
      <!-- Organizers Table -->
      <table class="organizers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="organizer in organizers" :key="organizer.id">
            <td>{{ organizer.name }}</td>
            <td>{{ organizer.email }}</td>
            <td>
              <button @click="openEditModal(organizer)" class="btn btn-secondary">Edit</button>
              <button @click="deleteOrganizer(organizer.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit Organizer Modal -->
      <div v-if="isEditModalVisible" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeEditModal">&times;</span>
          <h3>Edit Organizer</h3>
          <form @submit.prevent="updateOrganizer" class="organizer-form">
            <div class="form-group">
              <label for="name">Organizer Name:</label>
              <input type="text" v-model="newOrganizer.name" required class="form-input" />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" v-model="newOrganizer.email" required class="form-input" />
            </div>
            <button type="submit" class="btn btn-primary">Update Organizer</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrganizerManagement',
    data() {
      return {
        newOrganizer: {
          id: null,
          name: '',
          email: ''
        },
        isEditModalVisible: false // Track modal visibility
      };
    },
    computed: {
      organizers() {
        return this.$store.getters.organizers;
      }
    },
    methods: {
      async submitOrganizer() {
        if (this.newOrganizer.id) {
          await this.$store.dispatch('updateOrganizer', this.newOrganizer); // Update existing organizer
        } else {
          await this.$store.dispatch('createOrganizer', this.newOrganizer); // Create new organizer
        }
        this.resetForm();
      },
      openEditModal(organizer) {
        this.newOrganizer = { ...organizer }; // Load selected organizer into the form
        this.isEditModalVisible = true; // Show modal
      },
      closeEditModal() {
        this.resetForm();
        this.isEditModalVisible = false; // Hide modal
      },
      async deleteOrganizer(organizerId) {
        await this.$store.dispatch('deleteOrganizer', organizerId);
      },
      resetForm() {
        this.newOrganizer = { id: null, name: '', email: '' }; // Reset the form fields
      },
      async updateOrganizer() {
        await this.$store.dispatch('updateOrganizer', this.newOrganizer); // Dispatch update
        this.closeEditModal(); // Close modal
      }
    },
    created() {
      this.$store.dispatch('fetchOrganizers');
    }
  };
  </script>
  
  <style scoped>
  .organizers-management {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .organizer-form {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: white;
  }
  
  .organizers-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .organizers-table th,
  .organizers-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .organizers-table th {
    background-color: #f2f2f2;
  }
  
  .modal {
    display: block; /* Show modal */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    border-radius: 8px; /* Rounded corners */
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  