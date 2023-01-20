import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { router } from "@/routes";

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

// 이 코드가 여기에 있으면 안됌
// Vue.use(VueRouter);
