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
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'UserLogin',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', { email: this.email, password: this.password });
          this.$router.push('/dashboard');
        } catch (error) {
          this.errorMessage = error.response ? error.response.data.message : 'Login failed';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>