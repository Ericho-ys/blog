<template>
  <div class="userDetail">
    <el-button type="primary" @click="save" class="saveBtn">保存</el-button>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像">
        <img
          style="width:50px;height:50px;"
          :src="form.headImage ? form.headImage : defaultImage"
          alt=""
        />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          class="username"
          v-model="form.username"
          :disabled="true"
          :rules="{}"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          ref="tree"
          :data="auth"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1, 2]"
          :default-checked-keys="['1-1', '2-1']"
        >
        </el-tree>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
const defaultImage = require("../../../assets/personHead.png");
import auth from "../../../config/auth";
import { storage } from "../../../utils/index";
export default {
  name: "userDetail",
  data() {
    return {
      form: {
        username: "",
        headImage: "",
      },
      defaultImage,
      auth,
    };
  },
  async created() {
    const id = this.$route.query.id;
    this.userId = JSON.parse(storage.get("user"))._id;
    const result = await this.$http.post("/api/getUserDetailById", {
      userId: id,
    });
    this.form = result.result;
  },
  methods: {
    async save() {
      const keys = this.$refs.tree.getCheckedKeys();
      let slideRoute = [],
        authRoutes = [];
      const node = this.$refs.tree.getCheckedNodes();
      for (let i = 0; i < node.length; i++) {
        slideRoute = slideRoute.concat(node[i].slideRoute);
        authRoutes = authRoutes.concat(node[i].routers);
      }
      slideRoute = [...new Set(slideRoute)];
      authRoutes = [...new Set(authRoutes)];
      await this.$http.post("/api/updateAuth", {
        userId: this.userId,
        ids: keys,
        slideRoute,
        authRoutes,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.userDetail {
  margin: 40px 40px 0px;
  display: flex;
  flex-direction: column;
  .username {
    max-width: 300px;
  }
  .saveBtn {
    align-self: flex-end;
  }
}
</style>
