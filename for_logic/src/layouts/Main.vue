<template>
  <div class="container">
    <img style="width:100%" src="https://forlogic.net/app/uploads/2019/07/logoforlogic.png" />

    <v-link class="menu-item" href="/">Home</v-link>
    <v-link class="menu-item" v-if="!$store.state.user.isLogged" href="/login">Login</v-link>
    <v-link class="menu-item" v-if="!$store.state.user.isLogged" href="/signup">Signup</v-link>
    <v-link class="menu-item" v-if="$store.state.user.isLogged" href="/evaluation">New Evaluation</v-link>
    <v-link class="menu-item" v-if="$store.state.user.isLogged" href="/newclient">New Client</v-link>
    <v-link class="menu-item" v-if="$store.state.user.isLogged" href="/results">Results</v-link>
    <a class="menu-item" v-if="$store.state.user.isLogged" @click="signOut()">Logout</a>

    <slot></slot>
  </div>
</template>

<script>
import VLink from "../components/VLink.vue";
import firebase from "firebase";

export default {
  components: {
    VLink
  },
  methods: {
    signOut() {
      this.$store.commit("SET_CLIENTS", null);
      this.$store.commit("SET_EVALUATIONS", null);
      firebase.auth().signOut();
    }
  }
  //   beforeMount() {
  //     console.log("fetching");
  //   }
};
</script>

<style scoped>
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu-item {
  margin: 10px;
}
</style>