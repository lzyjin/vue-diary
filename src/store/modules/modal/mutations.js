export default {
    setModal(state, modal = { component: {}, data: {} }) {
        state.modal = modal;
    },
    closeModal(state) {
        state.modal = { component: {}, data: {} };
    }
};
