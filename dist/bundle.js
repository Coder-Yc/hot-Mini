/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ (function(module) {

function runCode() {
  var Page = function Page(page) {
    return page;
  };

  return Page({
    setdata: function setdata(dictData) {
      for (var i in dictData) {
        this.data[i] = dictData[i];
      }

      var render = function render($data) {
        'use strict';

        $data = $data || {};
        var $out = '',
            $line = [0, 0],
            isTrue = $data.isTrue,
            $escape = $imports.$escape,
            item1 = $data.item1,
            item2 = $data.item2,
            item3 = $data.item3;

        try {
          $out += "<view class='contend'style='background-color: white;'> ";
          $line = [0, 55];

          if (isTrue) {
            $out += "<view class='contend1'style='background-color: white;'> <view > ";
            $line = [0, 133];
            $out += $escape(item1);
            $out += " </view> </view>";
            $line = [0, 158];
          }

          $out += "<view bindtap='showdates'> <view > ";
          $line = [0, 200];
          $out += $escape(item2);
          $out += " </view> </view><view bindtap='showdates '> <view > ";
          $line = [0, 261];
          $out += $escape(item3);
          $out += " </view> </view> </view>";
        } catch (error) {
          throw {
            name: 'RuntimeError',
            path: null,
            message: error.message,
            line: $line[0] + 1,
            column: $line[1] + 1,
            source: "<view class='contend'style='background-color: white;'> {{if isTrue }}<view class='contend1'style='background-color: white;'> <view > {{item1}} </view> </view>{{/if}}<view bindtap='showdates'> <view > {{item2}} </view> </view><view bindtap='showdates '> <view > {{item3}} </view> </view> </view>",
            stack: error.stack
          };
        }

        return $out;
      };

      var html = render(this.data);
      console.log(html);
      this.setData({
        html: this.parse(html)
      });
    },
    data: {
      isTrue: false,
      isTrue2: false,
      isTrue3: true,
      item1: 1,
      item2: 2,
      item3: 3
    },
    onLoad: function onLoad() {
      this.setdata();
    },
    showdates: function showdates() {
      console.log('我是showdates函数');
    }
  });
}

module.exports = runCode;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map