<template>
    <div>
        <div class="memory-wrap">
            <div class="top">
                <div class="wrap">
                    <input type="text" name="" id="" placeholder="검색어를 입력해주세요">
                    <div class="btn-filter">
                        <span>필터</span>
                    </div>
                </div>
                <div class="wrap">
                    <p class="total">전체 n개 중 k개</p>
                    <div class="btn-add">등록</div>
                </div>
            </div>
            <div class="list">
                <div class="item">
                    <div class="img">
                        <img src="https://lipsum.app/random/200x200" alt="">
                    </div>
                    <div class="text">
                        <div class="edit"><i class="xi-ellipsis-h"></i></div>
                        <p class="desc">성수에서 재밌게 보낸날 - 자전거도 타고 맛있는 것도 먹고 한강도 갔다</p>
                        <p class="date">2023.02.27</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="modal.editModalOpened">
            <div class="modal" :class="{opened: modal.editModalOpened}">
                <div class="modal-top">
                    <button @click="" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
<!--                {{ modal.formData }}-->
                <div class="modal-content">
                    <!--  카테고리(셀렉트), 일자(피커), 주소(다음 우편번호검색), 내용(최대500자), 사진추가(최대3개)-->
                    <div class="category">
                            <div class="c-item">
                                <strong>카테고리 <span class="asterisk">*</span></strong>
                                <div class="select-wrap">
                                    <select name="" id="" required v-model="modal.formData.category">
                                        <option value="" disabled>카테고리를 선택하세요.</option>
                                        <option value="food">음식</option>
                                        <option value="shoping">쇼핑</option>
                                        <option value="trip">여행</option>
                                        <option value="movie">영화</option>
                                        <option value="study">공부</option>
                                        <option value="cafe">카페</option>
                                        <option value="exotic">이색적인</option>
                                        <option value="cultural_life">문화생활</option>
                                        <option value="exhibition">전시회</option>
                                        <option value="review">후기</option>
                                    </select>
                                </div>
                            </div>
                            <div class="c-item">
                                <strong>일자 <span class="asterisk">*</span></strong>
                                <input type="date" name="" id="" v-model="modal.formData.regDate" required>
                            </div>
                            <div class="c-item">
                                <strong>주소 <span class="asterisk">*</span></strong>
                                <input type="text" name="" id="" @click="openKakaoAPI" readonly required placeholder="클릭하여 주소를 검색하세요." v-model="modal.formData.address">
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
                        <button class="btn-delete">
                            <i class="xi-trash"></i>
                        </button>
                        <button class="btn-save">등록하기</button>
                    </div>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MemoryList",
    data() {
        return {
            modal: {
                editModalOpened: true,

                thumbList: [],

                formData: {
                    // 사용자 정보(필수)
                    user: {}, // store의 state 넣기

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
        // TODO: npm으로 바꾸기
        openKakaoAPI: function(e) {
            new daum.Postcode({
                oncomplete: (data) => {
                    // console.log(this); // vue
                    this.modal.formData.address = data.address;
                }
            }).open();
        },

        uploadPhoto: function(e) {
            const files = [...e.target.files];
            // const formData = new FormData(); // 지금 필요 없음, 등록 버튼 누를 때 필요하겠네.

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

            console.log(this.modal.formData.fileList); // 파일
            // console.log(formData);
            // console.log(formData.getAll('files'));
        },

        deletePhoto: function(fileIndex) {
            this.modal.thumbList.splice(fileIndex, 1);
            this.modal.formData.fileList.splice(fileIndex, 1);
        },
    }
}
</script>

<style scoped>

</style>
