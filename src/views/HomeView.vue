<template>
  <div class="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-2xl font-bold mb-6 text-center">Lista de Tareas</h1>
      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <div class="w-full lg:w-1/3 lg:sticky lg:top-8">
          <TaskForm ref="taskForm" :task-to-edit="selectedTask" @task-added="fetchTasks" />
        </div>
        <div class="w-full lg:w-2/3">
          <TaskList ref="taskList" @edit-task="selectedTask = $event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';

export default {
  components: {
    TaskList,
    TaskForm,
  },
  data() {
    return {
      selectedTask: null,
    };
  },
  methods: {
    async fetchTasks() {
      this.selectedTask = null;
      this.$refs.taskList.fetchTasks();
    },
  },
};
</script>