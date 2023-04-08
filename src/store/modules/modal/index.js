import getters from "@/store/modules/modal/getters";
import mutations from '@/store/modules/modal/mutations'
const state = {
    modal:{
        component:{},
        data:{}
    }
}
export default {
    namespaced:true,
    state,
    getters,
    mutations
}
