<template>
  <main-layout>
    <div v-for="(evaluation) in this.$store.state.evaluations" :key="evaluation.id">
      <p>{{String(new Date(evaluation.createdOn*1000).getDate() )+'/'+String( new Date(evaluation.createdOn*1000).getMonth())}}</p>
      <p>{{evaluation.createdBy}}</p>
      <!-- <p>{{evaluation.id}}</p> -->
      <p>{{evaluation.clients}}</p>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
export default {
  components: {
    MainLayout
  }
};
</script>