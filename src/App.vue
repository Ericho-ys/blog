<template>
  <div
    id="app"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      fullscreenLoading: false,
    };
  },
};
</script>

<style>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
}
</style>
