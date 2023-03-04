import { saveMemory } from "@/api";


export default {
    MEMORY_SAVE({ commit }, payload) {
        return saveMemory(payload)
        .then(response => {
            console.log(response);
            return response;
        });
    },

}
