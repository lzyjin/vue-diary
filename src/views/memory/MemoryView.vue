<template>
    <div>
        <div class="memory-wrap view">
            <!-- TODO: 수정한 후 리로드할 때 스와이퍼 맨 처음에서 시작하도록 수정하기 -->
            <swiper-container pagination="true" class="swiper-container">
                <swiper-slide class="swiper-slide" v-if="currentMemory?.firstPhoto?.photoUrl == null">
                    <img :src="require(`@/assets/images/noimage.png`)" alt="" />
                </swiper-slide>

                <!-- TODO: 공통url 변수로 빼기!울랄라@! -->
                <swiper-slide class="swiper-slide" v-if="currentMemory?.firstPhoto?.photoUrl !== null">
                    <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.firstPhoto?.photoUrl}`" alt="" />
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-if="currentMemory?.secondPhoto?.photoUrl !== null">
                    <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.secondPhoto?.photoUrl}`" alt="" />
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-if="currentMemory?.thirdPhoto?.photoUrl !== null">
                    <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.thirdPhoto?.photoUrl}`" alt="" />
                </swiper-slide>
            </swiper-container>

            <div class="inner">
                <div class="top">
                    <p>
                        <span class="memory-category">{{ categoryKo }}</span>
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

        <!--        <div v-if="modal.selectModalOpened">-->
        <!--            <div class="modal" :class="{opened: modal.selectModalOpened}">-->
        <!--                <div class="modal-top">-->
        <!--                    <button @click="closeModal('selectModalOpened')" style="margin-left: auto;">-->
        <!--                        <i class="xi-close"></i>-->
        <!--                    </button>-->
        <!--                </div>-->
        <!--                <div class="modal-content">-->
        <!--                    <div class="button" @click="modifyMemory">수정하기</div>-->
        <!--                    <div class="button" @click="deleteMemory">삭제하기</div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="dimmed"></div>-->
        <!--        </div>-->

        <edit-modal
            v-if="modal.editModalOpened"
            :opened="modal.editModalOpened"
            :is-modify="modal.isModify"
            @closeEditModal="closeModal('editModalOpened')"
            @editSuccess="renderMemory"
        ></edit-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EditModal from '@/components/modal/editModal.vue';
import memoryCategory from '@/lang/memoryCategory';
import ModalList from '@/components/ModalList';

export default {
    name: 'MemoryList',
    components: {
        EditModal
    },
    data() {
        return {
            modal: {
                selectModalOpened: false,
                editModalOpened: false,
                isModify: false
            },

            categoryKo: ''
        };
    },
    computed: {
        ...mapGetters({
            currentMemory: 'memory/currentMemory'
        })
    },
    methods: {
        openModal(modalType) {
            const { SelectModal } = ModalList;
            const payload = {
                opened: true,
                modifyMemory: this.modifyMemory, //function is first class citizen right? then you can
                deleteMemory: this.deleteMemory
            };

            this.$store.commit('modal/setModal', { component: SelectModal, data: payload });
            // this.modal[`${modalType}`] = true;
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;
        },
        modifyMemory() {
            // this.closeModal('selectModalOpened');
            this.modal.editModalOpened = true;
            this.modal.isModify = true;
        },

        deleteMemory() {
            const memoryNo = this.$store.getters['memory/currentMemory'].memoryNo;
            if (confirm('정말 삭제하시겠습니까?')) {
                this.$store
                    .dispatch('memory/MEMORY_DELETE', memoryNo)
                    .then((response) => {
                        console.log(response);
                        alert('삭제되었습니다.');
                        this.$store.dispatch('memory/MEMORY_RESET');
                        this.$router.push('/memoryList');
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },

        renderMemory() {
            const memoryNo = this.$route.params.memoryNo;
            this.$store
                .dispatch('memory/MEMORY_GET', memoryNo)
                .then((response) => {
                    // console.log(response);

                    memoryCategory.forEach((v, i) => {
                        if (this.currentMemory.category === v.en) {
                            this.categoryKo = v.ko;
                        }
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.renderMemory();
    }
};
</script>

<style scoped></style>
