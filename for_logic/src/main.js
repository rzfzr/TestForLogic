import Vue from 'vue'
import routes from './routes'
import store from "./store";
import Main from "./layouts/Main.vue"
import NewClient from "./pages/NewClient.vue"
import vuetify from './plugins/vuetify';


import Vuelidate from "vuelidate";
import VueTheMask from 'vue-the-mask';



Vue.use(VueTheMask);

Vue.use(Vuelidate);


const fire = require('./fire.js')
fire.auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  if (store.state.user.isLogged) {

    fire.ClientsCollection.orderBy('companyName', 'asc').onSnapshot(querySnapshot => {
      let clients = []
      querySnapshot.forEach(doc => {
        let client = doc.data()
        client.id = doc.id
        clients.push(client)
      })
      store.commit('SET_CLIENTS', clients)
    })

    fire.EvaluationsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      let evaluations = []
      querySnapshot.forEach(doc => {
        let evaluation = doc.data()
        evaluation.id = doc.id
        evaluations.push(evaluation)
      })
      store.commit('SET_EVALUATIONS', evaluations)
    })
  }
});

Vue.config.productionTip = false;



const app = new Vue({
  store,
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  components: {
    Main,
    NewClient
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