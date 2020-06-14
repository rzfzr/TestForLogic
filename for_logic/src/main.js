import Vue from 'vue'
import routes from './routes'
import store from "./store";
import Main from "./layouts/Main.vue"
import vuetify from './plugins/vuetify';



const fire = require('./fire.js')
fire.auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});




Vue.config.productionTip = false;



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

  vuetify,

  render(h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})