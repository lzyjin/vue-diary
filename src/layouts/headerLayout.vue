<template>
  <div>
    <header>
      <div class="wrap">
        <router-link to="/" class="home">다이어리</router-link>
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
        <router-link to="/signup" class="link">회원가입</router-link>
        <router-link to="/signout" class="link">로그아웃</router-link>
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
