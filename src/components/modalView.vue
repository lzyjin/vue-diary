<template>
  <div>
    <div class="modal" :class="{opened: this.opened}">
      <div class="modal-top">
        <p class="date">2023년 1월 1일</p>
        <button>
          <i class="xi-close" @click="closeModal"></i>
        </button>
      </div>
      <div class="modal-content">
        <p class="m-count">총 0개</p>
        <ul>
          <li>
            <p class="m-content">월급날 키키키</p>
          </li>
          <li>
            <p class="m-content">점심시간에 산책</p>
          </li>
          <li>
            <p class="m-content">도시락 반찬 싸기</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="dimmed"></div>
  </div>
</template>

<script>
export default {
  name: "modalView",
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    closeModal() {
      this.opened = false;
    },
  },
}
</script>

<style scoped>

</style>
