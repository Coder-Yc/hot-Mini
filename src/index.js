const fs = require('../utils/fs-async.js')

const WXML_PATH = '../test/index.wxml'
const WXSS_PATH = '../test/index.wxss'
const WXJS_PATH = '../test/index.js'

const readFileFn = async function () {
    const wxml = await fs.readFile(WXML_PATH)
    console.log(typeof wxml)
}
readFileFn()
