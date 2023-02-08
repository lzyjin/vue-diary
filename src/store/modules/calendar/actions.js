import { calendarList } from "@/api";


export default {
    CALENDAR_LIST({ commit }, payload) {
        return calendarList(payload.userNo, payload.year, payload.month)
            .then(response => {
                console.log(response);
                console.log(commit);

                commit('CALENDAR_LIST', response.data.data);
                return response;
            });
    },
}
