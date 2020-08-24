<template>
  <div class="slide">
    <template v-for="item in menuData">
      <el-menu-item
        :key="item.id"
        :index="item.router"
        v-if="!item.childResource || !item.childResource.length"
      >
        <i class="iconfont iconshouye" v-if="item.id.indexOf('-') == -1"></i>
        <span slot="title" v-text="item.name"></span>
      </el-menu-item>
      <el-submenu :key="item.id" :index="item.router" v-else>
        <template slot="title">
          <i class="iconfont iconshouye"></i>
          <span slot="title" v-text="item.name"></span>
        </template>
        <slide-menu :menuData="item.childResource"></slide-menu>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "slideMenu",
  data() {
    return {};
  },
  props: {
    menuData: {
      type: Array,
      required: true,
      default: function() {
        return [];
      },
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.slide .el-submenu .el-menu-item {
  background-color: #323648 !important;
  padding-left: 60px !important;
  border-bottom: 1px solid #444960;
}
.iconfont {
  margin-right: 20px;
  margin-left: 4px;
}
.slide .el-menu-item i {
  color: white;
}
.slide .el-menu-item.is-active i {
  color: rgb(64, 158, 255);
}

.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
