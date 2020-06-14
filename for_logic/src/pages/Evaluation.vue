<template>
  <main-layout>
    <v-text-field label="Month/Year" v-model="date"></v-text-field>
    <v-select v-model="clients" :items="items" attach chips label="Clients" multiple></v-select>
    <v-text-field label="Grade" v-model="grade"></v-text-field>
    <v-text-field label="Reason" v-model="reason"></v-text-field>
    <v-btn @click="createEvaluation">Create</v-btn>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";

const fire = require("../fire.js");
export default {
  data() {
    return {
      date: "",
      clients: "",
      grade: "",
      reason: "",
      items: ["foo", "bar", "fizz", "buzz"],
      error: null
    };
  },
  components: {
    MainLayout
  },
  methods: {
    createEvaluation() {
      fire.EvaluationsCollection.add({
        date: this.date,
        clients: this.clients,
        grade: this.grade,
        reason: this.reason,
        createdOn: new Date(),
        createdBy: this.$store.state.user.data.email
      })
        .then()
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>