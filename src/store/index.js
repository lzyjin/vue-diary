import Vue from "vue";
import Vuex from "vuex";
import moduleUser from './user/index';
import moduleCalendar from './calendar/index';


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        moduleUser,
        moduleCalendar,
    }
});
