const fs = require('../utils/fs-async')
const path = require('path')
const { cwd } = require('node:process')
const root = cwd()

function runCode(json) {
    let str = `const app = getApp()
    Page({
  
      /**
       * 页面的初始数据
       */
      data: {
        html : [{type: 'view', text: '模版错误啦'}],
        
      },
    
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        var args = {
          xxx: 'xxx',
          code: `${json}`
        }
        if (args) {
          try {
            var onload1 = app.pakoRun(args, args.code)
            const oD = onload1()
            for(let i in oD){
              this[i] = oD[i]
            }
            this.onLoad(this.options)
          } catch (e) {
            console.log(e)
          }
        }
    
      },
  
      parseTag(tag) {
        let res = {
            type1: "tag",
            name: "",
            voidElement: false,
            // attrs: {},
            children: [],
        };
        let tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
        if (tagMatch) {
            // 标签名称为正则匹配的第2项
            res.type1 = tagMatch[1];
            if (tag.charAt(tag.length - 2) === "/") {
                // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
                res.voidElement = true;
            }
        }
        // 匹配所有的标签正则
        let classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);
      
        if (classList) {
          let style = ''
            for (let i = 0; i < classList.length; i++) {
                // 去空格再以= 分隔字符串  得到['属性名称','属性值']
       
                let c = classList[i].split("=");
                // c[1] = c[1].replace(/\\s*/g, "")
                c[0] = c[0].replace(/\\s*/g, "")
                // 循环设置属性
                var lengthc = 2
                for(lengthc; lengthc < c.length ; lengthc++){
                  c[1] += "=" + c[lengthc]
                }
                let p = c[1].substring(1, c[1].length - 1)
                try{
                  p = JSON.parse(c[1].substring(1, c[1].length - 1))
                }catch(e){
                 
                }
      
                if (c[1]) {
                  if(c[0] === ' style'){
                    style = p + style
                    res[c[0]] = style
                  }else{
                    res[c[0]] = p
                  }
          
                };
      
            }
        }
        return res;
      },
      
      parse(html) {
        var that = this;
        let result = [];
        let current;
        let level = -1;
        let arr = [];
        let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
        html.replace(tagRE, function (tag, index) {
            // 判断第二个字符是不是'/'来判断是否open
            let isOpen = tag.charAt(1) !== "/";
            // 获取标签末尾的索引
            let start = index + tag.length;
            // 标签之前的文本信息
            let text = html.slice(start, html.indexOf("<", start));
      
            let parent;
            if (isOpen) {
                level++;
                // 设置标签属性
                current = that.parseTag(tag);
                // 判断是否为文本信息，是就push一个text children  不等于'  '
                if (!current.voidElement && text.trim()) {
                    current["text"] = text
                }
                // 如果我们是根用户，则推送新的基本节点
                if (level === 0) {
                    result.push(current);
                }
                // 判断有没有上层，有就push当前标签
                parent = arr[level - 1];
                if (parent) {
                    parent.children.push(current);
                }
                // console.log(current)
                arr[level] = current;
            }
            // 如果不是开标签，或者是空元素：</div><img>
            if (!isOpen || current.voidElement) {
                // level--
                level--;
            }
        });
        // console.log(result)
        return result;
      
      },
    })`
}

async function writeFileToPage() {
    let json = await fs.readFile(
        '/Users/yangchong/Desktop/Demo/解释器/testMini/hotMini/dist/zipCode.json'
    )
    json = json.toString()
    await fs.writeFile(
        '/Users/yangchong/Desktop/Demo/解释器/testMini/pages/index/index.js',
        json,
        (err) => {
            console.log(err)
        }
    )
}
writeFileToPage()
