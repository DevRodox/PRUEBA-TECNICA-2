import axios from 'axios';

const API_URL = 'https://8ff8-2806-103e-27-38b4-80c5-add3-5c4f-5790.ngrok-free.app/api/task';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json'
  }
});


export default {
  async getTasks() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
      return [];
    }
  },

  async createTask(task) {
    try {
      const response = await api.post('/', task);
      return response.data;
    } catch (error) {
      console.error("Error creando tarea:", error);
      throw error;
    }
  },

  async updateTask(id, task) {
    try {
      const response = await api.put(`/${id}`, task);
      return response.data;
    } catch (error) {
      console.error("Error actualizando tarea:", error);
      throw error;
    }
  },

  async updateTaskState(id, stateId) {
    try {
      const response = await api.put(`/${id}/state/${stateId}`);
      return response.data;
    } catch (error) {
      console.error("Error actualizando estado:", error);
      throw error;
    }
  },

  async deleteTask(id) {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      throw error;
    }
  },
};

