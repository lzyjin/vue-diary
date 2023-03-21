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
                </div>
                <p class="memory-content">{{ currentMemory.contents }}</p>
            </div>
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
