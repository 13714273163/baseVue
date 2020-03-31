
const requirePlugins = require.context(".", false, /\.js$/)
export default function (Vue) {
    requirePlugins.keys().forEach(fileName => {
        if (fileName === "./index.js") {return}
        const plugin = requirePlugins(fileName)
        Vue.use(plugin.default || plugin)
    })
}
