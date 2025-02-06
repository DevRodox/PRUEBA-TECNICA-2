<template>
  <div class="bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h3 class="text-xl font-bold mb-2">{{ task.title }}</h3>
    <p class="text-gray-600 mb-4">{{ task.description }}</p>
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-500">Estado: {{ getStateName(task.state_id) }}</span>
      <div>
        <button @click="editTask" class="text-blue-500 hover:text-blue-700 focus:outline-none">Editar</button>
        <button @click="toggleTaskState" class="ml-2 text-green-500 hover:text-green-700 focus:outline-none">Cambiar Estado</button>
        <button @click="deleteTask" class="ml-2 text-red-500 hover:text-red-700 focus:outline-none">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
import taskService from '../services/taskService';

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getStateName(stateId) {
      return ["Pendiente", "Finalizada", "Cancelada"][stateId - 1] || "Desconocido";
    },
    editTask() {
      this.$emit('edit-task', this.task);
    },
    async toggleTaskState() {
      try {
        const newStateId = this.task.state_id === 1 ? 2 : 1;
        await taskService.updateTaskState(this.task.id, newStateId);
        this.$emit('task-state-updated');
      } catch (error) {
        console.error('Error actualizando estado:', error);
      }
    },
    async deleteTask() {
      if (confirm(`¿Eliminar tarea "${this.task.title}"?`)) {
        try {
          await taskService.deleteTask(this.task.id);
          this.$emit('task-deleted');
        } catch (error) {
          console.error('Error eliminando tarea:', error);
        }
      }
    },
  },
};
</script>