export default {
    setModal(state, modal = { component: {}, data: {} }) {
        // state.modal = modal;
        state.modal.component.push(modal.component);
    },

    closeModal(state, modalName) {
        state.modal.component.filter((v, i, arr) => {
            console.log(v);
            console.log(i);
            console.log(arr);
        });

        // state.modal = {
        //     component: [],
        //     data: {},
        // };
    },
};
