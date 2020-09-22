const auth = [{
        id: "2",
        label: "笔记",
        children: [{
            id: "2-1",
            label: "查看",
            disabled: true,
        }, {
            id: "2-2",
            label: "删除",
            disabled: true,
        }, {
            id: "2-3",
            label: "新增",
            disabled: true,
            children: [{
                id: '2-3-1',
                label: '新增'
            }]
        }],
    },
    {
        id: "3",
        label: "用户管理",
        children: [{
            id: "3-1",
            label: "查看",
            disabled: true,
        }, {
            id: "3-2",
            label: "新增",
            disabled: true,

        }, {
            id: "3-3",
            label: "删除",
            disabled: true,
        }]
    }
];

const admin = [{
    type: 0,
    label: '超级管理员',
    routers: [{
            '2': ['2-1', '2-2', {
                '2-3': ['2-3-1']
            }]
        },
        {
            '3': ['3-1', '3-2', '3-3']
        }
    ]
}, {
    type: 1,
    label: '管理员',
    routers: [{
            '2': ['2-1', '2-3']
        },
        {
            '3': ['3-1']
        }
    ]

}, {
    type: 2,
    label: '普通用户',
    routers: [{
            '2': ['2-1']
        },
        {
            '3': ['3-1']
        }
    ]
}]
export {
    auth,
    admin
};