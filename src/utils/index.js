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


export {
    storage
}