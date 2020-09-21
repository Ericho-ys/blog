<template>
  <div id="login">
    <div class="bodymana">
      <el-card class="box-card login-box">
        <el-form ref="formRef"
                 class="wid"
                 :model="form">
          <el-form-item prop="userName"
                        :rules="{
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            }">
            <el-input v-model="form.userName"
                      prefix-icon="el-icon-user"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password"
                        :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
            <el-input v-model="form.password"
                      type="password"
                      prefix-icon="el-icon-lock"
                      placeholder="请输入密码"
                      @keyup.enter.native="toLoginFn"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btnlogin"
                       type="primary"
                       @click="toLoginFn">登 录</el-button>
          </el-form-item>

          <div class="justfly">
            <div class="flexcenter">
              <el-checkbox v-model="checked"><span class="checkboxlogin">记住登录状态</span></el-checkbox>
            </div>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { storage } from "../../utils";
const jsbase64 = require("js-base64").Base64;
export default {
  name: "login",
  data () {
    return {
      form: {
        userName: null,
        password: null,
      },
      checked: true,
    };
  },
  created () { },
  mounted () {
    const userName = storage.get("username");
    const password = storage.get("password");
    if (userName) {
      this.form.userName = userName;
    }
    if (password) {
      this.form.password = jsbase64.decode(password);
    }
  },
  methods: {
    toLoginFn () {
      const form = this.$refs.formRef;
      form.validate(async (valid) => {
        if (!valid) return;
        const params = {
          username: this.form.userName,
          password: this.form.password,
        };
        const result = await this.$http.post("/api/login", params);
        storage.set("user", JSON.stringify(result.user));
        storage.set("token", result.token);
        storage.set("username", this.form.userName);
        if (this.checked) {
          storage.set("password", jsbase64.encode(this.form.password));
        } else {
          storage.remove("password");
        }
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>
<style lang="scss">
#login {
  background-image: url("../../assets/bg.png");
  background-size: cover;
  height: 100vh;
  .login-box {
    width: 440px;
    padding-top: 20px;
    background-color: rgba(92, 83, 163, 0.2);
    box-shadow: 0px 0px 5px 0px rgba(13, 23, 83, 0.49);
    border-radius: 6px;
    border: solid 1px #4c588a;
    .login-title {
      margin: 0 auto;
      display: flex;
      margin-bottom: 44px;
      margin-top: 33px;
    }
  }
}
</style>
<style scoped lang="scss">
.wid {
  width: 304px;
  margin: 0 auto;
  .el-input {
    box-shadow: 0px 0px 5px 0px#0b1447;
    font-size: 16px;
  }
}
.btnlogin {
  width: 304px;
  height: 50px;
  background-image: linear-gradient(
    270deg,
    #ffffff 0%,
    #8ccefd 0%,
    #189dfa 0%,
    #49d4fb 100%
  );
  border-radius: 25px;
  font-size: 21px;
  margin-top: 8px;
}
.checkboxlogin {
  color: #fff;
  font-size: 15px;
}
.titlemanage {
  width: 100%;
  color: #fff;
  margin-bottom: 20px;
  p:nth-of-type(1) {
    line-height: 38px;
    font-size: 40px;
    font-weight: normal;
    letter-spacing: 4px;
    color: #ffffff;
    margin: 0;
    text-align: center;
  }
  p:nth-of-type(2) {
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    margin: 0;
  }
}
.bodymana {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}
.justfly {
  display: flex;
  justify-content: space-between;
  .flexcenter {
    display: flex;
    align-items: center;
  }
  .language {
    .selelement {
      width: 115px;
    }
  }
}
</style>
<style>
.selelement input {
  font-size: 15px;
  background-color: #5c53a3;
  color: #fff;
  border: none;
}
</style>
