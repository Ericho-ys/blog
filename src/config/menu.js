import {
    storage
} from "../utils/index"
const sildeRoute = JSON.parse(storage.get('user')).slideRoute
const staticSlides = [{
    id: "1",
    name: "首页",
    router: "indexHome",
}, ];
let asyncRoute = [{
        id: "2",
        name: "笔记",
        router: "mds",
        childResource: [],
    },
    {
        id: "3",
        name: "用户管理",
        router: "users",
        childResource: []
    }
]
for (let i = 0; i < sildeRoute.length; i++) {
    const result = asyncRoute.find(item => {
        return item.router == sildeRoute[i]
    })
    staticSlides.push(result)
}
export default staticSlides;