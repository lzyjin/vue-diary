<template>
  <div id="app">
    <div id="container">
      <header-layout/>
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
    HeaderLayout

  }
}
</script>

<style>
  @import './assets/sass/style.css';
</style>
