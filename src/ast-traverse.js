function attrsFn(attrs) {
    // console.log(attrs)
    NO_KEYS = ['wx:if', 'wx:for', 'wx:else', 'wx:elif']
    return attrs.map((attr) => {
        if (NO_KEYS.includes(attr.name)) {
            return ''
        } else {
            return `${attr.name}="${attr.value}"`
        }
    })
}
let index = 0
function getNextAttrs(attrs, key) {
    if (attrs.length === 0) return
    return attrs.find((attr) => {
        console.log(++index)
        if (attr.name == key) {
            return attr.value
        }
    })
}

function astTraverse(ast) {
    let html = ''
    ast = ast instanceof Array ? ast : [ast]

    ast.forEach((node, index) => {
        let ifFlag = false
        let forFlag = false

        if (node.attrs.length > 0) {
            let item = 'item'
            let index = 'index'
            node.attrs.forEach((attr) => {
                if (attr.name === 'wx:if') {
                    attr.value = attr.value.replace(/({{) | (}})/g, '')
                    html = html + `{{if ${attr.value} }}`
                    ifFlag = true
                } else if (attr.name === 'wx:elif') {
                    attr.value = attr.value.replace(/({{) | (}})/g, '')
                    // html = html + `{{else if ${attr.value} }}`
                } else if (attr.name === 'wx:for') {
                    attr.value = attr.value.replace(/({{) | (}})/g, '')
                    html = html + `{{each ${attr.value}  ${item} ${index}}}`
                    forFlag = true
                } else if (attr.name === 'wx:for-item') {
                    item = attr.value
                } else if (attr.name === 'wx:for-index') {
                    index = attr.value
                }
            })
        }
        //递归解析
        if (node.text) {
            html += node.text
        } else {
            html =
                html +
                `<${node.tag} ${attrsFn(node.attrs).join('')}> ${
                    node.children.length > 0 ? astTraverse(node.children) : ''
                } </${node.tag}>`
        }

        let elseValue =
            ast[index + 1]?.attrs && ast[index + 1]?.attrs.length > 0
                ? getNextAttrs(ast[index + 1]?.attrs, 'wx:else')
                : []
      
        if ((ast[index + 1] && elseValue?.length) || ifFlag) {
            html = html + `{{/if}}`
        } else if (forFlag) {
            html = html + `{{/each}}`
        }
    })
    return html
}

module.exports = astTraverse
