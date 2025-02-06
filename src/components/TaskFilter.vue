<template>
    <div class="mb-4">
      <select v-model="selectedState" @change="updateFilter" class="w-48 px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
        <option value="">Todas</option>
        <option value="1">Pendiente</option>
        <option value="2">Finalizada</option>
        <option value="3">Cancelada</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedState: '',
      };
    },
    methods: {
      updateFilter() {
        this.$emit('filter-changed', this.selectedState);
      },
    },
  };
  </script>