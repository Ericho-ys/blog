import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const login = (r) =>
    require.ensure([], () => r(require("../pages/login/index")), "login"); // 登录
const index = (r) =>
    require.ensure([], () => r(require("../pages/index/index.vue")), "index"); // 首页
const mds = (r) =>
    require.ensure([], () => r(require("../pages/mds/index.vue")), "mds"); // 文章列表
const addMd = (r) =>
    require.ensure([], () => r(require("../pages/addMd/index.vue")), "addMd"); // 文章列表
const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            redirect: "/index",
        },
        {
            path: "/login",
            name: "login",
            component: login,
        },
        {
            path: "/index",
            name: "index",
            component: index,
            children: [{
                path: "/mds",
                name: "mds",
                component: mds,
            }, {
                path: "/addMd",
                name: "addMd",
                component: addMd,
            }],
        },
    ],
});

export default router;