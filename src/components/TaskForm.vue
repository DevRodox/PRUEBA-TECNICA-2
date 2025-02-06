<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">{{ task.id ? "Editar" : "Agregar" }} Tarea</h2>
    <form @submit.prevent="submitTask">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input v-model="task.title" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea v-model="task.description" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select v-model="task.state_id" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          <option value="1">Pendiente</option>
          <option value="2">Finalizada</option>
          <option value="3">Cancelada</option>
        </select>
      </div>
      <div class="flex items-center">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ task.id ? "Actualizar" : "Guardar" }}
        </button>
        <button v-if="task.id" type="button" @click="resetForm" class="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import taskService from '../services/taskService';

export default {
  props: {
    taskToEdit: Object,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        state_id: 1,
      },
    };
  },
  watch: {
    taskToEdit: {
      handler(newTask) {
        if (newTask) {
          this.task = { ...newTask };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async submitTask() {
      try {
        if (this.task.id) {
          await taskService.updateTask(this.task.id, this.task);
        } else {
          await taskService.createTask(this.task);
        }
        this.$emit('task-added');
        this.resetForm();
      } catch (error) {
        console.error('Error al guardar tarea:', error);
      }
    },
    resetForm() {
      this.task = { title: '', description: '', state_id: 1 };
    },
  },
};
</script>