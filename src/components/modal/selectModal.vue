<template>
    <div>
        <div class="modal" :class="{opened: opened}">
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
</template>

<script>
export default {
    name: "selectModal",
    props: [
        'opened',
    ],
    data() {
        return {
            modal: {
                opened: this.opened,
            },
        };
    },
    methods: {
        closeModal(modalType) {
            this.modal[`${modalType}`] = false;
        },

        modifyMemory() {
            this.$emit('modify');
            this.closeModal('selectModalOpened');
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
}
</script>

<style scoped>

</style>
