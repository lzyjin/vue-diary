// vuex 3단계: mutation은 state를 변경하는 곳(mutation: 변이)

export default {
    SIGN_UP(state) {
        state.moduleUser.states.signUpState = true;
    },

    SIGN_IN(state, userData) {
        console.log('mutation: ', userData);
        state.moduleUser.states.userData = userData;
        // state.userData = userData;
    },
}
