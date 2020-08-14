/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar extractLyrics = function extractLyrics(e) {\n  e.preventDefault();\n\n  var lyrics = getLyrics();\n  var phrases = getPhrases(lyrics);\n  var terms = getTerms(lyrics);\n  var textFileContent = buildTextFileContent(terms, phrases);\n\n  setUniqueCounters(terms, phrases);\n  setTextFileLink(textFileContent);\n};\n\nvar clearLyrics = function clearLyrics(e) {\n  e.preventDefault();\n  document.querySelector('#lyrics').value = \"\";\n  document.querySelector('#phraseCount').innerHTML = \"0\";\n  document.querySelector('#termCount').innerHTML = \"0\";\n  document.querySelector(\"#text-file-link\").href = \"\";\n  document.querySelector('#download-button').disabled = true;\n  document.querySelector(\"#text-file-link\").href = \"#\";\n};\n\nvar setTextFileLink = function setTextFileLink(textFileContent) {\n  document.querySelector('#download-button').disabled = false;\n  var link = document.querySelector(\"#text-file-link\");\n  link.href = \"data:text/plan;charset=UTF-8,\" + encodeURIComponent(textFileContent);\n  document.querySelector('#download-button').click();\n};\n\nvar setUniqueCounters = function setUniqueCounters(terms, phrases) {\n  document.querySelector('#phraseCount').innerHTML = phrases.length.toString();\n  document.querySelector('#termCount').innerHTML = terms.length.toString();\n};\n\n// Utility functions\n\nvar removeDuplicates = function removeDuplicates(xs) {\n  var collect = function collect(r, x) {\n    if (!r.seen[x]) {\n      r.result.push(x);\n      r.seen[x] = true;\n    }\n    return r;\n  };\n  return xs.reduce(collect, { seen: {}, result: [] }).result;\n};\n\nvar removeEmptyEntries = function removeEmptyEntries(arr) {\n  return arr.filter(function (elem) {\n    return elem.replace(/\\s/g, '').length;\n  });\n};\n\nvar getPhrases = function getPhrases(lyrics) {\n  lyrics = lyrics.trim();\n  lyrics = lyrics.replace(/\\t|\\.|\\,|\\>|\\<|\\«|\\»/gm, \"\");\n  lyrics = lyrics.replace(/[\\u00A0\\u1680\\u180e\\u2000-\\u2009\\u200a\\u200b\\u202f\\u205f\\u3000\\u0020]/gm, \" \");\n  var phrases = lyrics.split(/\\n/gm);\n  phrases = removeEmptyEntries(phrases);\n  return removeDuplicates(phrases);\n};\n\nvar getTerms = function getTerms(lyrics) {\n  lyrics = lyrics.trim();\n  lyrics = lyrics.replace(/\\n|\\r\\n/gm, \" \");\n  lyrics = lyrics.replace(/\\?|\\!|\\.|\\,|\\\"|\\>|\\<|\\«|\\»/gm, \"\");\n  lyrics = lyrics.replace(/[\\u00A0\\u1680\\u180e\\u2000-\\u2009\\u200a\\u200b\\u202f\\u205f\\u3000\\u0020]/gm, \" \");\n  var terms = lyrics.split(/(\\s+)/gm);\n  terms = removeEmptyEntries(terms);\n  return removeDuplicates(terms);\n};\n\nvar getLyrics = function getLyrics() {\n  var lyrics = document.querySelector('#lyrics').value;\n  lyrics = lyrics.trim();\n  lyrics = lyrics.replace(/\\t|\\.|\\,/gm, \"\");\n  return lyrics;\n};\n\nvar buildTextFileContent = function buildTextFileContent(terms, phrases) {\n  var textFileContent = \"\";\n  var separator = \"###############\";\n\n  textFileContent = textFileContent + separator + \"\\nTerms:\\n\" + separator + \"\\n\\n\";\n  terms.forEach(function (elem) {\n    textFileContent = textFileContent + elem + \"\\n\";\n  });\n\n  textFileContent = textFileContent + \"\\n\\n\" + separator + \"\\nPhrases:\\n\" + separator + \"\\n\\n\";\n  phrases.forEach(function (elem) {\n    textFileContent = textFileContent + elem + \"\\n\";\n  });\n\n  return textFileContent;\n};\n\n// EventListeners\n\ndocument.querySelector('#clear-button').addEventListener('click', clearLyrics);\n\ndocument.querySelector('#extract-button').addEventListener('click', extractLyrics);\n\ndocument.querySelector('#lyrics').addEventListener('input', function () {\n  document.querySelector('#download-button').disabled = true;\n});\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });