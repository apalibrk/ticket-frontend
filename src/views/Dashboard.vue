<template>
    <div>
      <h2>Admin Dashboard</h2>
      <router-link to="events">Manage Events</router-link>
      <router-link to="tickets">Manage Tickets</router-link>
      <router-link to="organizers">Manage Organizers</router-link>
  
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard'
  };
  </script>
  
  <style scoped>
  /* Add some basic styling */
  </style>