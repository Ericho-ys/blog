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
    <ul class="mdList" v-show="mdList.length">
      <li
        v-for="item in mdList"
        :key="item._id"
        class="mdItem"
        @click="toDetail(item._id)"
      >
        <span v-if="item.top">【顶】</span>
        <span class="mdTitle" v-text="item.title"></span>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mdTypes } from "../../config/mdTypes";
import { storage } from "../../utils/index";
export default {
  name: "mds",
  data() {
    return {
      mdTypes: mdTypes,
      mdList: [],
    };
  },
  created() {
    this.getMdList();
  },
  methods: {
    activeType(item) {
      console.log(item);
    },
    addMd() {
      this.$router.push({ name: "addMd" });
    },
    async getMdList() {
      const userId = storage.get("userId");
      const res = await this.$http.post("/api/getMdList", {
        userId: userId,
        pageSize: 10,
        pageNum: 1,
      });
      this.mdList = res.result;
    },
    toDetail(id) {
      this.$router.push({
        path: "/mdDetail",
        query: {
          id,
        },
      });
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
      margin: 45px 40px 0px 0px;
    }
  }
  .mdList {
    margin: 0 40px;
    max-height: calc(100vh - 300px);
    overflow: scroll;
    padding: 5px 10px;
    background-color: rgba(211, 211, 211, 0.2);
    border-radius: 10px;
    .mdItem {
      height: 50px;
      line-height: 50px;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 10px;
      font-size: 20px;
      padding-left: 20px;
      margin-bottom: 10px;
      background-color: white;
    }
  }
}
</style>
