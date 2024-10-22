<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label>Name:</label>
          <input v-model="name" required />
        </div>
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Phone:</label>
          <input v-model="phone" type="tel" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        name: '',
        email: '',
        phone: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          await api.register({ name: this.name, email: this.email, phone: this.phone, password: this.password });
          this.$router.push('/login');
        } catch (error) {
          alert('Error during registration');
        }
      }
    }
  };
  </script>