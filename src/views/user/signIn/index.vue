<template>
  <div>
    <h1 class="page-title">로그인</h1>

    <div class="form">
      <form action="">
        <div class="item">
          <p class="label">아이디</p>
          <input type="text" class="data" />
          <p class="alert"></p>
        </div>
        <div class="item">
          <p class="label">비밀번호</p>
          <input type="text" class="data" />
          <p class="alert"></p>
        </div>
        <div class="item">
<!--          {{ count }}-->
          <button type="button" @click="increment">로그인</button>
          <router-link to="/signup" class="link" @click="decrement">회원가입은 여기로</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  computed: {
    count() {
      console.log(this.$store)
      return this.$store.state.count;

    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
      console.log(this.$store.state.count);
    },
    decrement() {
      this.$store.commit('decrement');
      console.log(this.$store.state.count);
    },
  },
}
</script>

<style scoped>

</style>
