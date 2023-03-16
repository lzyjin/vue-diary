export default {
    MEMORY_LIST(state, payload) {
        state.memoryList = payload;
        console.log(state.memoryList);
    },

    MEMORY_PAGEINFO(state, payload) {
        state.memoryListPageInfo = payload;
        console.log(state.memoryListPageInfo);
    },
}

