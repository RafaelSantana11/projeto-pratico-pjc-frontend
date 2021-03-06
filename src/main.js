import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './config/router'
import store from './store/index'
import "./config/axios"

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
