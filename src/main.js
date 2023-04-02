import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { router } from "@/routes";
import {store} from './store'
import { register } from 'swiper/element/bundle';
import InfiniteLoading from 'vue-infinite-loading';

Vue.config.productionTip = false;

Vue.use(VueRouter)
    .use(InfiniteLoading);

register();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// 이 코드가 여기에 있으면 안됌
// Vue.use(VueRouter);
