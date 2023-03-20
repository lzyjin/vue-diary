export default {
    MEMORY_GET(state, payload) {
        state.currentMemory = payload;
    },

    MEMORY_LIST(state, payload) {
        state.memoryList = payload;
    },

    MEMORY_PAGEINFO(state, payload) {
        state.memoryListPageInfo = payload;
    },
}

