<template>
  <main-layout>
    <form @submit.prevent="createEvaluation">
      <div class="form-group" :class="{ 'form-group--error': $v.date.$error }">
        <v-text-field label="Month/Year" v-model="date" v-mask="'##/####'" :validations="$v.date"></v-text-field>
        <div class="error" v-if="!$v.date.required">Date is required</div>
      </div>
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
      <div class="error" v-if="!$v.clients.required">Clients is required</div>

      <div v-for="(client,i) in clients" :key="client.companyName">
        <p>{{client.companyName}}</p>
        <v-text-field label="Grade" v-model="grades[i]"></v-text-field>
        <v-text-field label="Reason" v-model="reasons[i]"></v-text-field>
      </div>
    </form>
    <v-btn @click="createEvaluation">Create</v-btn>
  </main-layout>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { masks } from "../lib/myValidations.js";

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
      error: null,
      submitStatus: null
    };
  },
  components: {
    MainLayout
  },
  methods: {
    createEvaluation() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        var clients = [];
        for (var client in this.clients) {
          var newClient = {
            id: this.clients[client].id,
            grade: this.grades[client],
            reasons: this.reasons[client]
          };
          clients.push(newClient);
        }

        // console.log("grades", this.grades);
        // console.log(clients);

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
  },

  validations: {
    date: {
      required,
      masks: masks(["##/####"])
    },
    clients: {
      required
    },
    grades: {
      required
    },
    reasons: {
      required
    }
  }
};
</script>