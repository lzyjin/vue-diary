import { signUp } from '@/api/index';

export default {
    // vuex 2단계: api 호출해서 받은 데이터로 mutation에 commit
    SIGN_UP ({ commit }, payload) {
        signUp(payload.id, payload.password)
            .then(({data}) => {
                commit('SIGN_UP', data);
            })
            .catch(e => {
                console.error(e);
            });
    }
}
