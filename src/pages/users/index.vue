<template>
  <div id="users">
    <div class="addUser">
      <el-button class="addBtn"
                 icon="el-icon-plus"
                 type="primary"
                 @click="addUser"></el-button>
    </div>
    <div class="tables">

      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              returnDay(scope.row.registDate)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <img style="width:50px;height:50px;"
                   :src="scope.row.headImage ? scope.row.headImage : defaultImage"
                   alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { storage } from "../../utils/index";
const defaultImage = require("../../assets/personHead.png");
export default {
  name: "users",
  data () {
    return {
      tableData: [],
      defaultImage,
    };
  },
  created () {
    this.userId = JSON.parse(storage.get("user"))._id;
    this.getUsers();
  },
  methods: {
    addUser () {
      this.$router.push({
        path: "userDetail",
      });
    },
    handleEdit (index, row) {
      this.$router.push({
        path: "userDetail",
        query: {
          id: row._id,
        },
      });
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    returnDay (timestamp) {
      return this.$moment(timestamp).format("YYYY-MM-DD");
    },
    async getUsers () {
      const result = await this.$http.post("api/getUsers", {
        userId: this.userId,
      });
      this.tableData = result.result;
    },
  },
};
</script>
<style lang="scss" scoped>
.tables {
  width: 70%;
  margin-left: 10%;
  margin-top: 10px;
  border: 1px solid rgb(235, 238, 245);
  padding: 0 2.5%;
  min-height: 600px;
}
.addUser {
  width: 75%;
  margin-left: 10%;
  display: flex;
  justify-content: flex-end;
  margin-top: 100px;
}
</style>
