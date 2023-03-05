import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user/index';
import calendar from './modules/calendar/index';
import memory from './modules/memory/index';
import common from "@/store/modules/common";


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        common,
        user,
        calendar,
        memory,
    }
});
