const naname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${naname}\\:)?${naname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const endTag = new RegExp(`^<\\/${qnameCapture}>`)
const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^'])'+|([^\s"'=<>`]+)))?/
const startTagClose = /^\s*(\/?)>/s
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

const parseStartTag = function (template) {
    function advance(i) {
        template = template.substring(i)
    }
    const startTag = template.match(startTagOpen)
    if (startTag) {
        let match = {
            tagName: startTag[1],
            attrs: []
        }
        advance(startTag[0].length)
        //匹配属性
        let end, attr
        while (
            !(end = template.match(startTagClose)) &&
            (attr = template.match(attribute))
        ) {
            match.attrs.push({
                name: attr[1],
                value: attr[3] || attr[4] || attr[5]
            })
            advance(attr[0].length)
        }
        if (end) {
            advance(end[0].length)
        }
        return { startTag: match, html: template }
    }
    return { startTag: undefined, html: template }
}
/**
 * 解析template为ast
 * @param {*} template
 */
const parseHtml = function (template) {
    let root = null
    let stack = []
    let currentParent
    template = template.replace('\n', '')
    template = template.replace(/<!--(.*?)-->/g, '')

    //创建ast节点
    function createAstElementNode(tag, attrs) {
        return {
            tag,
            type: 1,
            children: [],
            attrs,
            parent: null
        }
    }

    //匹配开始标签
    function start(tag, attrs) {
        const node = createAstElementNode(tag, attrs)
        if (!root) {
            root = node
        }
        if (currentParent) {
            node.parent = currentParent
            currentParent.children.push(node)
        }
        stack.push(node)
        currentParent = node
    }

    //匹配结束标签
    function end(tag) {
        stack.pop()
        currentParent = stack[stack.length - 1]
    }

    //匹配文字标签
    function textN(text) {
        text = text.replace(/\s+/g, '')
        text &&
            currentParent.children.push({
                type: 1,
                text,
                parent: currentParent
            })
    }

    function advance(i) {
        /**
         * 返回切割指定长度的字符串
         */
        template = template.substring(i)
    }

    while (template) {
        const textEnd = template.indexOf('<')
        if (textEnd === 0) {
            const { startTag, html } = parseStartTag(template)
            template = html
            // console.log(html)
            //匹配开始标签
            if (startTag) {
                start(startTag.tagName, startTag.attrs)
                continue
            }
            //匹配结束标签
            const endTagName = template.match(endTag)
            if (endTagName) {
                end(endTagName[0])
                advance(endTagName[0].length)
                continue
            }
        }
        if (textEnd > 0) {
            const text = template.substring(0, textEnd)
            if (text) {
                textN(text)
                advance(text.length)
            }
        }
    }
    console.log(root)
    return root
}

module.exports = parseHtml
