<template>
    <div>
      <h2>{{ organizer ? 'Edit Organizer' : 'Create Organizer' }}</h2>
      <form @submit.prevent="submit">
        <input v-model="form.name" placeholder="Organizer Name" required />
        <button type="submit">Save</button>
        <button @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      organizer: Object
    },
    data() {
      return {
        form: {
          name: this.organizer ? this.organizer.name : ''
        }
      };
    },
    methods: {
      async submit() {
        if (this.organizer) {
          await this.$store.dispatch('updateOrganizer', { ...this.organizer, ...this.form });
        } else {
          await this.$store.dispatch('createOrganizer', this.form);
        }
        this.$emit('close');
      }
    }
  };
  </script>
  