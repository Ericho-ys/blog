<template>
  <div id="mds">
    <div class="head">
      <ul class="mdTypes">
        <li v-for="item in mdTypes"
            :key="item.value"
            @click="activeType(item)"
            class="typeItem">
          <el-button>{{ item.value }}</el-button>
        </li>
      </ul>
      <el-button class="addBtn"
                 icon="el-icon-plus"
                 circle
                 type="primary"
                 @click="addMd"></el-button>
    </div>
    <ul class="mdList"
        v-show="mdList.length">
      <li v-for="item in mdList"
          :key="item._id"
          class="mdItem"
          @click="toDetail(item._id)">
        <div>
          <span v-if="item.top">【顶】</span>
          <span class="mdTitle"
                v-text="item.title"></span>
        </div>
        <div>
          <span>{{`${item.createrName} / `}}</span>
          <span>{{returnTime(item.creatertime)}}</span>
        </div>
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
  data () {
    return {
      mdTypes: mdTypes,
      mdList: [],
    };
  },
  created () {
    this.getMdList();
  },
  methods: {
    activeType (item) {
      this.getMdList(item.type)
    },
    addMd () {
      this.$router.push({ path: "/addMd" });
    },
    returnTime (time) {
      return this.$moment(time).format('YYYY-MM-DD')
    },
    async getMdList (type) {
      const userId = JSON.parse(storage.get("user"))._id;
      let params = {
        userId: userId,
        pageSize: 10,
        pageNum: 1,
      }
      if (type !== undefined) {
        params.type = type
      }
      const res = await this.$http.post("/api/getMdList", params);
      this.mdList = res.result;
    },
    toDetail (id) {
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
    .mdItem {
      height: 50px;
      line-height: 50px;
      box-shadow: 0px 0px 5px #ccc;
      border-radius: 10px;
      font-size: 20px;
      padding: 0 20px;
      margin-bottom: 10px;
      background-color: white;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
