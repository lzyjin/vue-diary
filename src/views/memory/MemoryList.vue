<template>
    <div>
        <div class="memory-wrap">
            <div class="top">
                <div class="wrap">
                    <input type="text" name="" id="" placeholder="검색어를 입력해주세요">
                    <div class="btn-filter" @click="openModal('filterModalOpened')">
                        <span>필터</span>
                    </div>
                </div>
                <div class="wrap">
                    <p class="total">전체 개 중 {{ memoryListPageInfo?.totalElement }}개</p>
                    <div class="btn-add" @click="openModal('editModalOpened')">등록</div>
                </div>
            </div>
            <div class="list">
                <div v-for="(v, i) in memoryList" :key="`memory_${i}`" class="item">
                    <router-link :to="{ path: `/memoryView/${v.memoryNo}`, }">
                        <div class="img">
                            <img :src="`http://121.161.237.50:9999/origin/${v.firstPhoto.photoUrl}`" alt="" v-if="v.firstPhoto.photoUrl !== null">
                            <img :src="require(`@/assets/images/noimage.png`)" alt="" v-else>
                        </div>
                        <div class="text">
                            <!--<div class="edit"><i class="xi-ellipsis-h"></i></div>-->
                            <p class="desc">{{ v.contents }}</p>
                            <p class="date">{{ v.regDate }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <edit-modal v-if="modal.editModalOpened" :opened="modal.editModalOpened" @editSuccess="editSuccess" @closeEditModal="closeModal('editModalOpened')"></edit-modal>
        <filter-modal v-if="modal.filterModalOpened" :opened="modal.filterModalOpened"></filter-modal>
    </div>
</template>

<script>
import 'vue2-datepicker/index.css';
import { mapGetters } from "vuex";
// import {forEach} from 'lodash';
import EditModal from "@/components/modal/editModal.vue";
import FilterModal from "@/components/modal/filterModal.vue";

export default {
    name: "MemoryList",
    components: {
        FilterModal,
        EditModal,
    },
    computed: {
        ...mapGetters({
            memoryList: "memory/memoryList",
            memoryListPageInfo: "memory/memoryListPageInfo",
        }),
    },
    data() {
        return {
            modal: {
                editModalOpened: false,
                filterModalOpened: false,
            },
        }
    },
    methods: {
        fetchMemory(page = 1, limit = 2) {
            const userNo = this.$store.getters['user/getSignedInUserData'].userNo;
            this.$store.dispatch('memory/MEMORY_LIST', {
                userNo,
                page,
                limit,
            })
            .then(response => {
                console.log(response);
            })
            .catch();
        },

        openModal(modalType) {
            this.modal[`${modalType}`] = true;
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;
        },

        editSuccess() {
            this.closeModal('editModalOpened');
            this.fetchMemory(1, 10);
        }

    },

    beforeMount() {
        this.$store.dispatch('memory/MEMORY_RESET');
    },
    mounted() {
        this.fetchMemory(1, 10);
    },
}
</script>

<style scoped>

</style>
