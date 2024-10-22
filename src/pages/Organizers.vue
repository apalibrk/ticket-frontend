<template>
    <div>
      <h2>Organizers</h2>
      <OrganizerForm v-if="showForm" :organizer="selectedOrganizer" @close="closeForm" />
      <button @click="createOrganizer">Create New Organizer</button>
      <ul>
        <li v-for="organizer in organizers" :key="organizer.id">
          {{ organizer.name }}
          <button @click="editOrganizer(organizer)">Edit</button>
          <button @click="deleteOrganizer(organizer.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import OrganizerForm from '@/components/OrganizerForm.vue';
  
  export default {
    components: { OrganizerForm },
    data() {
      return {
        showForm: false,
        selectedOrganizer: null
      };
    },
    computed: {
      organizers() {
        return this.$store.getters.organizers;
      }
    },
    methods: {
      createOrganizer() {
        this.selectedOrganizer = null;
        this.showForm = true;
      },
      editOrganizer(organizer) {
        this.selectedOrganizer = organizer;
        this.showForm = true;
      },
      closeForm() {
        this.showForm = false;
        this.$store.dispatch('fetchOrganizers');
      },
      async deleteOrganizer(id) {
        await this.$store.dispatch('deleteOrganizer', id);
        this.$store.dispatch('fetchOrganizers');
      }
    },
    created() {
      this.$store.dispatch('fetchOrganizers');
    }
  };
  </script>
  