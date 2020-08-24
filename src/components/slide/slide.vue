<template>
  <div class="slide">
    <div
      :class="['iconClass', isCollapse ? 'isCollapse' : '']"
      @click="isCollapse = !isCollapse"
    >
      <i :class="[{ showMenu: isCollapse }, 'el-icon-s-fold']"></i>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#3a3f51"
      text-color="#ffffff"
      active-text-color="#409EFF"
      :default-active="$route.name"
      :router="true"
    >
      <slide-menu :menuData="menuData"></slide-menu>
    </el-menu>
  </div>
</template>
<script>
import slideMenu from "./slideMenu.vue";
import slides from "../../config/menu.js";
export default {
  name: "slide",
  data() {
    return {
      isCollapse: false,
      menuData: slides,
    };
  },
  components: { slideMenu },
};
</script>
<style lang="scss" scoped>
.slide {
  background-color: #444960;
}
.iconClass {
  padding: 5px;
  text-align: center;
  color: #ced4e2;
  font-size: 16px;
  background-color: #3f455b;
  transition: all 300ms;
  &:hover {
    background-color: #282b39;
  }
  > i {
    display: inline-block;
    cursor: pointer;
    transition: all 300ms;
    &.showMenu {
      transform: rotate(180deg);
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border-right: none;
}
</style>
