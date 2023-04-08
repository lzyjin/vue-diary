<template>
    <div id="app">
        <div id="container">
            <header-layout/>
            <!--        MODAL -->


            <Component :is="modal.component.name" v-bind="modal.data"  @closeModal="closeModal"/>
<!--            point 1-->
            <content-layout/>
        </div>
    </div>
</template>

<script>
import HeaderLayout from "@/layouts/headerLayout";
import ContentLayout from "@/layouts/contentLayout";

export default {
    name: 'App',
    components: {
        ContentLayout,
        HeaderLayout,

    },
    computed: {
        modal() {
            // console.log(this.$store.getters['modal/getModal'])
            return this.$store.getters['modal/getModal']
        }
    },
    methods: {
        closeModal() {
            this.$store.commit('modal/closeModal')
        }
    }
}
</script>

<style>
    @import './assets/sass/style.css';
</style>
