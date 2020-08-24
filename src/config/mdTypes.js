const types = ['javascript', 'css', 'Vue', 'webpack', 'nodejs', 'flutter', 'canvas', 'd3']

const mdTypes = types.reduce((pre, cur, index) => {
    let temp = {
        type: index,
        value: cur
    }

    return [...pre, temp]
}, [])
export {
    mdTypes
}