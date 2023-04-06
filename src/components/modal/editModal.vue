<template>
    <div>
        <div class="modal" :class="{opened: opened}">
            <div class="modal-top">
                <button @click="closeModal('editModalOpened')" style="margin-left: auto;">
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
                            <input type="text" name="" id="" @click="openModal('daumPostModalOpened')" readonly required placeholder="주소 검색" v-model="modal.formData.address">
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
                    <button class="btn-save" @click="saveMemory">{{ currentMemory.memoryNo === 0 ? '등록하기' : '수정하기' }}</button>
                </div>
            </div>
        </div>
        <div class="dimmed"></div>

        <daum-post-modal v-if="modal.daumPostModalOpened" :opened="modal.daumPostModalOpened" @saveAddress="putAddress"></daum-post-modal>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import DaumPostModal from "@/components/modal/daumPostModal.vue";
import {mapGetters} from "vuex";

export default {
    name: "editModal",
    props: [
        'opened',
    ],
    components: {
        DatePicker,
        DaumPostModal,
    },
    computed: {
        ...mapGetters({
            currentMemory: 'memory/currentMemory',
        }),
    },
    data() {
        return {
            modal: {
                opened: this.opened,
                daumPostModalOpened: false,
                isModify: false,

                thumbList: [],

                formData: {
                    // 사용자 정보(필수)
                    user: {...this.$store.getters["user/getSignedInUserData"]}, // store의 state 넣기

                    // 입력한 값(필수)
                    category: '',
                    address: '',
                    // memoryNo: null, // 서버에서 없으면 등록, 있으면 수정으로 인식함
                    // memoryNo: '',
                    regDate: '',
                    contents: '',

                    // 이미지 파일(선택)
                    fileList: [],
                },
            },
        }
    },
    methods: {
        openModal(modalType) {
            this.modal[`${modalType}`] = true;
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;

            if (modalType === 'editModalOpened') {
                this.$emit('close-edit-modal');
            }
        },

        putAddress(params) {
            this.modal.formData.address = params;
            this.closeModal('daumPostModalOpened');
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

            formData.append('user.userNo', this.modal.formData.user.userNo);

            // formData.append('memory', this.modal.formData.memoryNo !== undefined ? this.modal.formData.memoryNo : '');
            formData.append('memoryNo', this.currentMemory.memoryNo !== 0 ? this.currentMemory.memoryNo : '');
            formData.append('category', this.modal.formData.category);
            formData.append('address', this.modal.formData.address);
            formData.append('regDate', this.modal.formData.regDate);
            formData.append('contents', this.modal.formData.contents);


            // 파일 업로드를 하면 & 기존 파일이 없으면 ok인데
            // (추가) 기존 파일이 있으면 firstPhoto 또는 secondPhoto 또는 thirdMultipartFile 객체를 보내야함.
            if (this.modal.formData?.fileList[0]?.photoNo) {
                formData.append('firstPhoto.photoNo', this.modal.formData.fileList[0].photoNo);
                formData.append('firstPhoto.photoUrl', this.modal.formData.fileList[0].photoUrl);
            }
            if (this.modal.formData?.fileList[1]?.photoNo) {
                formData.append('secondPhoto.photoNo', this.modal.formData.fileList[1].photoNo);
                formData.append('secondPhoto.photoUrl', this.modal.formData.fileList[1].photoUrl);
            }
            if (this.modal.formData?.fileList[2]?.photoNo) {
                formData.append('thirdPhoto.photoNo', this.modal.formData.fileList[2].photoNo);
                formData.append('thirdPhoto.photoUrl', this.modal.formData.fileList[2].photoUrl);
            }

            if (this.modal.formData?.fileList[0] && !this.modal.formData?.fileList[0]?.photoNo) {
                formData.append('firstMultipartFile', this.modal.formData.fileList[0]);
            }
            if (this.modal.formData?.fileList[1] && !this.modal.formData?.fileList[1]?.photoNo) {
                formData.append('secondMultipartFile', this.modal.formData.fileList[1]);
            }
            if (this.modal.formData?.fileList[2] && !this.modal.formData?.fileList[2]?.photoNo) {
                formData.append('thirdMultipartFile', this.modal.formData.fileList[2]);
            }

            console.log(formData.get('memoryNo'));

            this.$store.dispatch('memory/MEMORY_SAVE', formData)
                .then((response) => {
                    // console.log(response);

                    if (confirm(this.currentMemory.memoryNo !== 0 ? '수정되었습니다.' : '등록되었습니다.')) {
                        // 아래 2개를 상위 컴포넌트에서 실행해야 함.
                        // this.closeEditModal();
                        // this.fetchMemory(1, 10);

                        this.closeModal('editModalOpened');
                        this.$emit('edit-success');
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },
    mounted() {
        if (this.currentMemory.memoryNo !== 0) {
            this.modal.formData.contents = this.currentMemory.contents;
            this.modal.formData.category = this.currentMemory.category;
            this.modal.formData.regDate = this.currentMemory.regDate;
            this.modal.formData.address = this.currentMemory.address;

            // 이미지 파일도 저장했어야지
            // 아니 그러면 저장이 아니라 수정일 때 이미지 첨부를 처음부터 다시 해야하는겨?
            // 나는 기존거에 추가로 하나만 하고싶으면 어떻게 하라는거야?
            // 답변: 이미 있는 이미지칸이거나 첨부안할 이미지 칸은 비워 보내라. 수정한 이미지만 채워 보내라.

            // 썸네일 보여주기 위함
            if (this.currentMemory.firstPhoto.photoUrl) {
                this.modal.thumbList.push(`http://121.161.237.50:9999/origin/${this.currentMemory.firstPhoto.photoUrl}`);
                this.modal.formData.fileList.push(this.currentMemory.firstPhoto);
            }
            if (this.currentMemory.secondPhoto.photoUrl) {
                this.modal.thumbList.push(`http://121.161.237.50:9999/origin/${this.currentMemory.secondPhoto.photoUrl}`);
                this.modal.formData.fileList.push(this.currentMemory.secondPhoto);
            }
            if (this.currentMemory.thirdPhoto.photoUrl) {
                this.modal.thumbList.push(`http://121.161.237.50:9999/origin/${this.currentMemory.thirdPhoto.photoUrl}`);
                this.modal.formData.fileList.push(this.currentMemory.thirdPhoto);
            }

        }
    },
}
</script>

<style scoped>

</style>
