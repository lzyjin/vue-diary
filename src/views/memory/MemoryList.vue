<template>
    <div>
        <div class="memory-wrap">
            <div class="top">
                <div class="wrap">
                    <input type="text" name="" id="" placeholder="검색어를 입력해주세요">
                    <div class="btn-filter" @click="openFilterModal">
                        <span>필터</span>
                    </div>
                </div>
                <div class="wrap">
                    <p class="total">전체 개 중 {{ memoryListPageInfo?.totalElement }}개</p>
                    <div class="btn-add" @click="openEditModal">등록</div>
                </div>
            </div>
            <div class="list">
                <div v-for="(v, i) in memoryList" :key="`memory_${i}`" class="item">
                    <div class="img">
                        <img :src="`http://121.161.237.50:9999/origin/${v.firstPhoto.photoUrl}`" alt="">
                    </div>
                    <div class="text">
                        <div class="edit"><i class="xi-ellipsis-h"></i></div>
                        <p class="desc">{{ v.contents }}</p>
                        <p class="date">{{ v.regDate }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="modal.editModalOpened">
            <div class="modal" :class="{opened: modal.editModalOpened}">
                <div class="modal-top">
                    <button @click="closeEditModal" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <!--  카테고리(셀렉트), 일자(피커), 주소(다음 우편번호검색), 내용(최대500자), 사진추가(최대3개)-->
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

        <div v-if="modal.daumPostModalOpened">
            <div class="modal" :class="{opened: modal.daumPostModalOpened}">
                <div class="modal-top">
                    <button @click="closeDaumPostModal" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <DaumPostcode :on-complete=handleAddress />
                </div>
            </div>
        </div>

        <div v-if="modal.filterModalOpened">
            <div class="modal" :class="{opened: modal.filterModalOpened}">
                <div class="modal-top">
                    <button @click="closeFilterModal" style="margin-left: auto;">
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
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {forEach} from 'lodash';
import DaumPostcode from 'vuejs-daum-postcode';
import {mapGetters} from "vuex";

export default {
    name: "MemoryList",
    components: {
        DatePicker,
        DaumPostcode,
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
                daumPostModalOpened: false,
                filterModalOpened: false,

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
            }
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

        openFilterModal() {
            this.modal.filterModalOpened = true;
        },

        closeFilterModal() {
            this.modal.filterModalOpened = false;
        },

        openEditModal() {
            this.modal.editModalOpened = true;
        },

        closeEditModal() {
            this.modal.editModalOpened = false;
        },

        openDaumPostModal: function(e) {
            this.modal.daumPostModalOpened = true;
        },

        closeDaumPostModal() {
            this.modal.daumPostModalOpened = false;
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

        uploadPhoto: function(e) {
            const files = [...e.target.files];

            console.log(files);

            if (files.length > 3 || (files.length + this.modal.formData.fileList.length) > 3) {
                alert('이미지 첨부는 최대 3개까지 가능합니다.');
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files[i]);
                fileReader.onload = () => {
                    this.modal.thumbList.push(fileReader.result);
                    this.modal.formData.fileList.push(files[i]);
                }
            }

            e.target.value = '';
        },

        deletePhoto: function(fileIndex) {
            this.modal.thumbList.splice(fileIndex, 1);
            this.modal.formData.fileList.splice(fileIndex, 1);
        },

        saveMemory: function() {
            const formData = new FormData();

            // forEach(this.modal.formData, (v,k) => {
            //     if (k === 'user') {
            //         forEach(v, (v2,k2) => {
            //             formData.append(`${k}.${k2}`, v2);
            //         });
            //     } else {
            //         formData.append(k, v);
            //     }
            // });

            // formData.append('user.userId', this.modal.formData.user.userId);
            // formData.append('user.regDate', this.modal.formData.user.regDate);
            // formData.append('user.lastLoginDate', this.modal.formData.user.lastLoginDate);
            // formData.append('user.userStatus', this.modal.formData.user.userId !== null ? this.modal.formData.user.userId : '');
            // formData.append('user.withdrawalDate', this.modal.formData.user.withdrawalDate !== null ? this.modal.formData.user.withdrawalDate : '');
            formData.append('user.userNo', this.modal.formData.user.userNo);

            formData.append('memory', this.modal.formData.memoryNo !== undefined ? this.modal.formData.memoryNo : '');
            formData.append('category', this.modal.formData.category);
            formData.append('address', this.modal.formData.address);
            formData.append('regDate', this.modal.formData.regDate);
            formData.append('contents', this.modal.formData.contents);

            if(this.modal.formData.fileList[0]) formData.append('firstMultipartFile', this.modal.formData.fileList[0]);
            if(this.modal.formData.fileList[1]) formData.append('secondMultipartFile', this.modal.formData.fileList[1]);
            if(this.modal.formData.fileList[2]) formData.append('thirdMultipartFile', this.modal.formData.fileList[2]);

            console.log(formData);

            this.$store.dispatch('memory/MEMORY_SAVE', formData)
            .then((response) => {
                console.log(response);

                if (confirm('등록되었습니다.')) {
                    // this.fetchCalendar();
                    // this.closeViewModal();
                    // this.closeListModal();
                }
            })
            .catch(e => {
                console.log(e);
            });
        },
    },

    mounted() {
        this.fetchMemory(1, 10);
    },
}
</script>

<style scoped>

</style>
