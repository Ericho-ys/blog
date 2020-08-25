<template>
  <div id="addMd">
    <div class="forms">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择文章类型">
            <el-option
              v-for="item in mdTypes"
              :key="item.value"
              :label="item.value"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch v-model="form.top"></el-switch>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" round @click="submit" :disabled="submitFlag"
          >保存</el-button
        >
      </div>
    </div>
    <div id="vditor"></div>
  </div>
</template>
<script>
import { mdTypes } from "../../config/mdTypes";
import { storage } from "../../utils/index";
import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";
export default {
  name: "addMd",
  data() {
    return {
      form: {
        title: "",
        type: "",
        top: 0,
        content: "",
        userId: "",
      },
      submitFlag: true,
      mdTypes,
      rules: {
        title: [
          { required: true, message: "文章标题", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.form.userId = storage.get("userId");
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.submitFlag = false;
      },
    });
  },
  methods: {
    submit() {
      if (!this.submitFlag) {
        this.form.content = this.contentEditor.getValue();
        this.$http.post("/api/sendMd", this.form);
      }
    },
  },
};
</script>
<style lang="scss">
.forms {
  margin: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.form-inline .el-form-item__content {
  display: flex;
  align-items: center;
  min-height: 40px;
}
#vditor {
  height: calc(100vh - 230px) !important;
  margin: 0 40px;
}
.vditor-toolbar {
  padding-left: 5px !important;
}
.vditor-reset {
  padding-left: 10px !important;
}
</style>
