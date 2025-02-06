<template>
  <div>
    <TaskFilter @filter-changed="setFilter" />
    <div v-if="loading" class="text-center text-gray-600">Cargando...</div>
    <div v-else class="h-[calc(100vh-200px)] overflow-y-auto">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @task-updated="fetchTasks"
        @task-state-updated="fetchTasks"
        @task-deleted="fetchTasks"
        @edit-task="editTask"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';
import TaskFilter from './TaskFilter.vue';
import taskService from '../services/taskService';

export default {
  components: {
    TaskItem,
    TaskFilter,
  },
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      loading: true,
      filterState: '',
    };
  },
  async created() {
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      this.loading = true;
      try {
        this.tasks = await taskService.getTasks();
        this.filteredTasks = this.tasks;
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      } finally {
        this.loading = false;
      }
    },
    setFilter(state) {
      this.filterState = state;
      if (state) {
        this.filteredTasks = this.tasks.filter(task => task.state_id == state);
      } else {
        this.filteredTasks = this.tasks;
      }
    },
    editTask(task) {
      this.$emit('edit-task', task);
    },
  },
};
</script>