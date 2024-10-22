import { createStore } from 'vuex';
import api from '@/services/api';

function getLocalStorageItem(key) {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
}

const user = getLocalStorageItem('user');
const token = localStorage.getItem('token');

export default createStore({
  state: {
    user: user || null,
    token: token || '',
    events: [],
    tickets: [],
    organizers: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
    },
    clearAuthData(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete api.defaults.headers['Authorization'];
    },
    setEvents(state, events) {
      state.events = events;
    },
    setTickets(state, tickets) {
      state.tickets = tickets;
    },
    setOrganizers(state, organizers) {
      state.organizers = organizers;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    async fetchEvents({ commit }) {
      const response = await api.getEvents();
      commit('setEvents', response.data);
    },
    async fetchTickets({ commit }) {
      const response = await api.getTickets();
      commit('setTickets', response.data);
    },
    async fetchOrganizers({ commit }) {
      const response = await api.getOrganizers();
      commit('setOrganizers', response.data);
    },
    async createEvent({ dispatch }, event) {
      await api.createEvent(event);
      dispatch('fetchEvents');
    },
    async updateEvent({ dispatch }, event) {
      await api.updateEvent(event);
      dispatch('fetchEvents');
    },
    async deleteEvent({ dispatch }, eventId) {
      await api.deleteEvent(eventId);
      dispatch('fetchEvents');
    },
    async createTicket({ dispatch }, ticket) {
      await api.createTicket(ticket);
      dispatch('fetchTickets');
    },
    async updateTicket({ dispatch }, ticket) {
      await api.updateTicket(ticket);
      dispatch('fetchTickets');
    },
    async deleteTicket({ dispatch }, ticketId) {
      await api.deleteTicket(ticketId);
      dispatch('fetchTickets');
    },
    async buyTicket({ dispatch }, ticketId) {
      await api.buyTicket(ticketId);
      dispatch('fetchTickets');
    },
    logout({ commit }) {
      commit('clearAuthData');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    events: state => state.events,
    tickets: state => state.tickets,
    organizers: state => state.organizers
  }
});