<template>
  <div>
    <h1 class="page-title">회원가입</h1>

    <div class="form">
      <form action="">
        <div class="item">
          <p class="label">아이디</p>
          <input type="text" class="data" v-model="id" @input="validateId"/>
          <p class="alert">{{ alertId }}</p>
        </div>
        <div class="item">
          <p class="label">비밀번호</p>
          <input type="password" class="data" v-model="password" @input="validatePassword"/>
          <p class="alert">{{ alertPassword }}</p>
        </div>
        <div class="item">
          <button type="button" @click="signUp">회원가입</button>
          <p>회원가입 결과: {{  }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      id: '',
      password: '',
      alertId: '',
      alertPassword: '',
    }
  },
  methods: {
    validateId() {
      // 알파벳 대소문자 또는 숫자, 6 ~ 15자리
      const regExp = /^[a-zA-Z0-9]{6,15}$/;
      this.alertId = '';
      if (!regExp.test(this.id)) {
        this.alertId = '아이디는 6~15글자의 영문 대소문자 또는 숫자의 조합이어야 합니다.';
        return false;
      }
      return true;
    },
    validatePassword() {
      // 최소 8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
      const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
      this.alertPassword = '';
      if (!regExp.test(this.password)) {
        this.alertPassword = '비밀번호는 8글자 이상의 영문 대소문자와 숫자, 특수문자의 조합이어야 합니다.';
        return false;
      }
      return true;
    },
    signUp() {
      // console.log(this.validateId(), this.validatePassword());
      if (this.validateId() && this.validatePassword()) {
        this.$store.commit('signUp', {
          id: this.id,
          password: this.password,
        });
      }
    },
  },
}
</script>

<style scoped>

</style>
