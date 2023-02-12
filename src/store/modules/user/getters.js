export default {
    getSignedInUserData(state) {
        if (!state.userData) {
            state.userData = JSON.parse(localStorage.getItem('userData'));
        }
        return state.userData;
    },
}
