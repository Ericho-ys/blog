<template>
  <div id="mdDetail">
    <h1 class="title">{{ detail.title }}</h1>
    <div id="vditorshow"
         v-show="ready"></div>
  </div>
</template>
<script>
import { storage } from "../../utils/index";
import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";
export default {
  name: "mdDetail",
  data () {
    return {
      detail: "",
      ready: false,
    };
  },
  created () {
    this.userId = JSON.parse(storage.get("user"))._id;
  },
  async mounted () {
    await this.getDetail();
    this.contentEditor = new Vditor("vditorshow", {
      toolbarConfig: {
        hide: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.contentEditor.setValue(this.detail.content);
        this.ready = true;
      },
    });
    this.contentEditor.disabled();
  },
  methods: {
    async getDetail () {
      const result = await this.$http.post("/api/getMdDetaiById", {
        mdId: this.$route.query.id,
      });
      this.detail = result.result[0];
    },
  },
};
</script>
<style lang="scss" scoped>
#mdDetail {
  height: calc(100vh - 50px);
  overflow-y: scroll;
  .title {
    text-align: center;
    margin-top: 40px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
<style lang="scss">
#vditorshow {
  width: 100%;
  border: none;
  .vditor-toolbar--hide {
    display: none;
  }
  .vditor-ir pre.vditor-reset[contenteditable="false"] {
    opacity: 1;
    cursor: default;
  }
}
</style>
