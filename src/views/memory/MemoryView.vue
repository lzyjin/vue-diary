<template>
    <div>
        <div class="memory-wrap view">
            <swiper-container pagination="true" class="swiper-container" v-if="currentMemory?.firstPhoto?.photoUrl !== null">
                <swiper-slide class="swiper-slide" v-if="currentMemory?.firstPhoto?.photoUrl !== null">
                    <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.firstPhoto?.photoUrl}`" alt="">
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-if="currentMemory?.secondPhoto?.photoUrl !== null">
                    <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.secondPhoto?.photoUrl}`" alt="">
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-if="currentMemory?.thirdPhoto?.photoUrl !== null">
                    <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.thirdPhoto?.photoUrl}`" alt="">
                </swiper-slide>
            </swiper-container>

            <div class="inner">
                <div class="top">
                    <p>
                        <span class="memory-category">{{ currentMemory.category }}</span>
                        <span class="memory-regDate">{{ currentMemory.regDate }}</span>
                    </p>
                    <p class="memory-address">{{ currentMemory.address }}</p>
                    <div class="btn-modal" @click="openEllipsisModal">
                        <i class="xi-ellipsis-v"></i>
                    </div>
                </div>
                <p class="memory-content">{{ currentMemory.contents }}</p>
            </div>
        </div>

        <div v-if="modal.ellipsisModalOpened">
            <div class="modal" :class="{opened: modal.ellipsisModalOpened}">
                <div class="modal-top">
                    <button @click="closeEllipsisModal" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="button" @click="openEditModal">수정하기</div>
                    <div class="button" @click="deleteMemory" >삭제하기</div>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>

        <div v-if="modal.editModalOpened">
            <div class="modal" :class="{opened: modal.editModalOpened}">
                <div class="modal-top">
                    <button @click="closeEditModal" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="category">
                        <div class="c-item">
                            <strong>카테고리 <span class="asterisk">*</span></strong>
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
                            <strong>일자 <span class="asterisk">*</span></strong>
                            <date-picker v-model="modal.formData.regDate" valueType="format" placeholder="날짜 선택"></date-picker>
                        </div>
                        <div class="c-item">
                            <strong>주소 <span class="asterisk">*</span></strong>
                            <div class="input-wrap address">
                                <input type="text" name="" id="" @click="openDaumPostModal" readonly required placeholder="주소 검색" v-model="modal.formData.address">
                                <!--<input type="text" name="" id="" required placeholder="주소 입력" v-model="modal.formData.address">-->
                            </div>
                        </div>
                        <div class="c-item">
                            <strong>내용 <span class="asterisk">*</span></strong>
                            <textarea name="" id="" required placeholder="추억할 내용을 적어보세요 :)" v-model="modal.formData.contents"></textarea>
                        </div>
                        <div class="c-item">
                            <strong>사진첨부</strong>
                            <div class="add-photo">
                                <div class="thumb" v-for="(v, i) in modal.thumbList" :key="i" :style="{ 'background-image' : `url('${v}')` }">
                                    <div class="btn-delete" @click="deletePhoto(i)">
                                        <i class="xi-close"></i>
                                    </div>
                                </div>
                                <label for="btnFileUpload" v-if="modal.formData.fileList.length < 3">
                                    <i class="xi-plus"></i>
                                </label>
                                <input type="file" name="" id="btnFileUpload" multiple @change="uploadPhoto">
                            </div>
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <!--<button class="btn-delete">-->
                        <!--<i class="xi-trash"></i>-->
                        <!--</button>-->
                        <button class="btn-save" @click="saveMemory">등록하기</button>
                    </div>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import DaumPostcode from "vuejs-daum-postcode";


export default {
    name: "MemoryList",
    components: {
        DatePicker,
        DaumPostcode,
    },
    data() {
        return {
            modal: {
                ellipsisModalOpened: false,
                editModalOpened: false,
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
        };
    },
    computed: {
        ...mapGetters({
            currentMemory: 'memory/currentMemory',
        }),
    },
    methods: {
        openEllipsisModal() {
            this.modal.ellipsisModalOpened = true;
        },

        closeEllipsisModal() {
            this.modal.ellipsisModalOpened = false;
        },

        openEditModal() {
            this.modal.editModalOpened = true;
        },

        closeEditModal() {
            this.modal.editModalOpened = false;
        },

        deleteMemory() {
            const memoryNo = this.$store.getters['memory/currentMemory'].memoryNo;
            if ( confirm('정말 삭제하시겠습니까?') ) {
                this.$store.dispatch('memory/MEMORY_DELETE', memoryNo)
                    .then(response => {
                        console.log(response);
                        alert('삭제되었습니다.');
                        this.$store.dispatch('memory/MEMORY_RESET');
                        this.$router.push('/memoryList');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
    },
    mounted() {
        const memoryNo = this.$route.params.memoryNo;
        console.log(memoryNo);
        this.$store.dispatch('memory/MEMORY_GET', memoryNo)
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    },
}
</script>

<style scoped>

</style>
