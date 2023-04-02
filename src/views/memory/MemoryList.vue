<template>
    <div>
        <div class="memory-wrap">
            <div class="top">
                <div class="wrap">
                    <input type="text" v-model="searchKeyword" @input="resetMemoryList" placeholder="검색어를 입력해주세요">
                    <div class="btn-filter" @click="openModal('filterModalOpened')">
                        <span>필터</span>
                    </div>
                </div>
                <div class="wrap">
                    <p class="total">전체 {{ memoryListPageInfo?.totalElement }}개 중 {{ memoryListPageInfo?.pageSize * (memoryListPageInfo.page + 1) }}개</p>
                    <div class="btn-add" @click="openModal('editModalOpened')">등록</div>
                </div>
            </div>
            <div class="list">
<!--                <div v-for="(v, i) in totalMemoryList" :key="`memory_${i}`" class="item">-->
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
                <infinite-loading @infinite="infiniteHandler" :key="key"></infinite-loading>
            </div>
        </div>

        <edit-modal v-if="modal.editModalOpened" :opened="modal.editModalOpened" @editSuccess="editSuccess" @closeEditModal="closeModal('editModalOpened')"></edit-modal>
        <filter-modal v-if="modal.filterModalOpened" :opened="modal.filterModalOpened"></filter-modal>
    </div>
</template>

<script>
import 'vue2-datepicker/index.css';
import {mapGetters} from "vuex";
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

        // 여기서 하든가 mutations에서 하든가
        // totalMemoryList() {
        //     this.totalList.push(...this.memoryList);
        //     return this.totalList;
        // },
    },
    data() {
        return {
            key:1,
            modal: {
                editModalOpened: false,
                filterModalOpened: false,
            },
            searchKeyword: '',
            page: 1,
            limit: 10,
            // totalList: [],
        }
    },
    methods: {
        infiniteHandler($state) {
                const page = this.page;
                const limit = this.limit;

                const userNo = this.$store.getters['user/getSignedInUserData'].userNo;
                this.$store.dispatch('memory/MEMORY_LIST', {
                    userNo,
                    page,
                    limit,

                    address: '',
                    // category: '', // 얘는 카테고리 검색할때만 보내기
                    startDate: '',
                    endDate: '',
                    searchText: this.searchKeyword,
                })
                .then(response => {
                    // console.log(response);

                    if (this.memoryListPageInfo.hasNext) {
                        this.page += 1;
                        $state.loaded();
                    } else {
                        $state.complete();
                    }

                })
                .catch(e => {
                    console.log(e);
                });

        },

        // fetchMemory(page = 1, limit = 2) {
        fetchMemory(page, limit) {
            const userNo = this.$store.getters['user/getSignedInUserData'].userNo;
            this.$store.dispatch('memory/MEMORY_LIST', {
                userNo,
                page,
                limit,

                address: '',
                // category: '', // 얘는 카테고리 검색할때만 보내기
                startDate: '',
                endDate: '',
                searchText: this.searchKeyword,

            })
            .then(response => {
                // console.log(response);
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

            // TODO: 수정필요
            this.fetchMemory(1, 10);
        },

        resetMemoryList() {
            this.key += 1;
            // this.$store.commit('memory/MEMORY_LIST_RESET');
            // this.page = 1;
        },
    },

    beforeMount() {
        this.$store.dispatch('memory/MEMORY_RESET');
    },
}
</script>

<style scoped>

</style>
