<template>
    <div class="login-container">
      <h2 class="text-center mb-4">Login</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                v-model="email"
                type="email"
                id="email"
                required
                class="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                v-model="password"
                type="password"
                id="password"
                required
                class="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserLogin', 
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
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto; 
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    border-radius: 8px;
    background-color: #fff;
  }
  
  .card {
    border: none;
    border-radius: 8px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  .btn {
    border-radius: 8px;
    padding: 10px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  