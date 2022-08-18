const inlineCss = require('inline-css')

const parseHtml = require('./parse')
const fs = require('../utils/fs-async.js')
const path = require('path')
const { cwd } = require('node:process')

const WXML_PATH = '../test/index.wxml'
const WXSS_PATH = '../test/index.wxss'
const JS_PATH = '../test/index.js'
const root = cwd()
/**
 * 读取文件的函数
 * @param {*} path 文件路径的对象
 */
const readFileFn = async function (paths) {
    let code = {}
    for (let i = 0; i < paths.length; i++) {
        const filePath = paths[i]
        codePath = path.join(root, 'test', filePath)
        const p = filePath.split('.').slice(-1)[0]
        let key =
            p === 'wxml'
                ? 'htmlCode'
                : p === 'js'
                ? 'jsCode'
                : p === 'wxss'
                ? 'cssCode'
                : ''
        let t = await fs.readFile(codePath)
        code[key] = t.toString()
    }
    return code
}

/**
 * 处理代码并且内联css代码到js
 * @param {*} html
 * @param {*} css
 * @returns
 */
const inlineCssFn = async function (html, css) {
    css = css ? css : '.page{ }'
    html = html ? html : '模版错误'
    let options = {
        url: 'index.css'
    }
    html = `<style>${css}</style>${html}`
    const htmlCss = await inlineCss(html, options)
    return htmlCss
}

async function init() {
    const paths = [JS_PATH, WXML_PATH, WXSS_PATH]
    const code = await readFileFn(paths)
    const { htmlCode, cssCode, jsCode } = code
    let htmlCss = await inlineCssFn(htmlCode, cssCode)
    let ast = parseHtml(htmlCss)
    console.log(ast)
}

init()
