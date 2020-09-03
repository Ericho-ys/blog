const auth = [{
        id: "1",
        label: "笔记",
        slideRoute: ["mds"],
        routers: ["mds"],
        children: [{
            id: "1-1",
            label: "查看",
            disabled: true,
            slideRoute: ["mds"],
            routers: ["mds"]
        }, {
            id: "1-2",
            label: "删除",
            slideRoute: ["mds"],
            routers: ["mds"]
        }, {
            id: "1-3",
            label: "新增",
            slideRoute: ["mds"],
            routers: ["addMd"]
        }],
    },
    {
        id: "2",
        label: "用户管理",
        slideRoute: ["users"],
        routers: ["users"],
        children: [{
            id: "2-1",
            label: "查看",
            disabled: true,
            slideRoute: ["users"],
            routers: ["users"]
        }, {
            id: "2-2",
            label: "新增",
            slideRoute: ["users"],
            routers: ["addUser"]

        }, {
            id: "2-3",
            label: "删除",
            slideRoute: ["users"],
            routers: ["users"]
        }]
    }
];
export default auth;