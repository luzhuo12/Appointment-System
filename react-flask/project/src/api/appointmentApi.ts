import axios from 'axios';
import { Appointment } from '../types';

/**
 * Define the base URL for the API endpoints
 * This URL is pointing to a local server running on port 5000
 * The API_BASE constant can be used to construct full URLs for API requests
 */
const API_BASE = 'http://127.0.0.1:5000/api';

export const appointmentApi = {
  // Function to fetch all appointments from the server
  getAll: async () => {
    try {
      // Use axios to send a GET request to the appointments endpoint
      const response = await axios.get(`${API_BASE}/appointments`);
      // Return the data part of the response
      return response.data;
    } catch (error) {
      // If there is an error, throw a new Error with a descriptive message
      throw new Error('Failed to fetch appointments. Reason: ' + error);
    }
  },

  // This function is designed to create a new appointment by sending a POST request to the server.
  create: async (data: Omit<Appointment, 'id'>) => {
    try {
      // // Using axios to send a POST request to the server's '/saveappointment' endpoint with the provided data.
      const response = await axios.post(`${API_BASE}/saveappointment`, data);
      // If the request is successful, return the data from the server's response.
      return response.data;
    } catch (error) {
      // If an error occurs during the request or data processing, throw a new Error with a detailed message.
      throw new Error('Failed to create appointment. Reason: ' + error);
    }
  }
};