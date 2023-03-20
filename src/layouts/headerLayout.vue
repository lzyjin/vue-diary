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
        <router-link to="/calendar" class="link">캘린더</router-link>
        <router-link to="/memoryList" class="link">추억</router-link>
        <router-link to="/signup" class="link">회원가입</router-link>
        <router-link to="/signout" class="link" @click.native="closeMenu">로그아웃</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headerLayout",
  data() {
    return {
      // menuState: false,
    }
  },
  computed: {
    ...mapGetters({
      menuState: 'common/menuState',
    }),
  },
  methods: {
    openMenu() {
      // this.menuState = true;
      this.$store.dispatch('common/OPEN_MENU');
    },

    closeMenu() {
      // this.menuState = false;
      this.$store.dispatch('common/CLOSE_MENU');
    },
  },
}
</script>

<style scoped>

</style>
