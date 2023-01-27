import Vue from "vue";
import Vuex from "vuex";
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
    namespaced: true,
    state: {
        // lastLoginDate: '',
        // regDate: '',
        // userId: '',
        // userNo: 0,
        // userStatus: '',
        // withdrawalDate: '',
        signUpState: false,
    },
    mutations,
    getters,
    actions,
});
