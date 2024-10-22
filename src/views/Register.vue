<template>
    <div class="register-container">
      <h2 class="text-center mb-4">Register</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                v-model="name"
                id="name"
                required
                class="form-control"
                placeholder="Enter your name"
              />
            </div>
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
              <label for="phone">Phone:</label>
              <input
                v-model="phone"
                type="tel"
                id="phone"
                required
                class="form-control"
                placeholder="Enter your phone number"
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
            <button type="submit" class="btn btn-primary btn-block">Register</button>
          </form>
        </div>
      </div>
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
  
  <style scoped>
  .register-container {
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
  