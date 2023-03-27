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
                    <div class="btn-modal" @click="openModal('selectModalOpened')">
                        <i class="xi-ellipsis-v"></i>
                    </div>
                </div>
                <p class="memory-content">{{ currentMemory.contents }}</p>
            </div>
        </div>

        <div v-if="modal.selectModalOpened">
            <div class="modal" :class="{opened: modal.selectModalOpened}">
                <div class="modal-top">
                    <button @click="closeModal('selectModalOpened')" style="margin-left: auto;">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <div class="button" @click="modifyMemory">수정하기</div>
                    <div class="button" @click="deleteMemory">삭제하기</div>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>

        <edit-modal v-if="modal.editModalOpened" :opened="modal.editModalOpened" :is-modify="modal.isModify" @closeEditModal="closeModal('editModalOpened')"></edit-modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditModal from "@/components/modal/editModal.vue";

export default {
    name: "MemoryList",
    components: {
        EditModal,
    },
    data() {
        return {
            modal: {
                selectModalOpened: false,
                editModalOpened: false,
                isModify: false,
            },
        };
    },
    computed: {
        ...mapGetters({
            currentMemory: 'memory/currentMemory',
        }),
    },
    methods: {
        openModal(modalType) {
            this.modal[`${modalType}`] = true;
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;
        },

        modifyMemory() {
            this.closeModal('selectModalOpened');
            this.modal.editModalOpened = true;
            this.modal.isModify = true;
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
        this.$store.dispatch('memory/MEMORY_GET', memoryNo)
        .then(response => {
            console.log(response);
            console.log(this.currentMemory.category);

            switch (this.currentMemory.category) {
                case 'FOOD':
                    this.currentMemory.category = '음식';
                break;
                case 'SHOPPING':
                    this.currentMemory.category = '쇼핑';
                break;
                case 'TRIP':
                    this.currentMemory.category = '여행';
                break;
                case 'MOVIE':
                    this.currentMemory.category = '영화';
                break;
                case 'STUDY':
                    this.currentMemory.category = '공부';
                break;
                case 'CAFE':
                    this.currentMemory.category = '카페';
                break;
                case 'EXOTIC':
                    this.currentMemory.category = '이색적인';
                break;
                case 'CULTURAL_LIFE':
                    this.currentMemory.category = '문화생활';
                break;
                case 'EXHIBITION':
                    this.currentMemory.category = '전시회';
                break;
                case 'REVIEW':
                    this.currentMemory.category = '후기';
                break;
            }
        })
        .catch(e => {
            console.log(e);
        });


    },
}
</script>

<style scoped>

</style>
