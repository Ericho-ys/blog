<template>
  <div id="head">
    <div class="sysytemName">管理系统</div>
    <div class="headOptions"></div>
  </div>
</template>
<script>
export default {
  name: "headCmp",
};
</script>
<style lang="scss" scoped>
#head {
  height: 50px;
  width: 100%;
  background-color: #3a3f51;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sysytemName {
    padding-left: 60px;
    color: white;
  }
}
</style>
