import { saveMemory, listMemory } from "@/api";

export default {
    MEMORY_SAVE({ commit }, payload) {
        return saveMemory(payload)
        .then(response => {
            console.log(response);
            return response;
        });
    },

    MEMORY_LIST({ commit }, payload) {
        return listMemory(payload.userNo, payload.page, payload.limit)
        .then(response => {
            console.log(response);
            return response;
        })
    },

}
