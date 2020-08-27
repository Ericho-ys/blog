<template>
  <div class="home">
    <ul class="statistics">
      <li class="staItem" v-for="item in statisticsArr" :key="item.key">
        <div class="staTitle">
          <span
            :class="['staNumber', item.textColor]"
            v-text="count[item.key]"
          ></span>
          <span class="staName" v-text="item.name"></span>
        </div>
        <i :class="[item.icon, 'staIcon']"></i>
      </li>
    </ul>
  </div>
</template>
<script>
import { statisticsArr } from "../../config/statistics";
export default {
  name: "home",
  data() {
    return {
      statisticsArr,
      count: {},
    };
  },
  created() {
    this.getStatistics();
  },
  methods: {
    async getStatistics() {
      const result = await this.$http.post("/api/getCount");
      this.count = result.result;
      console.log(this.count);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .statistics {
    margin: 40px;
    display: flex;
    justify-content: space-between;
    color: #666;
    .staItem {
      height: 108px;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 0px 5px #ccc;
      .staTitle {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        .staNumber {
          font-size: 20px;
        }
        .staName {
          font-size: 16px;
          margin-top: 5px;
        }
      }
      .staIcon {
        font-size: 50px;
        padding-right: 20px;
      }
      .color-green1 {
        color: #40c9c6 !important;
      }
      .color-blue {
        color: #36a3f7 !important;
      }
      .color-red {
        color: #f4516c !important;
      }
      .color-green2 {
        color: #34bfa3 !important;
      }
    }
  }
}
</style>
