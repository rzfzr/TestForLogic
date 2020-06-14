import Vue from 'vue'
import routes from './routes'
import store from "./store";
import Main from "./layouts/Main.vue"

import * as firebase from "firebase";



Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyB7yEKyi8f_bA2TuzJSNKJiP7uAEuIiI-Q",
  authDomain: "forlogic-a4b41.firebaseapp.com",
  databaseURL: "https://forlogic-a4b41.firebaseio.com",
  projectId: "forlogic-a4b41",
  storageBucket: "forlogic-a4b41.appspot.com",
  messagingSenderId: "1069650638141",
  appId: "1:1069650638141:web:734ff15abd83b660fd8154"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});


const app = new Vue({
  store,

  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },

  components: {
    Main
  },
  computed: {
    ViewComponent() {
      const matchingView = routes[this.currentRoute]
      return matchingView ?
        require('./pages/' + matchingView + '.vue').default :
        require('./pages/404.vue').default
    }
  },
  render(h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})