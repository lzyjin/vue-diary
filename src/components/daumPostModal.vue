<template>
    <div>
        <div class="modal" :class="{opened: opened}">
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
</template>

<script>
import DaumPostcode from 'vuejs-daum-postcode';

export default {
    name: "daumPostModal",
    props: [
        'opened',
    ],
    components: {
        DaumPostcode,
    },
    data() {
        return {
            modal: {
                opened: this.opened,
            }
        };
    },
    methods: {
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

            this.$emit('saveAddress', fullAddress);
        },
    },
}
</script>

<style scoped>

</style>
