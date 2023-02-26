import Vue from "vue";
import Vuex from "vuex";
import moduleUser from './modules/user/index';
import moduleCalendar from './modules/calendar/index';
import common from "@/store/modules/common";


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        common,
        moduleUser,
        moduleCalendar,
    }
});
