<template>
  <div class="userDetail">
    <el-button type="primary"
               @click="save"
               class="saveBtn">保存</el-button>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px">
      <el-form-item label="用户类型"
                    prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="item.type"
                    v-for="item in admin"
                    :key="item.type">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像">
        <img style="width:50px;height:50px;"
             :src="form.headImage ? form.headImage : defaultImage"
             alt="" />
      </el-form-item>
      <el-form-item label="用户名"
                    prop="username">
        <el-input class="username"
                  :disabled="!(createFlag || changeable)"
                  v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item v-if="!createFlag && changeable"
                    label="原密码"
                    prop="oldPassword">
        <el-input class="password"
                  :disabled="!changeable"
                  v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item v-if="createFlag || changeable"
                    :label="createFlag ? '密码' : (changeable ? '新密码' :'')"
                    prop="password">
        <el-input class="password"
                  :disabled="!(createFlag || changeable)"
                  v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree ref="tree"
                 :data="auth"
                 show-checkbox
                 node-key="id"
                 :default-expanded-keys="expandedKeys">
        </el-tree>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
const defaultImage = require("../../../assets/personHead.png");
import { auth, admin } from "../../../config/auth.js";
import { storage } from "../../../utils/index";
export default {
  name: "userDetail",
  data () {
    return {
      admin,
      form: {
        username: "",
        headImage: "",
        oldPassword: "",
        password: "",
        type: 0,
      },
      defaultImage,
      auth,
      createFlag: false,
      changeable: false,
      expandedKeys: [],
      rules: {
        username: [
          { required: true, message: "用户名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        oldPassword: [
          { required: true, message: "旧密码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          }
        ]
      },
    };
  },
  watch: {
    type (newValue) {
      this.keys = []
      this.expandedKeys = []
      const routes = this.admin.find(item => {
        return item.type == newValue
      }).routers
      this.generateKeys(routes, this.keys = [], this.expandedKeys)
      this.$refs.tree.setCheckedKeys(this.keys)
    }
  },
  computed: {
    type () {
      return this.form.type
    }
  },
  async created () {
    this.form.type = 2
    const id = this.$route.query.id;
    this.createFlag = id ? false : true
    if (!this.createFlag) {
      this.userId = JSON.parse(storage.get("user"))._id;
      this.changeable = this.userId == id ? true : false
      this.getUserDetail(id)
    }
  },
  methods: {
    generateKeys (obj, keyArr, expandedKeys) {
      if (typeof obj !== 'object') return
      for (let i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
          if (obj[i] !== null && typeof obj[i] === 'object') {
            if (!Array.isArray(obj)) {
              expandedKeys.push(i)
            }
            this.generateKeys(obj[i], this.keys, this.expandedKeys)
          } else {
            this.keys.push(obj[i])
          }
        }
      }
    },
    async getUserDetail (id) {
      const result = await this.$http.post("/api/getUserDetailById", {
        userId: id,
      });
      this.form.type = result.result.type
    },
    async save () {
      let api = "/api/updateAuth"
      let params = {}
      params.headImage = this.form.headImage
      params.username = this.form.username
      params.password = this.form.password
      params.type = this.form.type
      if (this.createFlag) {
        api = "/api/createUser"
      } else {
        params.oldPassword = this.form.oldPassword
        params.userId = this.userId
      }
      try {
        await this.$refs.form.validate()
        await this.$http.post(api, params);
      } catch (error) {
        console.log(error)
      }

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
