<template>
    <div>
      <h2>Dashboard</h2>
      <nav>
        <router-link to="events">Manage Events</router-link>
        <router-link to="tickets">Manage Tickets</router-link>
        <router-link to="organizers">Manage Organizers</router-link>
      </nav>
      <router-view />
    </div>
  </template>
  