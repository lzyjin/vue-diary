import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { router } from "@/routes";
import {store} from './store'
import { register } from 'swiper/element/bundle';
import ObserveVisibility from 'vue-observe-visibility'
import ModalList from "@/components/ModalList";


Vue.config.productionTip = false;
const modalList = Object.values(ModalList)
modalList.forEach( modal => {
  Vue.component(modal.name, modal)
})
/**
 * vue file
 * -> import , component: { register }
 *
 * -> can use file only
 */

Vue.use(VueRouter)
    .use(ObserveVisibility);

register();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// 이 코드가 여기에 있으면 안됌
// Vue.use(VueRouter);
