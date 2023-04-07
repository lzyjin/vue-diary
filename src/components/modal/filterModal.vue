<template>
    <div>
        <div class="modal" :class="{opened: opened}">
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
                            <select name="" id="" required v-model="modal.category">
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
                        <date-picker v-model="modal.regDate" valueType="format" range placeholder="날짜 선택"></date-picker>
                    </div>
                    <div class="c-item">
                        <strong>주소</strong>
                        <div class="input-wrap address">
                            <input type="text" name="" id="" v-model="modal.address" placeholder="주소 입력">
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <button class="btn-delete" @click="resetFilter">
                        <i class="xi-refresh"></i>
                    </button>
                    <button class="btn-save" @click="setFilter">적용</button>
                </div>
            </div>
        </div>
        <div class="dimmed"></div>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
    name: "filterModal",
    props: [
        'opened',
        'savedFilter',
    ],
    components: {
        DatePicker,
    },
    data() {
        return {
            modal: {
                opened: this.opened,

                // 검색조건
                category: '',
                address: '',
                regDate: [], // 배열로 ["2023-04-05", "2023-04-10"] 이런식으로 들어감
            }
        };
    },
    methods: {
        openModal(modalType) {
            this.modal[`${modalType}`] = true;
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;

            if (modalType === 'filterModalOpened') {
                this.$emit('close-filter-modal');
            }
        },

        resetFilter() {
            this.modal.category = '';
            this.modal.regDate = [];
            this.modal.address = '';
        },

        setFilter() {
            // emit으로 상위 컴포넌트로 필터 조건들을 올려야겠네.
            this.$emit('set-filter', this.modal.category, this.modal.regDate, this.modal.address);
            this.$emit('set-success');
        },
    },
    mounted() {
        this.modal.category = this.savedFilter.category;
        this.modal.address = this.savedFilter.address;
        this.modal.regDate = [ this.savedFilter.startDate, this.savedFilter.endDate];
    },
}
</script>

<style scoped>

</style>
