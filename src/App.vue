<template>
    <div id="app">
        <div id="container">
            <header-layout />
            <Component v-for="(v, i) in modal"
                       :key="`${v.component.name}_${i}`"
                       :is="v.component.name"
                       v-bind="v.data"
                       @closeModal="closeModal(v.component.name)" />
            <content-layout />
        </div>
    </div>
</template>

<script>
import HeaderLayout from '@/layouts/headerLayout';
import ContentLayout from '@/layouts/contentLayout';

export default {
    name: 'App',
    components: {
        ContentLayout,
        HeaderLayout,
    },
    computed: {
        modal() {
            return this.$store.getters['modal/getModal'];
        },
    },
    methods: {
        closeModal(modalName) {
            this.$store.commit('modal/closeModal', modalName);
        },
    },
};
</script>

<style>
@import './assets/sass/style.css';
</style>
