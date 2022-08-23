const fs = require('../utils/fs-async.js')
const zip = require('./encode')
const path = require('path')
const acorn = require('acorn')
const { cwd } = require('node:process')

const root = cwd()

const reduceAst = function (code) {
    const options = {
        ecmaVersion: 6,
        sourceType: module
    }
    let ast = acorn.parse(code, options)
    const r = function (ast) {
        if (ast) {
            Object.keys(ast).forEach((key) => {
                if (key == 'end' || key == 'start' || key == 'raw') {
                    ast[key]
                } else if (ast[key] instanceof Array) {
                    ast[key].forEach((k) => r(ast[k]))
                } else if (ast[key] instanceof Object) {
                    r(ast[key])
                }
            })
        }
    }
    // var d = function (ast) {
    //     JSON.parse(
    //         JSON.stringify(ast).replace(
    //             /("end":".?",)|("start":".?",)|("raw":".?",)/,
    //             ''
    //         )
    //     )

    // }
    r(ast)

    ast = JSON.stringify(ast)
    ast = ast.replace(/VariableDeclaration/g, 'VD')
    ast = ast.replace(/ExpressionStatement/g, 'ES')
    ast = ast.replace(/FunctionExpression/g, 'FE')
    ast = ast.replace(/CallExpression/g, 'CE')
    ast = ast.replace(/VariableDeclarator/g, 'VDt')
    ast = ast.replace(/BlockStatement/g, 'BS')
    ast = ast.replace(/FunctionDeclaration/g, 'FDt')
    ast = ast.replace(/ArrayExpression/g, 'AE')
    ast = ast.replace(/Identifier/g, 'Id')
    ast = ast.replace(/AssignmentExpression/g, 'AEo')
    ast = ast.replace(/ForStatement/g, 'FS')
    ast = ast.replace(/MemberExpression/g, 'ME')
    ast = ast.replace(/UnaryExpression/g, 'UE')
    ast = ast.replace(/SwitchStatement/g, 'SS')
    ast = ast.replace(/BreakStatement/g, 'BSs')
    ast = ast.replace(/SwitchCase/g, 'SC')
    ast = ast.replace(/UpdateExpression/g, 'UEo')
    ast = ast.replace(/BinaryExpression/g, 'BE')
    ast = ast.replace(/LogicalExpression/g, 'LE')
    ast = ast.replace(/ObjectExpression/g, 'OE')
    ast = ast.replace(/ConditionalExpression/g, 'CEo')
    ast = ast.replace(/Literal/g, 'Ll')
    // console.log(ast)
    return ast
}

;(async function build() {
    const buffer = await fs.readFile(path.join(root, './dist/bundle.js'))
    let code = buffer.toString()
    code = code.replace(/window.exports/g, 'module.exports')
    const ast = reduceAst(code)
    let zipCode = zip(ast)
    await fs.writeFile(
        'dist/zipCode.json',
        zipCode,
        {
            encoding: 'utf8'
        },
        (err) => {}
    )
})()
