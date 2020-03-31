// 遍历pages文件生成入口
const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
var pageList = null
const buildPagesArr = require("./buildpage_arr")[process.env.NODE_ENV]
const isDevelopment = process.env.NODE_ENV === "development"

const isPart = process.env.PART === "true"
function resolve (dir) {
    return path.join(__dirname, "..", dir)
}

// 一个page要打多个template
function getPageHTML (fullPath) {
    return fs.readdirSync(path.resolve("./src/pages", fullPath)).filter(filename => filename.indexOf(".html") > -1)
}

function readPages () {
    if (!pageList) {
        const pagesPath = path.resolve("./src/pages")
        pageList = []
        fs.readdirSync(pagesPath).forEach(pageFile => {
            // 只打 buildpage.js 里指定入口的文件
            if (isPart && buildPagesArr.indexOf(pageFile) === -1) {
                return
            }
            // 只有开发环境打包test
            if (!isDevelopment && pageFile.indexOf("test") > -1) {
                return
            }
            var fullPath = `${pagesPath}/${pageFile}`
            var isFile = fs.statSync(fullPath).isFile()
            if (isFile) {
                if (pageFile.slice(-3) === ".js") {
                    var baseName = pageFile.slice(0, pageFile.lastIndexOf("."))
                    pageList.push({
                        entry: fullPath,
                        chunkName: baseName,
                        template: "html.tpl.html"
                    })
                }
            }
            else {
                // 文件夹
                let htmls = getPageHTML(fullPath)
                if (htmls.length >= 1) {
                    // 多页面
                    htmls.map(htmlname => {
                        pageList.push({
                            entry: path.resolve(fullPath, "index.js"),
                            chunkName: htmlname === "template.html" ? path.basename(pageFile) : htmlname.replace(".html", ""),
                            template: path.resolve(fullPath, htmlname)
                        })
                    })
                    return
                }
                pageList.push({
                    entry: path.resolve(fullPath, "index.js"),
                    chunkName: path.basename(pageFile),
                    template: "html.tpl.html"
                })
            }
        })
    }
    return pageList
}

exports.getEntryPages = function () {
    return readPages().reduce((r, page) => {
        r[page.chunkName] = page.entry
        return r
    }, {
    })
}

exports.htmlPlugins = function (webackConfig) {
    var list = readPages().map(page => {
        var options = {
            chunks: ["manifest", "vendor", page.chunkName],
            filename: page.chunkName + ".html",
            title: "",
            description: "",
            template: page.template,
            favicon: resolve("icon.ico"),
            inject: true,
            minify: {
                collapseWhitespace: true
            },
            isProduction: process.env.NODE_ENV === "production",
            googleAnalyticsJS: process.env.NODE_ENV === "production" ? `
                <!-- Global site tag (gtag.js) - Google Analytics -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139871909-1"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-139871909-1');
                </script>
            ` : ""
        }
        return new HtmlWebpackPlugin(options)
    })
    return list
}

