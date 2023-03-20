<template>
    <div>
        <div class="memory-wrap">
            <!-- TODO: 이미지 swiper로 당근마켓처럼 하기 -->
            <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.firstPhoto?.photoUrl}`" alt="" v-if="currentMemory?.firstPhoto?.photoUrl !== null">
            <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.secondPhoto?.photoUrl}`" alt="" v-if="currentMemory?.secondPhoto?.photoUrl !== null">
            <img :src="`http://121.161.237.50:9999/origin/${currentMemory?.thirdPhoto?.photoUrl}`" alt="" v-if="currentMemory?.thirdPhoto?.photoUrl !== null">
            <p>{{ currentMemory.contents }}</p>
            <p>{{ currentMemory.regDate }}</p>
            <p>{{ currentMemory.address }}</p>
            <p>{{ currentMemory.category }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "MemoryList",
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters({
            currentMemory: 'memory/currentMemory',
        }),
    },
    methods: {

    },

    mounted() {
        const memoryNo = this.$route.params.memoryNo;
        console.log(memoryNo);
        this.$store.dispatch('memory/MEMORY_GET', memoryNo)
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    },
}
</script>

<style scoped>

</style>
