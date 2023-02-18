import { listCalendar, saveCalendar, removeCalendar, } from "@/api";


export default {
    CALENDAR_LIST({ commit }, payload) {
        return listCalendar(payload.userNo, payload.year, payload.month)
            .then(response => {
                // console.log(response);
                // console.log(commit);

                commit('CALENDAR_LIST', response.data.data);
                return response;
            });
    },

    CALENDAR_SAVE({ commit }, payload) {
        console.log(commit, payload);
        return saveCalendar(payload.userNo, payload.contents, payload.regDate)
            .then(response => {
                console.log(response);
                return response;
            });
    },

    CALENDAR_REMOVE({ commit }, diaryNo) {
        console.log(commit, diaryNo);
        return removeCalendar(diaryNo)
            .then(response => {
                console.log(response);
                return response;
            });
    },
}
