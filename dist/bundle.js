/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(/*! utils/fs-async.js */ \"./utils/fs-async.js\"); // 此文件请见下一步中的代码\n// promise风格\n// fs.readFile(\"input.txt\")\n//     .then((data) => {\n//         console.log(\"异步promise读取: \" + data.toString());\n//     })\n//     .catch((err) => {\n//         console.error(err);\n//     });\n// // await风格，tip：要在async函数中方可使用await语法\n// const data = await fs.readFile(\"input.txt\");\n// console.log(\"异步await读取: \" + data.toString());\n\n\nconsole.log(fs);\n\n//# sourceURL=webpack://hotMini/./src/index.js?");

/***/ }),

/***/ "./utils/fs-async.js":
/*!***************************!*\
  !*** ./utils/fs-async.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nvar util = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'util'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n/**\n * 将nodejs的fs模块的异步操作变为promise模式\n */\n\n\nfunction FsAsync() {\n  var prototype = this.constructor.prototype;\n\n  var isFun = function isFun(e) {\n    return Object.prototype.toString.call(e) === \"[object Function]\";\n  };\n\n  var isSync = function isSync(s) {\n    return s.indexOf(\"Sync\") !== -1 || s.indexOf(\"sync\") !== -1;\n  };\n\n  for (var p in fs) {\n    var prop = fs[p];\n\n    if (isFun(prop)) {\n      prototype[p] = isSync(prop.name) ? prop : util.promisify(prop);\n    }\n  }\n}\n\nmodule.exports = new FsAsync();\n\n//# sourceURL=webpack://hotMini/./utils/fs-async.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;