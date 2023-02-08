import Vue from "vue";
import Vuex from "vuex";
import moduleUser from './modules/user/index';
import moduleCalendar from './modules/calendar/index';


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        moduleUser,
        moduleCalendar,
    }
});
