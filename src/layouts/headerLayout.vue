<template>
  <div>
    <header>
      <div class="wrap">
        <p class="home">다이어리</p>
        <div class="ham" @click="openMenu">
          <i class="xi-bars"></i>
        </div>
      </div>
    </header>

    <div class="menu" v-if="menuState">
      <div class="top">
        <div class="btn-close" @click="closeMenu">
          <i class="xi-close"></i>
        </div>
      </div>
      <nav>
<!--        <a href="">회원가입</a>-->
<!--        <a href="">로그아웃</a>-->
        <router-link></router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerLayout",
  data() {
    return {
      menuState: false,
    }
  },
  methods: {
    openMenu() {
      this.menuState = true;
    },
    closeMenu() {
      this.menuState = false;
    },
  },
}
</script>

<style scoped>

</style>
