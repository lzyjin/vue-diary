export default {
    MEMORY_LIST(state, payload) {
        state.memoryList = payload;
        console.log(state.memoryList);
    },
}

