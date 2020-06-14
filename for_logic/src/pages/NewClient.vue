<template>
  <main-layout>
    <v-text-field label="Company Name" v-model="companyName"></v-text-field>
    <v-text-field label="Full Name" v-model="fullName"></v-text-field>
    <v-text-field label="CNPJ" v-model="cnpj"></v-text-field>
    <v-text-field label="Initial Date" v-model="initialDate"></v-text-field>
    <v-btn @click="createPost">Create</v-btn>
    <!-- 
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="initialDate" label="Initial Date" readonly v-bind="attrs" v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="initialDate" @input="dateMenu = false"></v-date-picker>
    </v-menu>-->
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";

import firebase from "firebase";
export default {
  data() {
    return {
      companyName: "",
      fullName: "",
      cnpj: "",
      initialDate: "",
      // initialDate: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      error: null
    };
  },
  components: {
    MainLayout
  },
  methods: {
    createPost() {
      firebase.postsCollection
        .add({
          companyName: "",
          fullName: "",
          cnpj: "",
          initialDate: "",
          createdOn: new Date(),
          // eslint-disable-next-line no-undef
          createdBy: $store.state.user.data.email
        })
        // eslint-disable-next-line no-unused-vars
        .then(ref => {
          this.post.content = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>