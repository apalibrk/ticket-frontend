<template>
    <div id="app">
      <header>
        <h1>Event Management System</h1>
        <nav class="navbar">
          <div class="navbar-links">
            <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
            <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
            <router-link v-if="isAuthenticated" to="/dashboard">Dashboard</router-link>
            <router-link v-if="isAuthenticated" to="/manage-tickets">Manage Tickets</router-link>
            <router-link v-if="isAuthenticated" to="/manage-events">Manage Events</router-link>
            <router-link v-if="isAuthenticated" to="/organizers">Organizers</router-link>
          </div>
          <div class="navbar-actions">
            <button v-if="isAuthenticated" @click="logout">Logout</button>
          </div>
        </nav>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'App',
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  header {
    background-color: #343a40;
    padding: 20px;
    color: white;
  }
  
  h1 {
    margin: 0;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .navbar-links {
    display: flex;
    gap: 20px;
  }
  
  .navbar-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .navbar-links a:hover {
    color: #f8f9fa;
  }
  
  .navbar-actions {
    display: flex;
  }
  
  button {
    background-color: #28a745;
    border: none;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  