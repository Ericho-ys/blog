<template>
  <div>
    <headCmp></headCmp>
    <div class="content">
      <slide></slide>
      <router-view class="container"></router-view>
    </div>
  </div>
</template>
<script>
import slide from "../../components/slide/slide.vue";
import headCmp from "../../components/head.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: { slide, headCmp },
};
</script>
<style lang="scss">
.content {
  min-height: calc(100vh - 50px);
}
.container {
  flex: 1;
}
</style>
