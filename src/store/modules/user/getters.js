export default {
    getSignedInUserData(state) {
        if (!state.userData?.userNo) {
            state.userData = JSON.parse(localStorage.getItem('userData'));
        }
        console.log('getters', state.userData);
        return state.userData;
    },
}
