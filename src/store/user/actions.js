import { signUp, signIn } from '@/api/index';

export default {
    // vuex 2단계: api 호출해서 받은 데이터로 mutation에 commit
    SIGN_UP ({ commit }, payload) {
    // SIGN_UP (payload) {
        signUp(payload.id, payload.password)
        .then(response => {
            commit('SIGN_UP');
            return response;
        })
        .catch(e => {
            console.error(e);
        });

        // return signUp(payload.id, payload.password);
    },

    SIGN_IN({ commit }, payload) {
        signIn(payload.id, payload.password)
        .then(response => {
            console.log(response);
            commit('SIGN_IN', response);
            return response;
        })
        .catch(e => {
            console.error(e);
        });
    },
}