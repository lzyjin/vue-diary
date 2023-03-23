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

        <edit-modal v-if="modal.editModalOpened" :opened="modal.editModalOpened"></edit-modal>

        <div v-if="modal.filterModalOpened">
            <div class="modal" :class="{opened: modal.filterModalOpened}">
                <div class="modal-top">
                    <button @click="closeModal('filterModalOpened')" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="category">
                        <div class="c-item">
                            <strong>카테고리</strong>
                            <div class="select-wrap">
                                <select name="" id="" required v-model="modal.formData.category">
                                    <option value="" disabled>카테고리 선택</option>
                                    <option value="FOOD">음식</option>
                                    <option value="SHOPPING">쇼핑</option>
                                    <option value="TRIP">여행</option>
                                    <option value="MOVIE">영화</option>
                                    <option value="STUDY">공부</option>
                                    <option value="CAFE">카페</option>
                                    <option value="EXOTIC">이색적인</option>
                                    <option value="CULTURAL_LIFE">문화생활</option>
                                    <option value="EXHIBITION">전시회</option>
                                    <option value="REVIEW">후기</option>
                                </select>
                            </div>
                        </div>
                        <div class="c-item">
                            <strong>일자</strong>
                            <date-picker v-model="modal.formData.regDate" valueType="format" range placeholder="날짜 선택"></date-picker>
                        </div>
                        <div class="c-item">
                            <strong>주소</strong>
                            <div class="input-wrap address">
                                <input type="text" name="" id="">
                            </div>
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <button class="btn-delete">
                            <i class="xi-refresh"></i>
                        </button>
                        <button class="btn-save" @click="">적용</button>
                    </div>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>

        <div v-if="modal.daumPostModalOpened">
            <div class="modal" :class="{opened: modal.daumPostModalOpened}">
                <div class="modal-top">
                    <button @click="closeModal('daumPostModalOpened')" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <DaumPostcode :on-complete=handleAddress />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import DaumPostcode from 'vuejs-daum-postcode';
import { mapGetters } from "vuex";
// import {forEach} from 'lodash';
import EditModal from "@/components/editModal";

export default {
    name: "MemoryList",
    components: {
        DaumPostcode,
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
                daumPostModalOpened: false,

                thumbList: [],

                formData: {
                    // 사용자 정보(필수)
                    user: {...this.$store.getters["user/getSignedInUserData"]}, // store의 state 넣기

                    // 입력한 값(필수)
                    category: '',
                    address: '',
                    memoryNo: null, // 서버에서 없으면 등록, 있으면 수정으로 인식함
                    regDate: '',
                    contents: '',

                    // 이미지 파일(선택)
                    fileList: [],
                    // firstMultipartFile: null,
                    // firstPhoto: {
                    //     photoNo: null,
                    //     photoUrl: null,
                    // },
                    // secondMultipartFile: null,
                    // secondPhoto: {
                    //     photoNo: null,
                    //     photoUrl: null,
                    // },
                    // thirdMultipartFile: null,
                    // thirdPhoto: {
                    //     photoNo: null,
                    //     photoUrl: null,
                    // }
                },
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

        handleAddress: function (data) {
            let fullAddress = data.address;
            let extraAddress = '';
            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            console.log(fullAddress);
            this.modal.formData.address = fullAddress;
            this.closeDaumPostModal();
        },
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
