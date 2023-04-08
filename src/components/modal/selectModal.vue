<template>
    <div>
        <div class="modal" :class="{ opened: opened }">
            <div class="modal-top">
                <button @click="closeModal('selectModalOpened')" style="margin-left: auto">
                    <i class="xi-close"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="button" @click="modify">수정하기</div>
                <div class="button" @click="remove">삭제하기</div>
            </div>
        </div>
        <div class="dimmed"></div>
    </div>
</template>

<script>
export default {
    name: 'selectModal',
    // props: [
    //     'opened',
    //     "modifyMemory"
    // ],
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        modifyMemory: {
            type: Function,
            default: () => {}
        },
        deleteMemory: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            modal: {
                opened: this.opened
            }
        };
    },
    methods: {
        closeModal(modalType) {
            this.$emit('closeModal');
        },
        modify() {
            this.closeModal();
            this.modifyMemory(); //'CALL BACK FUNCTION'
        },
        remove() {
            this.closeModal();
            this.deleteMemory();
        }
    }
};
</script>

<style scoped></style>
