<template>
  <main-layout>
    <v-text-field label="Month/Year" v-model="date" v-mask="'##/####'"></v-text-field>
    <v-select
      v-model="clients"
      :items="this.$store.state.clients"
      item-text="companyName"
      item-value="id"
      attach
      chips
      label="Clients"
      multiple
      return-object
    ></v-select>

    <div v-for="(client,i) in clients" :key="client.companyName">
      <p>{{client.companyName}}</p>
      <v-text-field label="Grade" v-model="grades[i]"></v-text-field>
      <v-text-field label="Reason" v-model="reasons[i]"></v-text-field>
    </div>
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
      grades: [],
      reasons: [],
      items: [],
      error: null
    };
  },
  components: {
    MainLayout
  },
  methods: {
    createEvaluation() {
      var clients = [];
      for (var client in this.clients) {
        var newClient = {
          id: this.clients[client].id,
          grade: this.grades[client],
          reasons: this.reasons[client]
        };
        clients.push(newClient);
      }

      console.log("grades", this.grades);
      console.log(clients);

      fire.EvaluationsCollection.add({
        clients: clients,
        // grade: this.grades,
        // reason: this.reason,
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