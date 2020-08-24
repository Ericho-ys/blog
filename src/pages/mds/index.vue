<template>
  <div id="mds">
    <div class="head">
      <ul class="mdTypes">
        <li
          v-for="item in mdTypes"
          :key="item.value"
          @click="activeType(item)"
          class="typeItem"
        >
          <el-button>{{ item.value }}</el-button>
        </li>
      </ul>
      <el-button
        class="addBtn"
        icon="el-icon-plus"
        circle
        type="primary"
        @click="addMd"
      ></el-button>
    </div>
    <ul class="mdList">
      <li v-for="item in 50" :key="item" class="mdItem">1</li>
    </ul>
  </div>
</template>
<script>
import { mdTypes } from "../../config/mdTypes";
export default {
  name: "mds",
  data() {
    return {
      mdTypes: mdTypes,
    };
  },
  methods: {
    activeType(item) {
      console.log(item);
    },
    addMd() {
      this.$router.push({ name: "addMd" });
    },
  },
};
</script>
<style lang="scss" scoped>
#mds {
  background-color: white;
  .head {
    display: flex;
    position: sticky;
    justify-content: space-between;
    .mdTypes {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      margin: 40px;
      .typeItem {
        font-size: 18px;
        margin: 10px 20px 10px 0px;
        cursor: pointer;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .addBtn {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
      margin: 45px 50px 0px 0px;
    }
  }
  .mdList {
    .mdItem {
      height: 40px;
    }
  }
}
</style>
