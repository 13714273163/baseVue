const path = require('path')

module.exports = {
  outputDir: '/dist',
  //   chainWebpack: config => {
  //     const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  //     types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  //   },
  productionSourceMap: false

}

// 自动化导入less文件
// function addStyleResource (rule) {
//   rule.use('style-resource')
//     .loader('style-resources-loader')
//     .options({
//       patterns: [
//         path.resolve(__dirname, './src/style/lib-reset.less')
//       ]
//     })
// }
