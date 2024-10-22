<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', { email: this.email, password: this.password });
          this.$router.push('/dashboard');
        } catch (error) {
          alert('Invalid login credentials');
        }
      }
    }
  };
  </script>
  