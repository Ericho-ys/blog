import * as qiniu from 'qiniu-js'
import {
    Loading
} from 'element-ui'
import {
    Promise
} from 'core-js'
class Storage {
    constructor() {}
    get(key) {
        return localStorage.getItem(key) || undefined
    }
    set(key, value) {
        localStorage.setItem(key, value)
    }
    remove(key) {
        localStorage.removeItem(key)
    }
    removeAll() {
        localStorage.remove()
    }
}
const storage = new Storage()

class Sloading {
    instance = null
    construct() {

    }
    open(options) {
        this.instance = Loading.service(options);
    }
    close() {
        Promise.resolve().then(() => this.instance.close())

    }
}

function uploadImage(file, key, token, domain) {
    return new Promise((resolve, reject) => {
        let config = {
            useCdnDomain: true,
            disableStatisticsReport: false,
            retryCount: 6,
            region: qiniu.region.z2
        };
        let putExtra = {
            customVars: {}
        };
        const observable = qiniu.upload(file, key, token, putExtra, config);
        observable.subscribe({
            next() {},
            error(error) {
                reject(error)
            },
            async complete() {
                resolve(`http://${domain}/${key}`)
            }
        })
    })

}
export {
    storage,
    uploadImage,
    Sloading
}