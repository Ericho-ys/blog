import {
    admin
} from './auth'
import {
    storage
} from "../utils/index"
const type = JSON.parse(storage.get('user')).type
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
const item = admin.find(item => {
    return item.type == type
})
let authIds = []
item.routers.forEach(item => {
    authIds.push(...Object.keys(item))
})
console.log(authIds)
asyncRoute.forEach(item => {
    if (authIds.indexOf(item.id) !== -1) {
        staticSlides.push(item)
    }
})
export default staticSlides