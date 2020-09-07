import Vue from "vue";
import VueRouter from "vue-router";
import {
    storage
} from "../utils/index"
Vue.use(VueRouter);
const login = (r) =>
    require.ensure([], () => r(require("../pages/login/index")), "login"); // 登录
const index = (r) =>
    require.ensure([], () => r(require("../pages/index/index.vue")), "index"); // 首页
const mds = (r) =>
    require.ensure([], () => r(require("../pages/mds/index.vue")), "mds"); // 文章列表
const addMd = (r) =>
    require.ensure([], () => r(require("../pages/addMd/index.vue")), "addMd"); // 新增文章
const mdDetail = (r) =>
    require.ensure(
        [],
        () => r(require("../pages/mdDetail/index.vue")),
        "mdDetail"
    ); // 文章详情
const home = (r) =>
    require.ensure([], () => r(require("../pages/home/index.vue")), "home"); // 首页
const users = (r) =>
    require.ensure([], () => r(require("../pages/users/index.vue")), "users"); // 首页
const userDetail = (r) =>
    require.ensure(
        [],
        () => r(require("../pages/users/details/index.vue")),
        "userDetail"
    ); // 首页

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            redirect: "/indexHome",
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
                    path: "/indexHome",
                    name: "indexHome",
                    component: home,
                },
                {
                    path: "/mds",
                    name: "mds",
                    component: mds,
                },
                {
                    path: "/addMd",
                    name: "addMd",
                    component: addMd,
                },
                {
                    path: "/mdDetail",
                    name: "mdDetail",
                    component: mdDetail,
                },
                {
                    path: "/users",
                    name: "users",
                    component: users,
                },
                {
                    path: "/userDetail",
                    name: "userDetail",
                    component: userDetail,
                },
            ],
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (storage.get('user')) {
            next()
        } else {
            next('/login')
        }
    }
})
export default router;