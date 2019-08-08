import Vue from 'vue'
import App from './App.vue'
import api from './common/api'
import vuetify from './plugins/vuetify';
import router from './router'
import {store} from './store'
import './assets/sass/main.scss'

Vue.use(vuetify);

api(Vue);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
