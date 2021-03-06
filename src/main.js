import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import http from "./http/http.js";
import moment from "moment";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/base.css";
import {
  Sloading
} from './utils/index'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http(Vue);
Vue.prototype.$loading = new Sloading()
Vue.prototype.$moment = moment;
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");