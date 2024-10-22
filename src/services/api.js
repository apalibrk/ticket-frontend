import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  async login(credentials) {
    try {
      const response = await apiClient.post('/organizers/login', credentials);
      const token = response.data.token;
      apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
      return response;
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  async register(data) {
    return apiClient.post('/organizers', data);
  },
  getEvents() {
    return apiClient.get('/events');
  },
  getTickets() {
    return apiClient.get('/tickets');
  },
  getOrganizers() {
    return apiClient.get('/organizers');
  },
  createEvent(event) {
    return apiClient.post('/events', event);
  },
  createTicket(ticket) {
    return apiClient.post('/tickets', ticket);
  },
  deleteTicket(ticketId) {
    return apiClient.delete(`/tickets/${ticketId}`);
  },
  buyTicket(ticketId) {
    return apiClient.post(`/tickets/${ticketId}/buy`);
  },
  updateEvent(id, event) {
    return apiClient.put(`/events/${id}`, event);
  },
  updateTicket(id, ticket) {
    return apiClient.put(`/tickets/${id}`, ticket);
  },
  updateOrganizer(id, organizer) {
    return apiClient.put(`/organizers/${id}`, organizer);
  }
};