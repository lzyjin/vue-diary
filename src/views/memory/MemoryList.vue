<template>
    <div>
        <div class="memory-wrap">
            <div class="top">
                <div class="wrap">
                    <input
                        type="text"
                        v-model="searchKeyword"
                        @input="resetMemoryList"
                        placeholder="검색어를 입력해주세요"
                    />
                    <div class="btn-filter" @click="openModal('filterModalOpened')">
                        <span>필터</span>
                    </div>
                </div>
                <div class="wrap">
                    <p class="total">전체 {{ memoryListPageInfo?.totalElement }}개 중 {{ memoryList.length }}개</p>
                    <div class="btn-add" @click="openModal('editModalOpened')">등록</div>
                </div>
                <div class="wrap">
                    <p>
                        <i class="xi-filter"></i> 카테고리: {{ this.filter.category }} / 일자:
                        {{ this.filter.startDate }} ~ {{ this.filter.endDate }} / 주소: {{ this.filter.address }}
                    </p>
                </div>
            </div>
            <div class="list">
                <!--<div v-for="(v, i) in totalMemoryList" :key="`memory_${i}`" class="item">-->
                <div v-for="(v, i) in memoryList" :key="`memory_${i}`" class="item">
                    <router-link :to="{ path: `/memoryView/${v.memoryNo}` }">
                        <div class="img">
                            <img
                                :src="`http://121.161.237.50:9999/origin/${v.firstPhoto.photoUrl}`"
                                alt=""
                                v-if="v.firstPhoto.photoUrl !== null"
                            />
                            <img :src="require(`@/assets/images/noimage.png`)" alt="" v-else />
                        </div>
                        <div class="text">
                            <!--<div class="edit"><i class="xi-ellipsis-h"></i></div>-->
                            <p class="desc">{{ v.contents }}</p>
                            <p class="date">{{ v.regDate }}</p>
                        </div>
                    </router-link>
                </div>
                <div
                    v-observe-visibility="{
                        callback: visibilityChanged,
                        throttle: 2000,
                        throttleOptions: {
                            leading: 'visible',
                        },
                    }"
                    :key="key"
                ></div>
            </div>
        </div>

        <!-- TODO: Edit 모달 - 등록, 수정 되는지 확인 필요 -->

        <filter-modal
            v-if="modal.filterModalOpened"
            :opened="modal.filterModalOpened"
            :savedFilter="{
                address: filter.address,
                category: filter.category,
                startDate: filter.startDate,
                endDate: filter.endDate,
            }"
            @set-filter="setFilter"
            @set-success="closeModal('filterModalOpened')"
            @close-filter-modal="closeModal('filterModalOpened')"
        ></filter-modal>
    </div>
</template>

<script>
import 'vue2-datepicker/index.css';
import { mapGetters } from 'vuex';
// import {forEach} from 'lodash';
import { debounce } from 'lodash';
import EditModal from '@/components/modal/EditModal.vue';
import FilterModal from '@/components/modal/FilterModal.vue';
import ModalList from '@/components/ModalList';

export default {
    name: 'MemoryList',
    components: {
        FilterModal,
        EditModal,
    },
    computed: {
        ...mapGetters({
            memoryList: 'memory/memoryList',
            memoryListPageInfo: 'memory/memoryListPageInfo',
        }),

        // 여기서 하든가 mutations에서 하든가
        // totalMemoryList() {
        //     this.totalList.push(...this.memoryList);
        //     return this.totalList;
        // },
    },
    data() {
        return {
            modal: {
                editModalOpened: false,
                filterModalOpened: false,
            },
            filter: {
                address: '',
                category: '',
                startDate: '',
                endDate: '',
            },
            searchKeyword: '',

            page: 1,
            limit: 10,
            // totalList: [],
            key: 1,
            isVisible: true,
        };
    },
    methods: {
        // TODO: 뷰페이지 들어갔다가 나오면 클릭한 글 위치에 돌아오도록 하기!!
        visibilityChanged: _.debounce(function (isVisible, entry) {
            this.isVisible = isVisible;

            let payload = {
                userNo: this.$store.getters['user/getSignedInUserData'].userNo,
                page: this.page,
                limit: this.limit,

                address: this.filter.address,
                startDate: this.filter.startDate,
                endDate: this.filter.endDate,
                searchText: this.searchKeyword.trim(),
            };

            if (this.filter.category !== '') {
                payload.category = this.filter.category; // 얘는 카테고리 검색할때만 보내기
            }

            if (this.memoryListPageInfo.hasNext && this.isVisible) {
                this.$store
                    .dispatch('memory/MEMORY_LIST', payload)
                    .then((response) => {
                        console.log(response);
                        this.page += 1;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        }, 300),

        openModal(modalType) {
            this.modal[`${modalType}`] = true;

            this.modal.editModalOpened = true;
            this.modal.isModify = true;

            const { EditModal } = ModalList;
            const payload = {
                opened: true,
                editSuccess: this.editSuccess,
            };
            this.$store.commit('modal/setModal', {
                component: EditModal,
                data: payload,
            });
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;
        },

        editSuccess() {
            this.closeModal('editModalOpened');
            this.resetMemoryList();
        },

        setFilter(category, regDate, address) {
            console.log(category, regDate, address);

            // TODO: 이걸로 조건 추가해서 목록 불러와야함!
            this.filter.category = category;
            this.filter.startDate = regDate[0];
            this.filter.endDate = regDate[1];
            this.filter.address = address;

            this.resetMemoryList();
        },

        resetMemoryList: _.debounce(function () {
            this.$store.commit('memory/MEMORY_LIST_RESET');
            this.$store.commit('memory/MEMORY_LIST_PAGE_RESET');
            this.page = 1;
            this.key += 1;
        }, 300),
    },

    beforeMount() {
        this.resetMemoryList();
    },
};
</script>

<style scoped></style>
