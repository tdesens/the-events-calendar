/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["vJBw",0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "+Qsg":
/***/ (function(module, exports) {

module.exports = lodash.isFunction;

/***/ }),

/***/ "/iaF":
/***/ (function(module, exports) {

module.exports = lodash.isNaN;

/***/ }),

/***/ "1ZqX":
/***/ (function(module, exports) {

module.exports = wp.data;

/***/ }),

/***/ "2IT2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ actions_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ thunks_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ types_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ selectors_namespaceObject; });

// NAMESPACE OBJECT: ./src/modules/data/search/types.js
var types_namespaceObject = {};
__webpack_require__.r(types_namespaceObject);
__webpack_require__.d(types_namespaceObject, "ADD_BLOCK", function() { return ADD_BLOCK; });
__webpack_require__.d(types_namespaceObject, "SET_TERM", function() { return SET_TERM; });
__webpack_require__.d(types_namespaceObject, "SET_SEARCH_POST_TYPE", function() { return SET_SEARCH_POST_TYPE; });
__webpack_require__.d(types_namespaceObject, "SEARCH", function() { return SEARCH; });
__webpack_require__.d(types_namespaceObject, "SET_SEARCH_IS_LOADING", function() { return SET_SEARCH_IS_LOADING; });
__webpack_require__.d(types_namespaceObject, "SET_RESULTS", function() { return SET_RESULTS; });
__webpack_require__.d(types_namespaceObject, "ADD_RESULTS", function() { return ADD_RESULTS; });
__webpack_require__.d(types_namespaceObject, "SET_PAGE", function() { return SET_PAGE; });
__webpack_require__.d(types_namespaceObject, "SET_TOTAL_PAGES", function() { return SET_TOTAL_PAGES; });
__webpack_require__.d(types_namespaceObject, "CLEAR_BLOCK", function() { return CLEAR_BLOCK; });

// NAMESPACE OBJECT: ./src/modules/data/search/actions.js
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "addBlock", function() { return addBlock; });
__webpack_require__.d(actions_namespaceObject, "setTerm", function() { return setTerm; });
__webpack_require__.d(actions_namespaceObject, "setSearchPostType", function() { return setSearchPostType; });
__webpack_require__.d(actions_namespaceObject, "setResults", function() { return setResults; });
__webpack_require__.d(actions_namespaceObject, "addResults", function() { return addResults; });
__webpack_require__.d(actions_namespaceObject, "setTotalPages", function() { return setTotalPages; });
__webpack_require__.d(actions_namespaceObject, "setPage", function() { return setPage; });
__webpack_require__.d(actions_namespaceObject, "enableSearchIsLoading", function() { return enableSearchIsLoading; });
__webpack_require__.d(actions_namespaceObject, "disableSearchIsLoading", function() { return disableSearchIsLoading; });
__webpack_require__.d(actions_namespaceObject, "clearBlock", function() { return clearBlock; });

// NAMESPACE OBJECT: ./src/modules/data/search/selectors.js
var selectors_namespaceObject = {};
__webpack_require__.r(selectors_namespaceObject);
__webpack_require__.d(selectors_namespaceObject, "blockSelector", function() { return blockSelector; });
__webpack_require__.d(selectors_namespaceObject, "getSearchPostType", function() { return getSearchPostType; });
__webpack_require__.d(selectors_namespaceObject, "getSearchTerm", function() { return getSearchTerm; });
__webpack_require__.d(selectors_namespaceObject, "getIsLoading", function() { return getIsLoading; });
__webpack_require__.d(selectors_namespaceObject, "getResults", function() { return getResults; });
__webpack_require__.d(selectors_namespaceObject, "getPage", function() { return getPage; });
__webpack_require__.d(selectors_namespaceObject, "getTotal", function() { return getTotal; });

// NAMESPACE OBJECT: ./src/modules/data/search/thunks.js
var thunks_namespaceObject = {};
__webpack_require__.r(thunks_namespaceObject);
__webpack_require__.d(thunks_namespaceObject, "search", function() { return thunks_search; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/modules/data/utils.js
var utils = __webpack_require__("BNqv");

// CONCATENATED MODULE: ./src/modules/data/search/types.js
/**
 * Internal dependencies
 */

const ADD_BLOCK = `${utils["a" /* PREFIX_EVENTS_STORE */]}/ADD_BLOCK`;
const SET_TERM = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_TERM`;
const SET_SEARCH_POST_TYPE = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_SEARCH_POST_TYPE`;
const SEARCH = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SEARCH`;
const SET_SEARCH_IS_LOADING = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_SEARCH_IS_LOADING`;
const SET_RESULTS = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_RESULTS`;
const ADD_RESULTS = `${utils["a" /* PREFIX_EVENTS_STORE */]}/ADD_RESULTS`;
const SET_PAGE = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_PAGE`;
const SET_TOTAL_PAGES = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_TOTAL_PAGES`;
const CLEAR_BLOCK = `${utils["a" /* PREFIX_EVENTS_STORE */]}/CLEAR_BLOCK`;
// EXTERNAL MODULE: external "tribe.common.data"
var external_tribe_common_data_ = __webpack_require__("ZNLL");

// CONCATENATED MODULE: ./src/modules/data/search/reducers/search.js

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Internal dependencies
 */


const DEFAULT_STATE = {
  term: '',
  results: [],
  page: 1,
  totalPages: 0,
  isLoading: false,
  postType: external_tribe_common_data_["editor"].EVENT
};
/* harmony default export */ var search = (function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case types_namespaceObject.ADD_BLOCK:
      return DEFAULT_STATE;
    case types_namespaceObject.CLEAR_BLOCK:
      return _objectSpread(_objectSpread({}, DEFAULT_STATE), {}, {
        postType: state.postType
      });
    case types_namespaceObject.SET_TERM:
      return _objectSpread(_objectSpread({}, state), {}, {
        term: action.payload.term
      });
    case types_namespaceObject.SET_RESULTS:
      return _objectSpread(_objectSpread({}, state), {}, {
        results: action.payload.results
      });
    case types_namespaceObject.ADD_RESULTS:
      return _objectSpread(_objectSpread({}, state), {}, {
        results: [...state.results, ...action.payload.results]
      });
    case types_namespaceObject.SET_PAGE:
      return _objectSpread(_objectSpread({}, state), {}, {
        page: action.payload.page
      });
    case types_namespaceObject.SET_TOTAL_PAGES:
      return _objectSpread(_objectSpread({}, state), {}, {
        totalPages: action.payload.totalPages
      });
    case types_namespaceObject.SET_SEARCH_IS_LOADING:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          isLoading: action.payload.isLoading
        });
      }
    case types_namespaceObject.SET_SEARCH_POST_TYPE:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          postType: action.payload.postType
        });
      }
    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/modules/data/search/reducers/index.js

// CONCATENATED MODULE: ./src/modules/data/search/reducer.js

function reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? reducer_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Internal dependencies
 */


/* harmony default export */ var reducer = (function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ADD_BLOCK:
    case CLEAR_BLOCK:
    case SET_TERM:
    case SET_RESULTS:
    case ADD_RESULTS:
    case SET_PAGE:
    case SET_TOTAL_PAGES:
    case SET_SEARCH_IS_LOADING:
    case SET_SEARCH_POST_TYPE:
      return reducer_objectSpread(reducer_objectSpread({}, state), {}, {
        [action.payload.id]: search(state[action.payload.id], action)
      });
    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/modules/data/search/actions.js
/**
 * Internal dependencies
 */

const addBlock = id => ({
  type: ADD_BLOCK,
  payload: {
    id
  }
});
const setTerm = (id, term) => ({
  type: SET_TERM,
  payload: {
    id,
    term
  }
});
const setSearchPostType = (id, postType) => ({
  type: SET_SEARCH_POST_TYPE,
  payload: {
    id,
    postType
  }
});
const setResults = (id, results) => ({
  type: SET_RESULTS,
  payload: {
    id,
    results
  }
});
const addResults = (id, results) => ({
  type: ADD_RESULTS,
  payload: {
    id,
    results
  }
});
const setTotalPages = (id, totalPages) => ({
  type: SET_TOTAL_PAGES,
  payload: {
    id,
    totalPages
  }
});
const setPage = (id, page) => ({
  type: SET_PAGE,
  payload: {
    id,
    page
  }
});
const enableSearchIsLoading = id => ({
  type: SET_SEARCH_IS_LOADING,
  payload: {
    id,
    isLoading: true
  }
});
const disableSearchIsLoading = id => ({
  type: SET_SEARCH_IS_LOADING,
  payload: {
    id,
    isLoading: false
  }
});
const clearBlock = id => ({
  type: CLEAR_BLOCK,
  payload: {
    id
  }
});
// EXTERNAL MODULE: external "tribe.modules.reselect"
var external_tribe_modules_reselect_ = __webpack_require__("MWqi");

// CONCATENATED MODULE: ./src/modules/data/search/selectors.js
/**
 * External dependencies
 */


const blockSelector = (state, props) => state.events.search[props.name];
const getSearchPostType = Object(external_tribe_modules_reselect_["createSelector"])([blockSelector], block => block ? block.postType : DEFAULT_STATE.postType);
const getSearchTerm = Object(external_tribe_modules_reselect_["createSelector"])([blockSelector], block => block ? block.term : DEFAULT_STATE.term);
const getIsLoading = Object(external_tribe_modules_reselect_["createSelector"])([blockSelector], block => block ? block.isLoading : DEFAULT_STATE.isLoading);
const getResults = Object(external_tribe_modules_reselect_["createSelector"])([blockSelector], block => block ? block.results : DEFAULT_STATE.results);
const getPage = Object(external_tribe_modules_reselect_["createSelector"])([blockSelector], block => block ? block.page : DEFAULT_STATE.page);
const getTotal = Object(external_tribe_modules_reselect_["createSelector"])([blockSelector], block => block ? block.totalPages : DEFAULT_STATE.totalPages);
// EXTERNAL MODULE: external "tribe.common.store"
var external_tribe_common_store_ = __webpack_require__("g8L8");

// CONCATENATED MODULE: ./src/modules/data/search/thunks.js
/**
 * Internal dependencies
 */



const {
  request: {
    actions: requestActions,
    utils: requestUtils
  }
} = external_tribe_common_store_["middlewares"];

// @todo [BTRIA-617]: There is a lot of logic in this thunk that should be moved into
// each specific call instead. Given the function name and location,
// "search" should only search given params and handle success/error.
const thunks_search = (id, params) => (dispatch, getState) => {
  const {
    term = '',
    exclude = [],
    perPage = 50,
    populated = false,
    page = 1
  } = params;
  const total = getTotal(getState(), {
    name: id
  });
  if (total !== 0 && page > total) {
    return;
  }

  // This logic should probably not be in here. Instead, this should be called
  // before the search call and determine whether search is called or not.
  if (populated && term.trim() === '') {
    dispatch(clearBlock(id));
    return;
  }
  const query = requestUtils.toWPQuery({
    per_page: perPage,
    search: term,
    page,
    exclude
  });
  const postType = getSearchPostType(getState(), {
    name: id
  });
  const options = {
    path: `${postType}?${query}`,
    actions: {
      start: () => dispatch(enableSearchIsLoading(id)),
      success: _ref => {
        let {
          body,
          headers
        } = _ref;
        if (term !== getSearchTerm(getState(), {
          name: id
        })) {
          return;
        }
        dispatch(disableSearchIsLoading(id));
        if (page === 1) {
          dispatch(setResults(id, body));
        } else {
          dispatch(addResults(id, body));
        }
        dispatch(setPage(id, page));
        dispatch(setTotalPages(id, requestUtils.getTotalPages(headers)));
      },
      error: () => dispatch(disableSearchIsLoading(id))
    }
  };
  dispatch(requestActions.wpRequest(options));
};
// CONCATENATED MODULE: ./src/modules/data/search/index.js
/**
 * Internal dependencies
 */





/* harmony default export */ var data_search = __webpack_exports__["b"] = (reducer);


/***/ }),

/***/ "2TDg":
/***/ (function(module, exports) {

module.exports = lodash.omit;

/***/ }),

/***/ "4Qn9":
/***/ (function(module, exports) {

module.exports = lodash.isEmpty;

/***/ }),

/***/ "6DBo":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6ILJ":
/***/ (function(module, exports) {

module.exports = lodash.unescape;

/***/ }),

/***/ "6OzC":
/***/ (function(module, exports) {

module.exports = lodash.find;

/***/ }),

/***/ "8czI":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8w14":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "AuWn":
/***/ (function(module, exports) {

module.exports = tribe.modules.reactInputAutosize;

/***/ }),

/***/ "B5Bw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCountries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getStateCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getStateName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addressToMapString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return mapLink; });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6OzC");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("XNrZ");
/* harmony import */ var lodash_trim__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_trim__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_identity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("df/k");
/* harmony import */ var lodash_identity__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_identity__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("lCf4");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("nFlj");
/* harmony import */ var querystringify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(querystringify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("kczL");
/* harmony import */ var _moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_5__);







/**
 * Convert data from an array with different keys and values into a unified shape of object.
 *
 * @param {Object} data An object with the data used to retrieve the data
 * @returns {{code: string, name: *}[]} Return an object with code, name values
 */
function toObject() {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(data).map(key => {
    return {
      code: key,
      name: data[key]
    };
  });
}

/**
 * Return the list of all the countries presented by the localized variable: tribe_data_countries
 *
 * @returns {{code: string, name: *}[]} An object with the list of countries
 */
function getCountries() {
  return toObject(Object(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_5__["list"])().countries);
}
function getCountryCode(name) {
  const result = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(getCountries(), country => country.name === name);
  return lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(result, 'code', '');
}
function getStateCode(countryCode, name) {
  const states = getStates(countryCode);
  const result = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(states, state => state.name === name);
  return lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(result, 'code', '');
}
function getStateName(countryCode, code) {
  const states = getStates(countryCode);
  const result = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(states, state => state.code === code);
  return lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(result, 'name', '');
}

/**
 * Return the list of al the states based on the country code
 *
 * @param {string} countryCode The code of the country from where the states are going to be returned
 * @returns {{code: string, name: *}[]} An object with the list of the States
 */
function getStates(countryCode) {
  switch (countryCode) {
    case 'US':
      return toObject(Object(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_5__["list"])().us_states);
    default:
      return [];
  }
}
/* harmony default export */ __webpack_exports__["b"] = (Object(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_5__["list"])());
function addressToMapString() {
  let address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    city,
    street,
    province,
    country
  } = address;
  const components = [city, street, province, country];
  return components.filter(lodash_identity__WEBPACK_IMPORTED_MODULE_2___default.a).map(lodash_trim__WEBPACK_IMPORTED_MODULE_1___default.a).join(', ');
}
function mapLink() {
  let address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    city,
    street,
    province,
    zip,
    country
  } = address;
  const query = [city, street, province, zip, country].filter(lodash_identity__WEBPACK_IMPORTED_MODULE_2___default.a).map(lodash_trim__WEBPACK_IMPORTED_MODULE_1___default.a).join(', ');
  const args = {
    f: 'q',
    source: 's_q',
    geocode: '',
    q: query
  };
  return `https://maps.google.com/maps?${Object(querystringify__WEBPACK_IMPORTED_MODULE_4__["stringify"])(args)}`;
}

/***/ }),

/***/ "B8vQ":
/***/ (function(module, exports) {

module.exports = tribe.common.utils;

/***/ }),

/***/ "BNqv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PREFIX_EVENTS_STORE; });
/* unused harmony export maybeDispatch */
/* unused harmony export maybeBulkDispatch */
/* harmony import */ var lodash_isNaN__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("/iaF");
/* harmony import */ var lodash_isNaN__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNaN__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("peom");
/* harmony import */ var lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1__);


const PREFIX_EVENTS_STORE = '@@MT/EVENTS';

/**
 * Dispatch an action only if the attribute is present inside of the attributes
 *
 * @param {Object} attributes Set of attributes associated with the block
 * @param {Function} dispatch Function used to dispatch into the store
 * @returns {Function} Returns a function that dispatch the action if present
 */
const maybeDispatch = (attributes, dispatch) => (action, key, defaultValue) => {
  if (key in attributes) {
    const useDefault = lodash_isUndefined__WEBPACK_IMPORTED_MODULE_1___default()(attributes[key]) || lodash_isNaN__WEBPACK_IMPORTED_MODULE_0___default()(attributes[key]) || '' === attributes[key];
    const value = useDefault ? defaultValue : attributes[key];
    dispatch(action(value));
  }
};

/**
 * Dispatch a series of actions as an array to decrease verbosity by passing attributes and
 * dispatch to the same set of actions
 *
 * @param {Object} attributes Set of attributes associated with the block
 * @param {Function} dispatch Function used to dispatch into the store
 * @returns {Function} Returns the functions that dispatch the actions if present
 */
const maybeBulkDispatch = function () {
  let attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let dispatch = arguments.length > 1 ? arguments[1] : undefined;
  return function () {
    let actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    actions.forEach(row => maybeDispatch(attributes, dispatch)(...row));
  };
};

/***/ }),

/***/ "GRId":
/***/ (function(module, exports) {

module.exports = wp.element;

/***/ }),

/***/ "In0u":
/***/ (function(module, exports) {

module.exports = lodash.noop;

/***/ }),

/***/ "K2gz":
/***/ (function(module, exports) {

module.exports = tribe.modules.classnames;

/***/ }),

/***/ "KPEA":
/***/ (function(module, exports) {

module.exports = lodash.pick;

/***/ }),

/***/ "MWqi":
/***/ (function(module, exports) {

module.exports = tribe.modules.reselect;

/***/ }),

/***/ "N/iB":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "NG13":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddress", function() { return getAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoordinates", function() { return getCoordinates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefault", function() { return setDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVenueCountry", function() { return getVenueCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVenueStateProvince", function() { return getVenueStateProvince; });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lCf4");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Qn9");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _moderntribe_events_editor_utils_geo_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("B5Bw");
/* harmony import */ var _moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("kczL");
/* harmony import */ var _moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_3__);




const getAddress = function () {
  let details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    meta = {}
  } = details;
  if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(meta)) {
    return {};
  }
  return {
    street: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueAddress', ''),
    city: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueCity', ''),
    province: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueProvince', ''),
    zip: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueZip', ''),
    country: lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueCountry', '')
  };
};
const getCoordinates = function () {
  let details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    meta = {}
  } = details;
  const {
    _VenueLat = '',
    _VenueLng = ''
  } = meta;
  const lat = parseFloat(_VenueLat);
  const lng = parseFloat(_VenueLng);
  return {
    lat: isNaN(lat) ? null : lat,
    lng: isNaN(lng) ? null : lng
  };
};
const setDefault = (value, defaultValue) => value === '' ? defaultValue : value;

/**
 * Get Venue Country
 *
 * @param {Object} meta Object with event meta
 * @returns {string} Venue country
 */
function getVenueCountry(meta) {
  let country = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueCountry', '');
  if ('' === country) {
    const defaultCountry = Object(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_3__["editorDefaults"])().venueCountry;
    const [countryName] = defaultCountry || [];
    country = countryName || '';
  }
  return country;
}

/**
 * Get Venue State/Province
 *
 * @param {Object} meta Object of venue meta
 * @returns {string} The venue state or province
 */
function getVenueStateProvince(meta) {
  let stateProvince = lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(meta, '_VenueStateProvince', '');
  if ('' === stateProvince) {
    const country = getVenueCountry(meta);
    if ('US' === country || 'United States' === country) {
      stateProvince = Object(_moderntribe_events_editor_utils_geo_data__WEBPACK_IMPORTED_MODULE_2__[/* getStateName */ "f"])('US', Object(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_3__["editorDefaults"])().venueState);
    } else {
      stateProvince = Object(_moderntribe_common_utils_globals__WEBPACK_IMPORTED_MODULE_3__["editorDefaults"])().venueProvince;
    }
  }
  return stateProvince;
}

/***/ }),

/***/ "NxMS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Categories", function() { return /* reexport */ categories; });
__webpack_require__.d(__webpack_exports__, "CaretDown", function() { return /* reexport */ caret_down; });
__webpack_require__.d(__webpack_exports__, "CheckboxOn", function() { return /* reexport */ checkbox_on; });
__webpack_require__.d(__webpack_exports__, "CheckboxOff", function() { return /* reexport */ checkbox_off; });
__webpack_require__.d(__webpack_exports__, "Classic", function() { return /* reexport */ classic; });
__webpack_require__.d(__webpack_exports__, "DateTime", function() { return /* reexport */ date_time; });
__webpack_require__.d(__webpack_exports__, "FeaturedImage", function() { return /* reexport */ featured_image; });
__webpack_require__.d(__webpack_exports__, "Link", function() { return /* reexport */ icons_link; });
__webpack_require__.d(__webpack_exports__, "Organizer", function() { return /* reexport */ organizer; });
__webpack_require__.d(__webpack_exports__, "Price", function() { return /* reexport */ price; });
__webpack_require__.d(__webpack_exports__, "Tags", function() { return /* reexport */ tags; });
__webpack_require__.d(__webpack_exports__, "Sharing", function() { return /* reexport */ sharing; });
__webpack_require__.d(__webpack_exports__, "Venue", function() { return /* reexport */ venue; });
__webpack_require__.d(__webpack_exports__, "Website", function() { return /* reexport */ website; });
__webpack_require__.d(__webpack_exports__, "EventsList", function() { return /* reexport */ events_list; });

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__("cDcd");
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// CONCATENATED MODULE: ./src/modules/icons/categories.svg
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var categories = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = _objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 47.92 48"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-categories"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_1-2",
    "data-name": "Layer 1"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M47.89 24.12a1.55 1.55 0 0 1-.25.84 1.55 1.55 0 0 0 .25-.84zM.25 25a1.55 1.55 0 0 1-.25-.88 1.55 1.55 0 0 0 .25.88zM.28 14.24A1.55 1.55 0 0 1 0 13.4a1.55 1.55 0 0 0 .28.84zM47.92 13.4a1.55 1.55 0 0 1-.25.84 1.55 1.55 0 0 0 .25-.84z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-2"] || "cls-2",
    d: "M23.34 37.06a5.14 5.14 0 0 0 1.2 0 5.14 5.14 0 0 1-1.2 0z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-2"] || "cls-2",
    d: "M23.94 41.49a9.21 9.21 0 0 1-4.15-1.32L4 31.81 1 33.4a1.69 1.69 0 0 0 0 3.1l20.67 10.94a5 5 0 0 0 4.62 0L46.9 36.49a1.69 1.69 0 0 0 0-3.1l-3-1.61-15.81 8.39a9.21 9.21 0 0 1-4.15 1.32z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-2"] || "cls-2",
    d: "M47.82 23.6a1.86 1.86 0 0 0-1-1.11l-3.02-1.63-10.25 5.45-5.42 2.88A9.21 9.21 0 0 1 24 30.51a9.21 9.21 0 0 1-4.15-1.32l-5.45-2.88-10.29-5.46L1 22.49a1.86 1.86 0 0 0-1 1.11 1.58 1.58 0 0 0 0 .4 1.61 1.61 0 0 0 .25.86 2 2 0 0 0 .76.69l7.37 3.95 13.25 7a4.86 4.86 0 0 0 1.71.53 5.14 5.14 0 0 0 1.2 0 4.86 4.86 0 0 0 1.71-.53l13.28-7 7.34-3.9a2 2 0 0 0 .76-.69 1.61 1.61 0 0 0 .25-.86 1.58 1.58 0 0 0-.06-.45z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-2"] || "cls-2",
    d: "M24.57 26.08a5.14 5.14 0 0 1-1.2 0 5.14 5.14 0 0 0 1.2 0z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-3"] || "cls-3",
    d: "M47.82 23.69a1.51 1.51 0 0 1 .06.43 1.51 1.51 0 0 0-.06-.43zM0 24.12a1.51 1.51 0 0 1 .06-.43 1.51 1.51 0 0 0-.06.43z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-2"] || "cls-2",
    d: "M47.85 12.61a1.86 1.86 0 0 0-1-1.11L26.28.56a5 5 0 0 0-4.62 0L1 11.51a1.86 1.86 0 0 0-1 1.11 1.58 1.58 0 0 0-.06.44 1.61 1.61 0 0 0 .25.86 2 2 0 0 0 .81.68l3.07 1.63 4.35 2.31L18.75 24l2.92 1.55a4.86 4.86 0 0 0 1.71.53 5.14 5.14 0 0 0 1.2 0 4.86 4.86 0 0 0 1.71-.53L29.2 24l10.26-5.44 4.35-2.31 3.1-1.65a2 2 0 0 0 .76-.69 1.61 1.61 0 0 0 .25-.86 1.58 1.58 0 0 0-.07-.44z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-3"] || "cls-3",
    d: "M47.85 13a1.51 1.51 0 0 1 .06.43 1.51 1.51 0 0 0-.06-.43zM0 13.4a1.51 1.51 0 0 1 .09-.4 1.51 1.51 0 0 0-.09.4z"
  }))));
});
// CONCATENATED MODULE: ./src/modules/icons/caret-down.svg
var caret_down_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function caret_down_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var caret_down = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = caret_down_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", caret_down_extends({
    className: (styles["tribe-common-c-svgicon"] || "tribe-common-c-svgicon") + " " + (styles["tribe-common-c-svgicon--caret-down"] || "tribe-common-c-svgicon--caret-down") + " " + (styles["tribe-events-c-subscribe-dropdown__button-icon"] || "tribe-events-c-subscribe-dropdown__button-icon"),
    height: "6",
    width: "10",
    viewBox: "0 0 10 7",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default.a.createElement("path", {
    fill: "#334aff",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.008.609L5 4.6 8.992.61l.958.958L5 6.517.05 1.566l.958-.958z",
    className: styles["tribe-common-c-svgicon__svg-fill"] || "tribe-common-c-svgicon__svg-fill"
  }));
});
// CONCATENATED MODULE: ./src/modules/icons/checkbox-on.svg
var checkbox_on_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function checkbox_on_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var checkbox_on = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = checkbox_on_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", checkbox_on_extends({
    width: "26",
    height: "14",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null, /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M6 0h12a6 6 0 1 1 0 12H6A6 6 0 1 1 6 0z",
    id: "a"
  }), /*#__PURE__*/external_React_default.a.createElement("circle", {
    id: "b",
    cx: "18",
    cy: "6",
    r: "3.333"
  })), /*#__PURE__*/external_React_default.a.createElement("g", {
    transform: "translate(1 1)",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/external_React_default.a.createElement("use", {
    stroke: "#FFF",
    fill: "#11A0D2",
    fillRule: "nonzero",
    xlinkHref: "#a"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M6.5 4.5v3",
    stroke: "#FFF",
    strokeLinecap: "square"
  }), /*#__PURE__*/external_React_default.a.createElement("use", {
    fill: "#FFF",
    transform: "matrix(-1 0 0 1 36 0)",
    xlinkHref: "#b"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/checkbox-off.svg
var checkbox_off_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function checkbox_off_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var checkbox_off = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = checkbox_off_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", checkbox_off_extends({
    width: "26",
    height: "14",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null, /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M6 0h12a6 6 0 1 1 0 12H6A6 6 0 1 1 6 0z",
    id: "a"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M17.333 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM6 9.333a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z",
    id: "b"
  })), /*#__PURE__*/external_React_default.a.createElement("g", {
    transform: "translate(1 1)",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/external_React_default.a.createElement("use", {
    stroke: "#545D66",
    fill: "#FFF",
    fillRule: "nonzero",
    xlinkHref: "#a"
  }), /*#__PURE__*/external_React_default.a.createElement("use", {
    fill: "#545D66",
    xlinkHref: "#b"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/classic.svg
var classic_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function classic_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var classic = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = classic_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", classic_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-classic"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M38.54 27.22c.37-8.18 2.79-22.7 2.79-22.7a1.52 1.52 0 0 0 0-.2 1.49 1.49 0 0 0-.52-1.13L40.7 3l-.2-.14C38.12 1.44 31.61 0 24 0 16.12 0 9.42 1.54 7.3 3a1.49 1.49 0 0 0-.63 1.22 1.47 1.47 0 0 0 0 .16v.11c.28 1.58 2.54 15.01 2.9 22.73C3.74 28.76 0 31 0 34.47 0 40.91 9 48 24 48s24-7.06 24-13.53c0-3.47-3.74-5.65-9.46-7.25zm-.22 6.35c-3 5.87-13.68 5.6-14.38 5.6s-11.3.18-14.35-5.68v-5.24c4.77 4.18 14.43 4 14.43 4s9.35.33 14.43-4z",
    id: "Layer_1-2",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/date-time.svg
var date_time_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function date_time_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var date_time = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = date_time_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", date_time_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 47.98"
  }, props), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-date-time"), /*#__PURE__*/external_React_default.a.createElement("g", {
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M44 7.38h-4.37V3.5a3.51 3.51 0 0 0-3.5-3.5 3.51 3.51 0 0 0-3.5 3.5v3.88H15.44V3.5a3.51 3.51 0 0 0-3.5-3.5 3.51 3.51 0 0 0-3.5 3.5v3.88H4a4 4 0 0 0-4 4V44a4 4 0 0 0 4 4h40a4 4 0 0 0 4-4V11.38a4 4 0 0 0-4-4zM16.91 39.13h-4.55V24.6H6.73v-3.43A10.71 10.71 0 0 0 9 21a6 6 0 0 0 2-.74 4.87 4.87 0 0 0 1.49-1.39 5 5 0 0 0 .8-2.14h3.62zm22.37 0H22.83a9.34 9.34 0 0 1 .56-3.39 9 9 0 0 1 1.52-2.58 13.32 13.32 0 0 1 2.26-2.1q1.3-1 2.74-2 .74-.51 1.57-1A10.41 10.41 0 0 0 33 26.9a6.21 6.21 0 0 0 1.15-1.44 3.57 3.57 0 0 0 .46-1.82 3.37 3.37 0 0 0-.94-2.54 3.33 3.33 0 0 0-2.42-.91 2.93 2.93 0 0 0-1.68.46 3.46 3.46 0 0 0-1.1 1.22 5.59 5.59 0 0 0-.59 1.66 9.54 9.54 0 0 0-.18 1.81h-4.36a10.74 10.74 0 0 1 .45-3.57 8.3 8.3 0 0 1 1.54-2.88A7 7 0 0 1 27.9 17a8.73 8.73 0 0 1 3.57-.69 8.93 8.93 0 0 1 2.93.48 7.56 7.56 0 0 1 2.45 1.38 6.54 6.54 0 0 1 1.68 2.21 6.77 6.77 0 0 1 .62 2.94 7.1 7.1 0 0 1-.54 2.91 7.66 7.66 0 0 1-1.44 2.16 12.23 12.23 0 0 1-2 1.71l-2.29 1.52q-1.15.75-2.24 1.62a10.13 10.13 0 0 0-1.92 2h10.55z",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/featured-image.svg
var featured_image_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function featured_image_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var featured_image = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = featured_image_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", featured_image_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 43.31"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-featured-image"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_1-2",
    "data-name": "Layer 1"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M44 7.28h-7.68L32 1.6A5.14 5.14 0 0 0 28.48 0h-9A5.14 5.14 0 0 0 16 1.6l-4.32 5.68H4a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h40a4 4 0 0 0 4-4v-28a4 4 0 0 0-4-4zM24 38a13.3 13.3 0 1 1 13.3-13.3A13.3 13.3 0 0 1 24 38z"
  }), /*#__PURE__*/external_React_default.a.createElement("circle", {
    className: styles["cls-1"] || "cls-1",
    cx: "24",
    cy: "24.65",
    r: "8.8"
  }))));
});
// CONCATENATED MODULE: ./src/modules/icons/link.svg
var link_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function link_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var icons_link = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = link_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", link_extends({
    className: (styles["tribe-common-c-svgicon"] || "tribe-common-c-svgicon") + " " + (styles["tribe-common-c-svgicon--cal-export"] || "tribe-common-c-svgicon--cal-export") + " " + (styles["tribe-events-c-subscribe-dropdown__export-icon"] || "tribe-events-c-subscribe-dropdown__export-icon"),
    width: "26",
    height: "15",
    viewBox: "0 0 23 17",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default.a.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.128.896V16.13c0 .211.145.383.323.383h15.354c.179 0 .323-.172.323-.383V.896c0-.212-.144-.383-.323-.383H.451C.273.513.128.684.128.896zm16 6.742h-.901V4.679H1.009v10.729h14.218v-3.336h.901V7.638zM1.01 1.614h14.218v2.058H1.009V1.614z"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M20.5 9.846H8.312m10.212-2.893l2.89 2.909-2.855 2.855",
    strokeWidth: "1.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
});
// CONCATENATED MODULE: ./src/modules/icons/organizer.svg
var organizer_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function organizer_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var organizer = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = organizer_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", organizer_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 47.97"
  }, props), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-organizer"), /*#__PURE__*/external_React_default.a.createElement("g", {
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("g", {
    "data-name": "Layer 1"
  }, /*#__PURE__*/external_React_default.a.createElement("circle", {
    cx: "23.98",
    cy: "11.99",
    r: "11.99"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    d: "M48 43.76a4 4 0 0 0 0-.83C46.53 36 35.53 27 24 27 11.69 27 0 36.69 0 43.89a4 4 0 0 0 4 4h40a4 4 0 0 0 3.78-2.74v-.11a3.93 3.93 0 0 0 .12-.51v-.36-.29c0-.1.1-.05.1-.12z"
  }))));
});
// CONCATENATED MODULE: ./src/modules/icons/price.svg
var price_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function price_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var price = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = price_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", price_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-price"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M24 0a24 24 0 1 0 24 24A24 24 0 0 0 24 0zm3.31 37h-.1l-.37.07q-.49.1-1 .17l-.1 4.27h-4l-.1-4.28a9.15 9.15 0 0 1-5.21-2.35 9.65 9.65 0 0 1-2.59-6.26h4.84a4.52 4.52 0 0 0 1.12 3.21 5.12 5.12 0 0 0 3.94 1.63 5 5 0 0 0 1.08-.07 6.65 6.65 0 0 0 1.38-.31 4.35 4.35 0 0 0 1.3-.69 3.7 3.7 0 0 0 1-1.1 3.1 3.1 0 0 0 .38-1.56 2.66 2.66 0 0 0-.93-2.21 8.89 8.89 0 0 0-3.06-1.31L20.59 25l-.15-.06c-3.7-1.22-5.53-3-5.91-6a3.69 3.69 0 0 1-.09-.76v-.31-.14c0-3.74 3.38-6.78 7.23-7.05l.1-4.28h4l.1 4.34a12.67 12.67 0 0 1 2 .53 8.13 8.13 0 0 1 2.47 1.42A7.11 7.11 0 0 1 32.06 15a8.13 8.13 0 0 1 .78 3H28a3.91 3.91 0 0 0-1-2.38 4.07 4.07 0 0 0-2.17-1.05 6 6 0 0 0-1.32-.11 8.67 8.67 0 0 0-1 .06 9.83 9.83 0 0 0-1 .23 3.29 3.29 0 0 0-1.09.58 2.83 2.83 0 0 0-.77 1 3.13 3.13 0 0 0-.28 1.37 2.42 2.42 0 0 0 .8 1.94 6.07 6.07 0 0 0 2.54 1.07l2.13.51.89.22.47.12c.57.14 1.12.3 1.65.49l.32.12.51.2a10.76 10.76 0 0 1 1.48.72A7.06 7.06 0 0 1 34 29.55c0 3.59-3 6.6-6.69 7.45z",
    id: "Layer_1-2",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/tags.svg
var tags_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function tags_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var tags = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = tags_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", tags_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 47.97"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-tags"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M46.68 22.35L23 1a4 4 0 0 0-2.68-1H4a4 4 0 0 0-4 4v17.68a4 4 0 0 0 1.27 2.92l23.82 22.29a4 4 0 0 0 5.71-.24L47 28a4 4 0 0 0-.32-5.65zM12 16.5a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5z",
    id: "Layer_1-2",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/sharing.svg
var sharing_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function sharing_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var sharing = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = sharing_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", sharing_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-share"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M38.87 29.75a9.11 9.11 0 0 0-7 3.32L18 26.28a8.85 8.85 0 0 0 0-4.56l13.87-6.79a9.13 9.13 0 1 0-2.08-5.8v.7L15 17.05A9.13 9.13 0 1 0 15 31l14.75 7.22v.7a9.13 9.13 0 1 0 9.13-9.13z",
    id: "Layer_1-2",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/venue.svg
var venue_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function venue_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var venue = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = venue_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", venue_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 43.47"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-venue"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M48 13.18C46.94 6.24 36.55 0 24 0S.94 5.8 0 13.18v30.29h7v-11h7v11h5.8V31.28h8.35v12.19h5.94v-11H41v11h7zm-41.4 11a2.06 2.06 0 0 1-2.17-1.93v-4.82A2.06 2.06 0 0 1 6.6 15.5a2.06 2.06 0 0 1 2.17 1.93v4.78a2.06 2.06 0 0 1-2.17 1.93zm8.49-2.33a2.21 2.21 0 0 1-2.17-2.11v-6.42a2.06 2.06 0 0 1 2.17-1.93 2.06 2.06 0 0 1 2.17 1.93v6.38a2.21 2.21 0 0 1-2.17 2.11zm9.06-.62h-.35a2 2 0 0 1-2-2v-7.48a1.9 1.9 0 0 1 2-1.78h.35a1.9 1.9 0 0 1 2 1.78v7.48a2 2 0 0 1-2 1.96zm8.72.62a2.21 2.21 0 0 1-2.17-2.11v-6.42a2.06 2.06 0 0 1 2.17-1.93A2.06 2.06 0 0 1 35 13.32v6.38a2.21 2.21 0 0 1-2.13 2.11zm8.49 2.33a2.06 2.06 0 0 1-2.17-1.93v-4.82a2.06 2.06 0 0 1 2.17-1.93 2.06 2.06 0 0 1 2.17 1.93v4.78a2.06 2.06 0 0 1-2.18 1.93z",
    id: "Layer_1-2",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/website.svg
var website_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function website_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var website = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = website_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", website_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 27.24 37.68"
  }, props), /*#__PURE__*/external_React_default.a.createElement("defs", null), /*#__PURE__*/external_React_default.a.createElement("title", null, "block-icon-website"), /*#__PURE__*/external_React_default.a.createElement("g", {
    id: "Layer_2",
    "data-name": "Layer 2"
  }, /*#__PURE__*/external_React_default.a.createElement("path", {
    className: styles["cls-1"] || "cls-1",
    d: "M0 0l3.54 33.5 7.29-6.18 6 10.37 7.41-4.28-6-10.41 9-3.22z",
    id: "Layer_1-2",
    "data-name": "Layer 1"
  })));
});
// CONCATENATED MODULE: ./src/modules/icons/events-list.svg
var events_list_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function events_list_objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/* harmony default export */ var events_list = (_ref => {
  let {
      styles = {}
    } = _ref,
    props = events_list_objectWithoutProperties(_ref, ["styles"]);
  return /*#__PURE__*/external_React_default.a.createElement("svg", events_list_extends({
    width: "25",
    height: "25",
    viewBox: "0 0 25 25",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default.a.createElement("rect", {
    x: ".63",
    y: ".464",
    width: "24",
    height: "24",
    rx: "2",
    fill: "#499FD1"
  }), /*#__PURE__*/external_React_default.a.createElement("path", {
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    d: "M9.906 7.193h9.66M5.235 7.193h.632M9.906 12.286h9.66M5.235 12.286h.632M9.906 17.378h9.66M5.235 17.378h.632"
  }));
});
// CONCATENATED MODULE: ./src/modules/icons/index.js
















/***/ }),

/***/ "ONcs":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "Q9xL":
/***/ (function(module, exports) {

module.exports = tribe.common.hoc;

/***/ }),

/***/ "RqUN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ reducer_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ selectors_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ actions_namespaceObject; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ utils_namespaceObject; });

// UNUSED EXPORTS: types

// NAMESPACE OBJECT: ./src/modules/data/blocks/price/reducer.js
var reducer_namespaceObject = {};
__webpack_require__.r(reducer_namespaceObject);
__webpack_require__.d(reducer_namespaceObject, "DEFAULT_STATE", function() { return DEFAULT_STATE; });
__webpack_require__.d(reducer_namespaceObject, "defaultStateToMetaMap", function() { return defaultStateToMetaMap; });
__webpack_require__.d(reducer_namespaceObject, "setInitialState", function() { return setInitialState; });
__webpack_require__.d(reducer_namespaceObject, "default", function() { return reducer; });

// NAMESPACE OBJECT: ./src/modules/data/blocks/price/selectors.js
var selectors_namespaceObject = {};
__webpack_require__.r(selectors_namespaceObject);
__webpack_require__.d(selectors_namespaceObject, "getPriceBlock", function() { return getPriceBlock; });
__webpack_require__.d(selectors_namespaceObject, "getPrice", function() { return getPrice; });
__webpack_require__.d(selectors_namespaceObject, "getSymbol", function() { return getSymbol; });
__webpack_require__.d(selectors_namespaceObject, "getPosition", function() { return getPosition; });
__webpack_require__.d(selectors_namespaceObject, "getCode", function() { return getCode; });

// NAMESPACE OBJECT: ./src/modules/data/blocks/price/actions.js
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "setCost", function() { return setCost; });
__webpack_require__.d(actions_namespaceObject, "setPosition", function() { return setPosition; });
__webpack_require__.d(actions_namespaceObject, "setSymbol", function() { return setSymbol; });
__webpack_require__.d(actions_namespaceObject, "setCode", function() { return setCode; });

// NAMESPACE OBJECT: ./src/modules/data/blocks/price/utils.js
var utils_namespaceObject = {};
__webpack_require__.r(utils_namespaceObject);
__webpack_require__.d(utils_namespaceObject, "getPosition", function() { return utils_getPosition; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: external "wp.i18n"
var external_wp_i18n_ = __webpack_require__("l3Sj");

// EXTERNAL MODULE: external "tribe.common.utils.globals"
var external_tribe_common_utils_globals_ = __webpack_require__("kczL");

// EXTERNAL MODULE: external "tribe.common.utils"
var external_tribe_common_utils_ = __webpack_require__("B8vQ");

// EXTERNAL MODULE: ./src/modules/data/utils.js
var utils = __webpack_require__("BNqv");

// CONCATENATED MODULE: ./src/modules/data/blocks/price/types.js
/**
 * Internal dependencies
 */

const SET_PRICE_COST = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_PRICE_COST`;
const SET_PRICE_SYMBOL = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_PRICE_SYMBOL`;
const SET_PRICE_CODE = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_PRICE_CODE`;
const SET_PRICE_POSITION = `${utils["a" /* PREFIX_EVENTS_STORE */]}/SET_PRICE_POSITION`;
// CONCATENATED MODULE: ./src/modules/data/blocks/price/reducer.js

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Wordpress dependenciess
 */


/**
 * Internal dependencies
 */



const reducer_position = external_tribe_common_utils_["string"].isTruthy(Object(external_tribe_common_utils_globals_["settings"])() && Object(external_tribe_common_utils_globals_["settings"])().reverseCurrencyPosition) ? 'suffix' : 'prefix';
const DEFAULT_STATE = {
  position: Object(external_tribe_common_utils_globals_["priceSettings"])() && Object(external_tribe_common_utils_globals_["priceSettings"])().defaultCurrencyPosition ? Object(external_tribe_common_utils_globals_["priceSettings"])().defaultCurrencyPosition : reducer_position,
  symbol: Object(external_tribe_common_utils_globals_["priceSettings"])() && Object(external_tribe_common_utils_globals_["priceSettings"])().defaultCurrencySymbol ? Object(external_tribe_common_utils_globals_["priceSettings"])().defaultCurrencySymbol : Object(external_wp_i18n_["__"])('$', 'the-events-calendar'),
  code: Object(external_tribe_common_utils_globals_["priceSettings"])() && Object(external_tribe_common_utils_globals_["priceSettings"])().defaultCurrencyCode ? Object(external_tribe_common_utils_globals_["priceSettings"])().defaultCurrencyCode : Object(external_wp_i18n_["__"])('USD', 'the-events-calendar'),
  cost: ''
};
const defaultStateToMetaMap = {
  position: '_EventCurrencyPosition',
  symbol: '_EventCurrencySymbol',
  code: '_EventCurrencyCode',
  cost: '_EventCost'
};
const setInitialState = data => {
  const {
    meta
  } = data;
  Object.keys(defaultStateToMetaMap).forEach(key => {
    const metaKey = defaultStateToMetaMap[key];
    if (meta.hasOwnProperty(metaKey)) {
      DEFAULT_STATE[key] = meta[metaKey];
    }
  });
};
/* harmony default export */ var reducer = (function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case SET_PRICE_COST:
      return _objectSpread(_objectSpread({}, state), {}, {
        cost: action.payload.cost
      });
    case SET_PRICE_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, {
        position: action.payload.position
      });
    case SET_PRICE_SYMBOL:
      return _objectSpread(_objectSpread({}, state), {}, {
        symbol: action.payload.symbol
      });
    case SET_PRICE_CODE:
      return _objectSpread(_objectSpread({}, state), {}, {
        code: action.payload.code
      });
    default:
      return state;
  }
});
// EXTERNAL MODULE: external "tribe.modules.reselect"
var external_tribe_modules_reselect_ = __webpack_require__("MWqi");

// CONCATENATED MODULE: ./src/modules/data/blocks/price/selectors.js
/**
 * External dependencies
 */

const getPriceBlock = state => state.events.blocks.price;
const getPrice = Object(external_tribe_modules_reselect_["createSelector"])([getPriceBlock], block => block.cost);
const getSymbol = Object(external_tribe_modules_reselect_["createSelector"])([getPriceBlock], block => block.symbol);
const getPosition = Object(external_tribe_modules_reselect_["createSelector"])([getPriceBlock], block => block.position);
const getCode = Object(external_tribe_modules_reselect_["createSelector"])([getPriceBlock], block => block.code);
// CONCATENATED MODULE: ./src/modules/data/blocks/price/actions.js
/**
 * Internal dependencies
 */

const setCost = cost => ({
  type: SET_PRICE_COST,
  payload: {
    cost
  }
});
const setPosition = position => ({
  type: SET_PRICE_POSITION,
  payload: {
    position
  }
});
const setSymbol = symbol => ({
  type: SET_PRICE_SYMBOL,
  payload: {
    symbol
  }
});
const setCode = code => ({
  type: SET_PRICE_CODE,
  payload: {
    code
  }
});
// CONCATENATED MODULE: ./src/modules/data/blocks/price/utils.js
const utils_getPosition = showBefore => showBefore ? 'prefix' : 'suffix';
// CONCATENATED MODULE: ./src/modules/data/blocks/price/index.js
/**
 * Internal dependencies
 */





/* harmony default export */ var price = __webpack_exports__["b"] = (reducer);


/***/ }),

/***/ "U33w":
/***/ (function(module, exports) {

module.exports = lodash.uniqueId;

/***/ }),

/***/ "UIDf":
/***/ (function(module, exports) {

module.exports = lodash.values;

/***/ }),

/***/ "V4E3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "XNrZ":
/***/ (function(module, exports) {

module.exports = lodash.trim;

/***/ }),

/***/ "ZNLL":
/***/ (function(module, exports) {

module.exports = tribe.common.data;

/***/ }),

/***/ "aHF2":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "dPZZ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "df/k":
/***/ (function(module, exports) {

module.exports = lodash.identity;

/***/ }),

/***/ "e5yv":
/***/ (function(module, exports) {

module.exports = lodash.isArray;

/***/ }),

/***/ "g8L8":
/***/ (function(module, exports) {

module.exports = tribe.common.store;

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = tribe.modules.reactRedux;

/***/ }),

/***/ "hT6J":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "jHzm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Input", function() { return /* reexport */ elements_input; });
__webpack_require__.d(__webpack_exports__, "TermsList", function() { return /* reexport */ terms_list; });
__webpack_require__.d(__webpack_exports__, "OrganizerForm", function() { return /* reexport */ organizer_form; });
__webpack_require__.d(__webpack_exports__, "VenueForm", function() { return /* reexport */ venue_form; });
__webpack_require__.d(__webpack_exports__, "toFields", function() { return /* reexport */ toFields; });
__webpack_require__.d(__webpack_exports__, "toVenue", function() { return /* reexport */ toVenue; });
__webpack_require__.d(__webpack_exports__, "MetaGroup", function() { return /* reexport */ meta_group; });
__webpack_require__.d(__webpack_exports__, "SearchPosts", function() { return /* reexport */ search_posts; });
__webpack_require__.d(__webpack_exports__, "GoogleMap", function() { return /* reexport */ google_map; });
__webpack_require__.d(__webpack_exports__, "Dashboard", function() { return /* reexport */ dashboard; });
__webpack_require__.d(__webpack_exports__, "Month", function() { return /* reexport */ elements_month; });
__webpack_require__.d(__webpack_exports__, "SearchOrCreate", function() { return /* reexport */ search_or_create; });
__webpack_require__.d(__webpack_exports__, "Loading", function() { return /* reexport */ loading; });
__webpack_require__.d(__webpack_exports__, "YearMonthForm", function() { return /* reexport */ year_month_form; });
__webpack_require__.d(__webpack_exports__, "Upsell", function() { return /* reexport */ upsell; });
__webpack_require__.d(__webpack_exports__, "TimeZone", function() { return /* reexport */ timezone; });
__webpack_require__.d(__webpack_exports__, "EditLink", function() { return /* reexport */ edit_link; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__("pVnL");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("QILm");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: external "lodash.noop"
var external_lodash_noop_ = __webpack_require__("In0u");
var external_lodash_noop_default = /*#__PURE__*/__webpack_require__.n(external_lodash_noop_);

// EXTERNAL MODULE: external "lodash.isFunction"
var external_lodash_isFunction_ = __webpack_require__("+Qsg");
var external_lodash_isFunction_default = /*#__PURE__*/__webpack_require__.n(external_lodash_isFunction_);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__("cDcd");
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// EXTERNAL MODULE: external "tribe.modules.propTypes"
var external_tribe_modules_propTypes_ = __webpack_require__("rf6O");
var external_tribe_modules_propTypes_default = /*#__PURE__*/__webpack_require__.n(external_tribe_modules_propTypes_);

// EXTERNAL MODULE: ./node_modules/validator/index.js
var validator = __webpack_require__("+QwO");
var validator_default = /*#__PURE__*/__webpack_require__.n(validator);

// EXTERNAL MODULE: external "wp.element"
var external_wp_element_ = __webpack_require__("GRId");

// EXTERNAL MODULE: external "wp.components"
var external_wp_components_ = __webpack_require__("tI+e");

// EXTERNAL MODULE: ./src/modules/elements/input/style.pcss
var style = __webpack_require__("dPZZ");

// CONCATENATED MODULE: ./src/modules/elements/input/element.js





const _excluded = ["onComplete", "required", "validate"];
/**
 * External dependencies
 */




/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


/**
 * Module Code
 */

/**
 * Input element that adds two important properties:
 *
 * - required
 * - validate
 *
 * Both properties are helpful to provide validation based on the type of the element also has
 * the option to add a cusotm validation callback with the property validateCallback.
 *
 * <Input />
 *
 * Abstraction on top of the native <input> element it gives external instance methods such as:
 *
 * - isValid()
 * - focus()
 */
class element_Input extends external_wp_element_["Component"] {
  /**
   * Default types for properties required for this component
   *
   * @param validated {boolean} If this component needs to be validated
   * @param required {boolean} If this input is required
   */

  /**
   * Set the default values for the required properties if not provided
   *
   * @type {{required: boolean, validate: boolean}}
   */

  constructor() {
    super(...arguments);
    defineProperty_default()(this, "onChange", input => {
      const {
        onChange,
        onComplete,
        validate
      } = this.props;
      const callback = external_lodash_isFunction_default()(onChange) ? onChange : external_lodash_noop_default.a;
      const completeCallback = external_lodash_isFunction_default()(onComplete) ? onComplete : external_lodash_noop_default.a;
      if (validate) {
        this.setState(() => ({
          isValid: this.validate(input)
        }), completeCallback);
        callback(input);
      } else {
        completeCallback();
        callback(input);
      }
    });
    defineProperty_default()(this, "maybeValidate", value => {
      const {
        type,
        required
      } = this.props;
      if (value.length === 0) {
        return !required;
      }
      let isValid = true;
      switch (type) {
        case 'tel':
        case 'phone':
          isValid = validator_default.a.isMobilePhone(value, 'any');
          break;
        case 'email':
          isValid = validator_default.a.isEmail(value);
          break;
        case 'url':
          isValid = validator_default.a.isURL(value);
          break;
        case 'number':
          isValid = validator_default.a.isNumeric(value);
          break;
      }
      return isValid;
    });
    this.state = {
      isValid: this.validate('')
    };
  }

  /**
   * Callback fired every time the input changes, if the property onChange is passed to the component is called as well
   * synchronously.
   *
   * @param {Element} input The input element.
   */

  /**
   * Validates the component using validateCallback if provided or using the logic based on the type inferring
   *
   * @param {string} value The value to be validated
   * @returns {boolean} `true` if the param is valid false otherwise
   */
  validate(value) {
    const {
      validateCallback
    } = this.props;
    return external_lodash_isFunction_default()(validateCallback) ? validateCallback(value) : this.maybeValidate(value);
  }

  /**
   * If the input is empty does not make any validation unless the value is required otherwise it uses the validation
   * based on the type="url" of the <input> component.
   *
   * @param {string} value The value to be validated
   * @returns {boolean} `true` if the param is valid false otherwise
   */

  /**
   * If the component is valid or not based on the validation logic
   *
   * @returns {boolean} Whether the state is valid or not.
   */
  isValid() {
    return this.state.isValid;
  }

  /**
   * Focus to the current component input
   */
  focus() {
    this.input.focus();
  }

  /**
   * If the Component is valid is going to Append the class: `is-valid` otherwise if it fails is going to use the
   * class `is-invalid`.
   *
   * @returns {string|*} The class names.
   */
  getClassName() {
    const {
      className,
      validate
    } = this.props;
    const {
      isValid
    } = this.state;
    const classes = className ? className.split(' ') : [];
    if (validate) {
      if (isValid) {
        classes.push('tribe-editor--valid');
      } else {
        classes.push('tribe-editor--valid');
      }
    }
    return classes.filter(name => name && name.length).join(' ');
  }
  render() {
    // Remove properties that are not part of the DOM.
    const _this$props = this.props,
      {
        onComplete,
        required,
        validate
      } = _this$props,
      properties = objectWithoutProperties_default()(_this$props, _excluded);
    return wp.element.createElement(external_wp_components_["TextControl"], extends_default()({}, properties, {
      className: `${this.getClassName()}`,
      ref: input => this.input = input,
      onChange: this.onChange
    }));
  }
}
defineProperty_default()(element_Input, "propTypes", {
  validate: external_tribe_modules_propTypes_default.a.bool,
  required: external_tribe_modules_propTypes_default.a.bool
});
defineProperty_default()(element_Input, "defaultProps", {
  required: false,
  validate: false
});
/* harmony default export */ var input_element = (element_Input);
// CONCATENATED MODULE: ./src/modules/elements/input/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var elements_input = (input_element);
// EXTERNAL MODULE: external "lodash.unescape"
var external_lodash_unescape_ = __webpack_require__("6ILJ");
var external_lodash_unescape_default = /*#__PURE__*/__webpack_require__.n(external_lodash_unescape_);

// EXTERNAL MODULE: external "tribe.modules.redux"
var external_tribe_modules_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "wp.data"
var external_wp_data_ = __webpack_require__("1ZqX");

// EXTERNAL MODULE: external "wp.i18n"
var external_wp_i18n_ = __webpack_require__("l3Sj");

// EXTERNAL MODULE: ./src/modules/elements/terms-list/style.pcss
var terms_list_style = __webpack_require__("6DBo");

// CONCATENATED MODULE: ./src/modules/elements/terms-list/element.js


const element_excluded = ["className", "slug", "label", "renderEmpty", "isRequesting"];
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

const getTerms = function (terms) {
  let parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!terms || !terms.length) {
    return [];
  }
  if (parentId === null) {
    return terms;
  }
  return terms.filter(term => term.parent === parentId);
};
const getTermListClassName = function () {
  let level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return `tribe-editor__terms__list tribe-editor__terms__list--level-${level}`;
};
const getTermListItemClassName = function () {
  let level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return `tribe-editor__terms__list-item tribe-editor__terms__list-item--level-${level}`;
};
const termName = function () {
  let term = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return term.name ? external_lodash_unescape_default()(term.name).trim() : Object(external_wp_i18n_["__"])('(Untitled)', 'the-events-calendar');
};
const Label = _ref => {
  let {
    text
  } = _ref;
  return wp.element.createElement("strong", {
    className: "tribe-editor__terms__label",
    key: "terms-label"
  }, text, ' ');
};
const Empty = _ref2 => {
  let {
    renderEmpty = null,
    id,
    label
  } = _ref2;
  return renderEmpty && wp.element.createElement("div", {
    key: id,
    className: "tribe-editor__terms--empty"
  }, wp.element.createElement(Label, {
    text: label
  }), renderEmpty);
};
const List = _ref3 => {
  let {
    terms = [],
    termSeparator = ', ',
    isLoading = false,
    id = '',
    className = ''
  } = _ref3;
  if (isLoading) {
    return wp.element.createElement(Loading, {
      id: id,
      className: className
    });
  }
  return wp.element.createElement("ul", {
    className: getTermListClassName()
  }, terms.map((term, index) => wp.element.createElement(Item, {
    key: index,
    term: term,
    separator: termSeparator,
    isLast: index + 1 === terms.length
  })));
};
const Separator = _ref4 => {
  let {
    delimiter,
    isLast
  } = _ref4;
  return !isLast ? wp.element.createElement("span", null, delimiter) : '';
};
const Item = _ref5 => {
  let {
    separator,
    term,
    isLast
  } = _ref5;
  let termLink = term.link;

  // Modifies the tag slug for the post_tag taxonomy to include an "events" prefix.
  if ('post_tag' === term.taxonomy) {
    termLink = '/events/tag/' + term.slug;
  }
  return wp.element.createElement("li", {
    key: term.id,
    className: getTermListItemClassName(0)
  }, wp.element.createElement("a", {
    href: termLink,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "tribe-editor__terms__list-item-link"
  }, termName(term)), wp.element.createElement(Separator, {
    delimiter: separator,
    isLast: isLast
  }));
};
const Loading = _ref6 => {
  let {
    id = '',
    className = ''
  } = _ref6;
  return wp.element.createElement("div", {
    key: id,
    className: `tribe-editor__terms__spinner ${className}`
  }, wp.element.createElement(Label, null), wp.element.createElement(external_wp_components_["Spinner"], {
    key: "terms-spinner"
  }));
};
const TaxonomiesElement = _ref7 => {
  let {
      className,
      slug,
      label,
      renderEmpty,
      isRequesting
    } = _ref7,
    rest = objectWithoutProperties_default()(_ref7, element_excluded);
  const terms = getTerms(rest.terms);
  const key = `tribe-terms-${slug}`;
  if (!terms.length && !isRequesting) {
    return wp.element.createElement(Empty, {
      id: key,
      renderEmpty: renderEmpty,
      label: label
    });
  }
  return wp.element.createElement("div", {
    key: key,
    className: `tribe-editor__terms ${className}`
  }, wp.element.createElement(Label, {
    text: label
  }), wp.element.createElement("div", {
    key: "terms",
    className: "tribe-editor__terms__list-wrapper"
  }, wp.element.createElement(List, {
    terms: terms,
    className: className,
    id: key,
    isLoading: isRequesting
  })));
};
TaxonomiesElement.defaultProps = {
  termSeparator: Object(external_wp_i18n_["__"])(', ', 'the-events-calendar'),
  className: '',
  terms: [],
  isRequesting: false
};
const applySelect = Object(external_wp_data_["withSelect"])((select, props) => {
  const {
    getEntityRecords
  } = select('core');
  const {
    isResolving
  } = select('core/data');
  const {
    slug
  } = props;
  // post_tags are stored as 'tags' in the editor attributes
  const attributeName = slug === 'post_tag' ? 'tags' : slug;
  const ids = select('core/editor').getEditedPostAttribute(attributeName);
  if (!ids || ids.length === 0) {
    return {
      terms: [],
      isRequesting: false
    };
  }
  const query = {
    orderby: 'count',
    order: 'desc',
    include: ids
  };
  return {
    terms: getEntityRecords('taxonomy', slug, query),
    isRequesting: isResolving('core', 'getEntityRecords', ['taxonomy', slug, query])
  };
});
/* harmony default export */ var terms_list_element = (Object(external_tribe_modules_redux_["compose"])(applySelect)(TaxonomiesElement));
// CONCATENATED MODULE: ./src/modules/elements/terms-list/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var terms_list = (terms_list_element);
// EXTERNAL MODULE: external "lodash.values"
var external_lodash_values_ = __webpack_require__("UIDf");
var external_lodash_values_default = /*#__PURE__*/__webpack_require__.n(external_lodash_values_);

// CONCATENATED MODULE: ./src/modules/elements/organizer-form/element.js



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


/**
 * Module Code
 */

class element_OrganizerForm extends external_wp_element_["Component"] {
  constructor() {
    super(...arguments);
    defineProperty_default()(this, "state", {
      title: null,
      phone: '',
      website: '',
      email: '',
      organizer: null,
      isValid: true
    });
    defineProperty_default()(this, "fields", {});
    defineProperty_default()(this, "isCreating", () => {
      const {
        organizer
      } = this.state;
      if (!organizer) {
        return false;
      }
      if (!external_lodash_isFunction_default()(organizer.state)) {
        return false;
      }
      return 'pending' === organizer.state();
    });
    defineProperty_default()(this, "onSubmit", () => {
      const {
        title,
        phone,
        website,
        email
      } = this.state;
      this.updateOrganizer({
        title: title,
        // For now every Organizer goes are publish
        status: 'publish',
        meta: {
          _OrganizerEmail: email,
          _OrganizerPhone: phone,
          _OrganizerWebsite: website
        }
      });
    });
    defineProperty_default()(this, "onInputChange", key => value => {
      this.setState({
        [key]: value
      });
    });
    defineProperty_default()(this, "onInputComplete", () => {
      this.setState({
        isValid: this.isValid()
      });
    });
    defineProperty_default()(this, "updateOrganizer", toSend => {
      const {
        postType
      } = this.props;
      const request = wp.apiRequest({
        path: `/wp/v2/${postType}`,
        method: 'POST',
        data: toSend
      });

      // Set the organizer state
      this.setState({
        organizer: request
      });
      request.done(newPost => {
        if (!newPost.id) {
          console.warning('Invalid creation of organizer:', newPost);
        }
        this.props.addOrganizer(newPost.id, newPost);
        this.props.onClose();
      }).fail(err => {
        console.error(err);
      });
    });
    defineProperty_default()(this, "isValid", () => {
      const fields = external_lodash_values_default()(this.fields);
      const results = fields.filter(input => input.isValid());
      return fields.length === results.length;
    });
    defineProperty_default()(this, "saveRef", input => {
      if (input) {
        const {
          props
        } = input;
        const {
          name
        } = props || {};
        this.fields[name] = input;
      }
    });
  }
  render() {
    if (this.isCreating()) {
      return wp.element.createElement("div", {
        className: "tribe-editor__organizer__form",
        key: "tribe-organizer-form"
      }, wp.element.createElement(external_wp_components_["Placeholder"], {
        key: "placeholder"
      }, wp.element.createElement(external_wp_components_["Spinner"], null)));
    }
    return wp.element.createElement("div", {
      className: "tribe-editor__organizer__form",
      key: "tribe-organizer-form"
    }, wp.element.createElement("h3", {
      key: "tribe-organizer-form-title"
    }, Object(external_wp_i18n_["__"])('Create Organizer')), wp.element.createElement("p", {
      className: "description"
    }, Object(external_wp_i18n_["__"])('The e-mail address will be obfuscated on your site to avoid it getting harvested by spammers.',
    // eslint-disable-line max-len
    'the-events-calendar')), wp.element.createElement("dl", null, wp.element.createElement("dt", null, Object(external_wp_i18n_["__"])('Name:', 'the-events-calendar')), wp.element.createElement("dd", null, wp.element.createElement(elements_input, {
      type: "text",
      ref: this.saveRef,
      name: "organizer[name]",
      onComplete: this.onInputComplete,
      onChange: this.onInputChange('title'),
      validate: true
    })), wp.element.createElement("dt", null, Object(external_wp_i18n_["__"])('Phone:', 'the-events-calendar')), wp.element.createElement("dd", null, wp.element.createElement(elements_input, {
      type: "phone",
      ref: this.saveRef,
      name: "organizer[phone]",
      onComplete: this.onInputComplete,
      onChange: this.onInputChange('phone'),
      validate: true,
      "data-testid": "organizer-form-input-phone"
    })), wp.element.createElement("dt", null, Object(external_wp_i18n_["__"])('Website:', 'the-events-calendar')), wp.element.createElement("dd", null, wp.element.createElement(elements_input, {
      type: "url",
      ref: this.saveRef,
      onComplete: this.onInputComplete,
      onChange: this.onInputChange('website'),
      name: "organizer[website]",
      validate: true
    })), wp.element.createElement("dt", null, Object(external_wp_i18n_["__"])('Email:', 'the-events-calendar')), wp.element.createElement("dd", null, wp.element.createElement(elements_input, {
      type: "email",
      ref: this.saveRef,
      name: "organizer[email]",
      onComplete: this.onInputComplete,
      onChange: this.onInputChange('email'),
      validate: true
    }))), wp.element.createElement("button", {
      type: "button",
      className: "button-secondary",
      onClick: this.onSubmit,
      disabled: !this.isValid(),
      "data-testid": "organizer-form-button-create"
    }, Object(external_wp_i18n_["__"])('Create Organizer', 'the-events-calendar')));
  }
}
defineProperty_default()(element_OrganizerForm, "defaultProps", {
  postType: 'tribe_organizer'
});
/* harmony default export */ var organizer_form_element = (element_OrganizerForm);
// CONCATENATED MODULE: ./src/modules/elements/organizer-form/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var organizer_form = (organizer_form_element);
// EXTERNAL MODULE: external "lodash.pick"
var external_lodash_pick_ = __webpack_require__("KPEA");
var external_lodash_pick_default = /*#__PURE__*/__webpack_require__.n(external_lodash_pick_);

// EXTERNAL MODULE: external "lodash.get"
var external_lodash_get_ = __webpack_require__("lCf4");
var external_lodash_get_default = /*#__PURE__*/__webpack_require__.n(external_lodash_get_);

// EXTERNAL MODULE: ./src/modules/editor/utils/geo-data.js
var geo_data = __webpack_require__("B5Bw");

// EXTERNAL MODULE: ./src/modules/data/blocks/venue/utils.js
var utils = __webpack_require__("NG13");

// EXTERNAL MODULE: external "tribe.common.utils.globals"
var external_tribe_common_utils_globals_ = __webpack_require__("kczL");

// EXTERNAL MODULE: ./src/modules/elements/venue-form/style.pcss
var venue_form_style = __webpack_require__("aHF2");

// CONCATENATED MODULE: ./src/modules/elements/venue-form/element.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */





const {
  RichText
} = external_tribe_common_utils_globals_["wpEditor"];
function toFields(venue) {
  const title = external_lodash_get_default()(venue, 'title', {});
  const meta = external_lodash_get_default()(venue, 'meta', {});
  const address = Object(utils["setDefault"])(external_lodash_get_default()(meta, '_VenueAddress', ''), Object(external_tribe_common_utils_globals_["editorDefaults"])().venueAddress);
  const city = Object(utils["setDefault"])(external_lodash_get_default()(meta, '_VenueCity', ''), Object(external_tribe_common_utils_globals_["editorDefaults"])().venueCity);
  const country = Object(utils["getVenueCountry"])(meta);
  const stateProvince = Object(utils["getVenueStateProvince"])(meta);
  const zip = Object(utils["setDefault"])(external_lodash_get_default()(meta, '_VenueZip', ''), Object(external_tribe_common_utils_globals_["editorDefaults"])().venueZip);
  const phone = Object(utils["setDefault"])(external_lodash_get_default()(meta, '_VenuePhone', ''), Object(external_tribe_common_utils_globals_["editorDefaults"])().venuePhone);
  const url = external_lodash_get_default()(meta, '_VenueURL', '');
  const countryCode = Object(geo_data["d" /* getCountryCode */])(country);
  return {
    title: external_lodash_get_default()(title, 'rendered', ''),
    address,
    city,
    country: countryCode,
    zip,
    phone,
    url,
    stateProvince: Object(geo_data["e" /* getStateCode */])(countryCode, stateProvince)
  };
}
function toVenue(fields) {
  const {
    title,
    address,
    city,
    country,
    zip,
    phone,
    url,
    stateProvince
  } = fields;
  return {
    title,
    status: 'draft',
    meta: {
      _VenueAddress: address,
      _VenueCity: city,
      _VenueCountry: country,
      _VenueProvince: stateProvince,
      _VenueZip: zip,
      _VenuePhone: phone,
      _VenueURL: url,
      _VenueState: stateProvince,
      _VenueStateProvince: stateProvince,
      _VenueShowMap: true,
      _VenueShowMapLink: true
    }
  };
}

/**
 * Module Code
 */

class element_VenueForm extends external_wp_element_["Component"] {
  constructor(_props) {
    super(...arguments);
    defineProperty_default()(this, "onInputChange", key => value => {
      this.setState({
        [key]: value
      });
    });
    defineProperty_default()(this, "saveRef", input => {
      if (input) {
        const {
          props
        } = input;
        const {
          name
        } = props || {};
        this.fields[name] = input;
      }
    });
    this.state = _objectSpread({
      title: '',
      address: '',
      city: '',
      country: '',
      zip: '',
      phone: '',
      url: '',
      stateProvince: ''
    }, _props);
    this.fields = {};
  }
  componentWillUnmount() {
    const FIELDS = ['title', 'address', 'city', 'country', 'zip', 'phone', 'url', 'stateProvince'];
    const fields = external_lodash_pick_default()(this.state, FIELDS);
    fields.country = external_lodash_get_default()(geo_data["b" /* default */].countries, fields.country, '') || fields.country;
    fields.stateProvince = external_lodash_get_default()(geo_data["b" /* default */].us_states, fields.stateProvince, '') || fields.stateProvince;
    this.props.onSubmit(fields);
  }
  renderOption(element) {
    return wp.element.createElement("option", {
      value: element.code,
      key: element.code
    }, element.name);
  }
  renderCountry() {
    const {
      country
    } = this.state;
    const placeholder = country ? null : wp.element.createElement("option", {
      value: "",
      disabled: true
    }, Object(external_wp_i18n_["__"])('Country', 'the-events-calendar'));

    /**
     * @todo: figure out what to do about onChange event (accessibility).
     */

    return wp.element.createElement("select", {
      // eslint-disable-line
      value: country,
      className: "small tribe-editor__venue__select",
      onChange: event => this.setState({
        country: event.target.value
      })
    }, placeholder, Object(geo_data["c" /* getCountries */])().map(this.renderOption));
  }
  renderState() {
    const {
      stateProvince,
      country
    } = this.state;
    const states = Object(geo_data["g" /* getStates */])(country);
    if (states.length === 0) {
      return wp.element.createElement(elements_input, {
        className: "medium",
        type: "text",
        name: "venue[stateProvince]",
        placeholder: "State",
        ref: this.saveRef,
        onChange: this.onInputChange('stateProvince'),
        value: stateProvince
      });
    }
    delete this.fields['venue[stateProvince]'];

    /**
     * @todo: figure out what to do about onChange event (accessibility).
     */

    return wp.element.createElement("select", {
      // eslint-disable-line
      value: stateProvince,
      onChange: event => this.setState({
        stateProvince: event.target.value
      }),
      className: "medium tribe-editor__venue__select"
    }, states.map(this.renderOption));
  }
  render() {
    const {
      title,
      address,
      city,
      zip,
      phone,
      url
    } = this.state;
    return wp.element.createElement("div", {
      className: "tribe-editor__venue__form",
      key: "tribe-venue-form"
    }, wp.element.createElement(RichText, {
      tagName: "h3",
      format: "string",
      value: title,
      onChange: value => {
        this.setState({
          title: value
        });
      },
      formattingControls: []
    }), wp.element.createElement("div", {
      className: "tribe-editor__venue__fields"
    }, wp.element.createElement(elements_input, {
      type: "text",
      name: "venue[address]",
      placeholder: "Street Address",
      ref: this.saveRef,
      value: address,
      onChange: this.onInputChange('address')
    }), wp.element.createElement(elements_input, {
      type: "text",
      name: "venue[city]",
      placeholder: "City",
      ref: this.saveRef,
      onChange: this.onInputChange('city'),
      value: city
    }), wp.element.createElement("div", {
      className: "row"
    }, this.renderCountry(), this.renderState()), wp.element.createElement("div", {
      className: "row"
    }, wp.element.createElement(elements_input, {
      className: "small",
      type: "text",
      name: "venue[zip]",
      placeholder: "ZIP",
      ref: this.saveRef,
      onChange: this.onInputChange('zip'),
      value: zip
    })), wp.element.createElement(elements_input, {
      type: "tel",
      name: "venue[phone]",
      placeholder: "Phone number",
      ref: this.saveRef,
      onChange: this.onInputChange('phone'),
      value: phone
    }), wp.element.createElement(elements_input, {
      type: "url",
      name: "venue[url]",
      placeholder: "Website",
      ref: this.saveRef,
      onChange: this.onInputChange('url'),
      value: url
    })));
  }
}
defineProperty_default()(element_VenueForm, "defaultProps", {
  onSubmit: external_lodash_noop_default.a
});
// CONCATENATED MODULE: ./src/modules/elements/venue-form/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var venue_form = (element_VenueForm);

// EXTERNAL MODULE: external "tribe.modules.classnames"
var external_tribe_modules_classnames_ = __webpack_require__("K2gz");
var external_tribe_modules_classnames_default = /*#__PURE__*/__webpack_require__.n(external_tribe_modules_classnames_);

// CONCATENATED MODULE: ./src/modules/elements/meta-group/element.js

/**
 * External dependencies
 */



/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

/**
 * Module Code
 */
class element_MetaGroup extends external_wp_element_["Component"] {
  render() {
    const {
      groupKey,
      className,
      children
    } = this.props;
    const names = external_tribe_modules_classnames_default()(['tribe-editor__meta-group', `tribe-editor__meta-group--${groupKey}`, className]);
    return wp.element.createElement("div", {
      className: names,
      key: groupKey
    }, children);
  }
}
defineProperty_default()(element_MetaGroup, "defaultProps", {
  className: '',
  children: null
});
/* harmony default export */ var meta_group_element = (element_MetaGroup);
// CONCATENATED MODULE: ./src/modules/elements/meta-group/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var meta_group = (meta_group_element);
// EXTERNAL MODULE: external "tribe.modules.reactRedux"
var external_tribe_modules_reactRedux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./src/modules/data/search/index.js + 7 modules
var search = __webpack_require__("2IT2");

// EXTERNAL MODULE: external "tribe.common.hoc"
var external_tribe_common_hoc_ = __webpack_require__("Q9xL");

// EXTERNAL MODULE: external "lodash.uniqueId"
var external_lodash_uniqueId_ = __webpack_require__("U33w");
var external_lodash_uniqueId_default = /*#__PURE__*/__webpack_require__.n(external_lodash_uniqueId_);

// EXTERNAL MODULE: ./node_modules/he/he.js
var he = __webpack_require__("ktc5");

// EXTERNAL MODULE: ./src/modules/elements/search-posts/style.pcss
var search_posts_style = __webpack_require__("mXU7");

// CONCATENATED MODULE: ./src/modules/elements/search-posts/template.js


/**
 * External dependencies
 */





/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



/**
 * Module Code
 */

class template_SearchPosts extends external_React_["Component"] {
  constructor() {
    super(...arguments);
    defineProperty_default()(this, "renderToggle", _ref => {
      let {
        onToggle
      } = _ref;
      return wp.element.createElement(external_tribe_common_utils_globals_["IconButton"], {
        className: "tribe-editor__btn",
        label: this.props.iconLabel,
        onClick: onToggle,
        icon: wp.element.createElement(external_wp_components_["Dashicon"], {
          icon: "search"
        })
      });
    });
    defineProperty_default()(this, "renderList", onClose => {
      const {
        results,
        isLoading,
        onItemClick
      } = this.props;
      if (isLoading) {
        return wp.element.createElement(external_wp_components_["Placeholder"], {
          key: "placeholder"
        }, wp.element.createElement(external_wp_components_["Spinner"], null));
      }
      return wp.element.createElement("ul", {
        className: "tribe-editor__search-posts__results-list"
      }, results.map(item => wp.element.createElement("li", {
        key: `post-${item.id}`,
        className: "tribe-editor__search-posts__results-list-item"
      }, wp.element.createElement("button", {
        className: "tribe-editor__search-posts__results-list-item-button",
        onClick: () => onItemClick(onClose)(item)
      }, Object(he["decode"])(item.title.rendered)))));
    });
    defineProperty_default()(this, "renderDropdown", _ref2 => {
      let {
        isOpen,
        onClose
      } = _ref2;
      return wp.element.createElement("div", {
        className: external_tribe_modules_classnames_default()('tribe-editor__search-posts'),
        "aria-expanded": isOpen
      }, this.renderSearchInput(), wp.element.createElement("div", {
        className: external_tribe_modules_classnames_default()('tribe-editor__search-posts__results'),
        onScroll: this.props.onDropdownScroll
      }, this.renderList(onClose)));
    });
  }
  componentDidMount() {
    this.props.onMount();
  }
  renderSearchInput() {
    const {
      term,
      searchLabel,
      onInputChange
    } = this.props;
    const instanceId = external_lodash_uniqueId_default()('search-');
    return wp.element.createElement("div", null, wp.element.createElement("label", {
      htmlFor: `editor-inserter__${instanceId}`,
      className: "screen-reader-text"
    }, searchLabel), wp.element.createElement("input", {
      id: `editor-inserter__${instanceId}`,
      type: "search",
      placeholder: searchLabel,
      value: term,
      className: "editor-inserter__search",
      onChange: onInputChange
    }));
  }
  render() {
    return wp.element.createElement(external_wp_components_["Dropdown"], {
      className: "tribe-editor__dropdown",
      position: "bottom center",
      contentClassName: "tribe-editor__dropdown-dialog",
      onToggle: this.props.onDropdownToggle,
      renderToggle: this.renderToggle,
      renderContent: this.renderDropdown
    });
  }
}
defineProperty_default()(template_SearchPosts, "propTypes", {
  name: external_tribe_modules_propTypes_default.a.string.isRequired,
  postType: external_tribe_modules_propTypes_default.a.string.isRequired,
  exclude: external_tribe_modules_propTypes_default.a.array.isRequired,
  searchLabel: external_tribe_modules_propTypes_default.a.string,
  iconLabel: external_tribe_modules_propTypes_default.a.string,
  term: external_tribe_modules_propTypes_default.a.string.isRequired,
  isLoading: external_tribe_modules_propTypes_default.a.bool.isRequired,
  results: external_tribe_modules_propTypes_default.a.array.isRequired,
  page: external_tribe_modules_propTypes_default.a.number.isRequired,
  onMount: external_tribe_modules_propTypes_default.a.func.isRequired,
  onInputChange: external_tribe_modules_propTypes_default.a.func.isRequired,
  onItemClick: external_tribe_modules_propTypes_default.a.func.isRequired,
  onDropdownScroll: external_tribe_modules_propTypes_default.a.func.isRequired,
  onDropdownToggle: external_tribe_modules_propTypes_default.a.func.isRequired
});
/* harmony default export */ var template = (template_SearchPosts);
// CONCATENATED MODULE: ./src/modules/elements/search-posts/element.js

function element_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function element_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? element_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : element_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * External dependencies
 */



/**
 * Internal dependencies
 */




/**
 * Module Code
 */

const onMount = (dispatch, ownProps) => () => {
  const {
    name,
    postType,
    exclude
  } = ownProps;
  dispatch(search["a" /* actions */].addBlock(name));
  dispatch(search["a" /* actions */].setSearchPostType(name, postType));
  dispatch(search["d" /* thunks */].search(name, {
    term: '',
    exclude
  }));
};
const element_onInputChange = (dispatch, ownProps) => event => {
  const {
    name,
    exclude
  } = ownProps;
  const {
    value
  } = event.target;
  dispatch(search["a" /* actions */].setTerm(name, value));
  dispatch(search["d" /* thunks */].search(name, {
    term: value,
    exclude
  }));
};
const element_onItemClick = (dispatch, ownProps) => onClose => item => {
  const {
    name,
    onItemSelect
  } = ownProps;
  dispatch(search["a" /* actions */].setTerm(name, ''));
  if (onItemSelect) {
    onItemSelect(item.id, item);
  }
  onClose();
};
const onDropdownScroll = (stateProps, dispatchProps, ownProps) => event => {
  const {
    target
  } = event;
  const {
    scrollHeight,
    scrollTop
  } = target;
  const scrollPercentage = scrollTop / (scrollHeight - target.offsetHeight) * 100;
  if (scrollPercentage > 75) {
    const {
      term,
      page
    } = stateProps;
    const {
      name,
      exclude
    } = ownProps;
    dispatchProps.dispatch(search["d" /* thunks */].search(name, {
      term,
      exclude,
      populated: true,
      page: page + 1
    }));
  }
};
const onDropdownToggle = (stateProps, dispatchProps, ownProps) => isOpen => {
  if (!isOpen && stateProps.term !== '') {
    dispatchProps.dispatch(search["a" /* actions */].setTerm(ownProps.name, ''));
  }
};
const mapStateToProps = (state, props) => ({
  term: search["c" /* selectors */].getSearchTerm(state, props),
  isLoading: search["c" /* selectors */].getIsLoading(state, props),
  results: search["c" /* selectors */].getResults(state, props),
  page: search["c" /* selectors */].getPage(state, props)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: onMount(dispatch, ownProps),
  onInputChange: element_onInputChange(dispatch, ownProps),
  onItemClick: element_onItemClick(dispatch, ownProps),
  dispatch
});
const mergeProps = (stateProps, dispatchProps, ownProps) => element_objectSpread(element_objectSpread(element_objectSpread(element_objectSpread({}, ownProps), stateProps), dispatchProps), {}, {
  onDropdownScroll: onDropdownScroll(stateProps, dispatchProps, ownProps),
  onDropdownToggle: onDropdownToggle(stateProps, dispatchProps, ownProps)
});
/* harmony default export */ var search_posts_element = (Object(external_tribe_modules_redux_["compose"])(Object(external_tribe_common_hoc_["withStore"])(), Object(external_tribe_modules_reactRedux_["connect"])(mapStateToProps, mapDispatchToProps, mergeProps))(template));
// CONCATENATED MODULE: ./src/modules/elements/search-posts/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var search_posts = (search_posts_element);
// EXTERNAL MODULE: external "lodash.isEmpty"
var external_lodash_isEmpty_ = __webpack_require__("4Qn9");
var external_lodash_isEmpty_default = /*#__PURE__*/__webpack_require__.n(external_lodash_isEmpty_);

// EXTERNAL MODULE: external "lodash.isArray"
var external_lodash_isArray_ = __webpack_require__("e5yv");
var external_lodash_isArray_default = /*#__PURE__*/__webpack_require__.n(external_lodash_isArray_);

// EXTERNAL MODULE: ./node_modules/querystringify/index.js
var querystringify = __webpack_require__("nFlj");

// EXTERNAL MODULE: ./src/modules/elements/google-map/style.pcss
var google_map_style = __webpack_require__("ONcs");

// CONCATENATED MODULE: ./src/modules/elements/google-map/element.js






function google_map_element_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function google_map_element_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? google_map_element_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : google_map_element_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * External dependencies
 */





/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */



/**
 * Module Code
 */
const IMAGE_FORMATS = {
  // png8 or png (default) specifies the 8-bit PNG format.
  PNG: 'png',
  // png32 specifies the 32-bit PNG format.
  PNG32: 'png32',
  // gif specifies the GIF format.
  GIF: 'gif',
  // jpg specifies the JPEG compression format.
  JPG: 'jpg',
  // jpg-baseline specifies a non-progressive JPEG compression format.
  JPG_BASELINE: 'jpg-baseline'
};
const MAP_TYPES = {
  // roadmap (default) specifies a standard roadmap image, as is normally shown on the Google Maps website.
  ROADMAP: 'roadmap',
  // satellite specifies a satellite image.
  SATELLITE: 'satellite',
  // terrain specifies a physical relief map image, showing terrain and vegetation.
  TERRAIN: 'terrain',
  // hybrid specifies a hybrid of the satellite and roadmap image,
  // showing a transparent layer of major streets and place names on the satellite image.
  HYBRID: 'hybrid'
};
const IMAGE_FORMATS_VALUES = external_lodash_values_default()(IMAGE_FORMATS);
const MAP_TYPES_VALUES = external_lodash_values_default()(MAP_TYPES);
const API_KEY = external_lodash_get_default()(Object(external_tribe_common_utils_globals_["mapsAPI"])(), 'key', '');
const DEFAULT_ZOOM = parseInt(external_lodash_get_default()(Object(external_tribe_common_utils_globals_["mapsAPI"])(), 'zoom', 14), 10);

/**
 * A wrapper for Google's Static Maps
 *
 * @see https://developers.google.com/maps/documentation/staticmaps/intro#Overview
 * @example: http://staticmapmaker.com/google/
 */

class element_GoogleMap extends external_wp_element_["Component"] {
  constructor(props) {
    super(...arguments);
    defineProperty_default()(this, "tryAgain", () => {
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (this.tries >= this.MAX_TRIES) {
        this.setState({
          isLoading: false,
          error: Object(external_wp_i18n_["__"])('Make sure Google Maps Library is included on this page.', 'the-events-calendar')
        });
        return;
      }
      this.interval = setInterval(() => {
        this.loadMap();
      }, 500);
      this.tries += 1;
    });
    defineProperty_default()(this, "attachInteractiveMap", () => {
      const {
        interactive
      } = this.state;
      const {
        interactiveMapContainer,
        map
      } = this;
      if (!interactive || !interactiveMapContainer.current) {
        return this.renderImage();
      }
      const {
        maps
      } = Object(external_tribe_common_utils_globals_["google"])();
      map.instance = new maps.Map(interactiveMapContainer.current, this.getMapConfig());
      if (map.instance) {
        map.marker = new maps.Marker({
          position: this.getLocation(),
          map: map.instance
        });
      }
    });
    this.state = google_map_element_objectSpread(google_map_element_objectSpread({}, props), {}, {
      error: '',
      isLoading: true,
      rendered: false
    });
    this.interactiveMapContainer = /*#__PURE__*/external_React_default.a.createRef();
    this.map = {
      instance: null,
      marker: null
    };
    this.interval = external_lodash_noop_default.a;
    this.tries = 0;
    this.MAX_TRIES = 5;
  }

  /**
   * @todo  We need to not do this Logic over in this template
   * @see   https://github.com/moderntribe/events-gutenberg/pull/327#discussion_r219090823
   */

  static getDerivedStateFromProps(nextProps, prevState) {
    // return if it was rendered already
    if (true === prevState.rendered) {
      return null;
    }

    // return if the coordinates haven't changed
    if (nextProps.coordinates.lat === prevState.coordinates.lat && nextProps.coordinates.lng === prevState.coordinates.lng) {
      return null;
    }
    return {
      rendered: true,
      loadingMap: false
    };
  }
  componentDidMount() {
    this.loadMap();
  }
  loadMap() {
    if (!Object(external_tribe_common_utils_globals_["google"])()) {
      this.tryAgain();
      return;
    }
    const {
      maps
    } = Object(external_tribe_common_utils_globals_["google"])();
    // Try to fetch the library 0.5 seconds later
    if (!maps) {
      this.tryAgain();
      return;
    }

    // There's no valid coordinates, fallback to the image map.
    if (this.invalidLocation()) {
      const {
        address
      } = this.props;
      if (external_lodash_isEmpty_default()(address)) {
        this.setState({
          interactive: false,
          isLoading: false,
          error: Object(external_wp_i18n_["__"])('The map does not have valid coordinates nor a valid address', 'the-events-calendar')
        });
        return;
      }
      this.setState({
        interactive: false,
        isLoading: false
      });
      return;
    }
    this.setState({
      isLoading: false,
      interactive: true
    }, this.attachInteractiveMap);
  }
  getMapConfig() {
    const {
      zoom,
      mapType
    } = this.props;
    const type = external_lodash_isArray_default()(mapType) ? mapType : [mapType];
    return {
      center: this.getLocation(),
      zoom: zoom,
      mapTypeControl: type.length > 1,
      mapTypeControlOptions: {
        mapTypeIds: type
      },
      streetViewControl: false,
      fullscreenControl: false
    };
  }
  invalidLocation() {
    const location = this.getLocation();
    const {
      lat,
      lng
    } = location;
    return !lat || !lng;
  }
  getLocation() {
    const {
      coordinates
    } = this.props;
    const {
      lat,
      lng
    } = coordinates;
    return {
      lat,
      lng
    };
  }
  render() {
    const {
      isLoading,
      rendered,
      loadingMap
    } = this.state;
    const containerClass = external_tribe_modules_classnames_default()('tribe-editor__map', {
      'tribe-editor__map--loading': isLoading
    });
    let renderMap = this.renderMap();
    if (true === rendered && true !== loadingMap) {
      renderMap = this.renderMapUpdate();
    }
    return wp.element.createElement("div", {
      className: containerClass
    }, renderMap);
  }
  renderMapUpdate() {
    this.setState({
      loadingMap: true
    });
    this.loadMap();
    return this.renderMap();
  }
  renderMap() {
    const {
      isLoading,
      error,
      interactive,
      apiKey,
      rendered
    } = this.state;
    if (isLoading) {
      return wp.element.createElement(external_wp_components_["Spinner"], null);
    }
    if (error) {
      return wp.element.createElement("h4", null, error);
    }
    if (!apiKey) {
      return wp.element.createElement("h4", null, Object(external_wp_i18n_["__"])('A Google Map API KEY is required to view the map', 'the-events-calendar'));
    }
    if (rendered || interactive) {
      return this.renderInteractive();
    }
    return this.renderIframe();
  }
  renderImage() {
    return wp.element.createElement("picture", {
      className: "tribe-editor__map--static"
    }, wp.element.createElement("img", {
      className: "tribe-element-map-object",
      alt: "map",
      src: this.mapUrl
    }), wp.element.createElement("div", {
      className: "trie-editor__spinner__container"
    }, wp.element.createElement(external_wp_components_["Spinner"], null)));
  }
  renderInteractive() {
    return wp.element.createElement("section", {
      className: "tribe-editor__map--interactive"
    }, wp.element.createElement("div", {
      className: "tribe-editor__map--dynamic",
      ref: this.interactiveMapContainer
    }), wp.element.createElement("div", {
      className: "trie-editor__spinner__container"
    }, wp.element.createElement(external_wp_components_["Spinner"], null)));
  }
  renderIframe() {
    const {
      size
    } = this.props;
    let {
      width = 450,
      height = 350
    } = size;
    width = width ? `${width}px` : width;
    height = height ? `${height}px` : height;
    return wp.element.createElement("iframe", {
      title: "Venue Map",
      src: "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d65369183.36050215!2d0!3d0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1633005420084!5m2!1sen!2sus" // eslint-disable-line max-len
      ,
      width: width,
      height: height
    });
  }
  get mapUrl() {
    const {
      zoom,
      size,
      scale,
      format,
      mapType,
      apiKey,
      address
    } = this.props;
    const {
      width,
      height
    } = size;
    const queryArgs = {
      zoom: zoom,
      maptype: mapType,
      key: apiKey
    };
    let rootUrl = null;
    const {
      interactive
    } = this.state;
    const coordinates = this.getLocation();
    const {
      lat,
      lng
    } = coordinates;
    if (interactive) {
      rootUrl = this.constructor.RootEmbedUrl;
      queryArgs.q = `${lat},${lng}`;
    } else {
      rootUrl = this.constructor.RootStaticUrl;
      queryArgs.scale = scale;
      queryArgs.size = `${width}x${height}`;
      queryArgs.format = format;
      const invalid = this.invalidLocation();
      if (invalid && !external_lodash_isEmpty_default()(address)) {
        queryArgs.center = address;
      } else {
        queryArgs.center = `${lat},${lng}`;
      }
      queryArgs.markers = this.markerParams;
    }
    return `${rootUrl}?${Object(querystringify["stringify"])(queryArgs)}`;
  }
  get markerParams() {
    const {
      hasCenterMarker,
      address
    } = this.props;
    const coordinates = this.getLocation();
    const {
      lat,
      lng
    } = coordinates;
    const invalid = this.invalidLocation();
    const marker = invalid ? address : `${lat},${lng}`;
    const markerParams = `size:mid|color:0xff0000|label:|${marker}`;
    return hasCenterMarker ? markerParams : '';
  }
}
defineProperty_default()(element_GoogleMap, "RootStaticUrl", 'https://maps.googleapis.com/maps/api/staticmap');
defineProperty_default()(element_GoogleMap, "RootEmbedUrl", 'https://www.google.com/maps/embed/v1/place');
defineProperty_default()(element_GoogleMap, "ImageFormats", IMAGE_FORMATS);
defineProperty_default()(element_GoogleMap, "MapTypes", MAP_TYPES);
defineProperty_default()(element_GoogleMap, "propTypes", {
  coordinates: external_tribe_modules_propTypes_default.a.object.isRequired,
  address: external_tribe_modules_propTypes_default.a.string,
  size: external_tribe_modules_propTypes_default.a.shape({
    width: external_tribe_modules_propTypes_default.a.number.isRequired,
    height: external_tribe_modules_propTypes_default.a.number.isRequired
  }),
  style: external_tribe_modules_propTypes_default.a.object,
  /**
   * zoom (required if markers not present) defines the zoom level of the map,
   * which determines the magnification level of the map.
   *
   * @see https://developers.google.com/maps/documentation/staticmaps/intro#Zoomlevels
   */
  zoom: external_tribe_modules_propTypes_default.a.number.isRequired,
  /**
   * scale affects the number of pixels that are returned.
   * scale=2 returns twice as many pixels as scale=1 while retaining the same coverage area and level of detail
   * The default value is calculated from the screen PixelRatio.
   */
  scale: external_tribe_modules_propTypes_default.a.number,
  /**
   * @see https://developers.google.com/maps/documentation/staticmaps/intro#ImageFormats
   */
  format: external_tribe_modules_propTypes_default.a.oneOf(IMAGE_FORMATS_VALUES),
  /**
   * @see https://developers.google.com/maps/documentation/staticmaps/intro#MapTypes
   */
  mapType: external_tribe_modules_propTypes_default.a.oneOf(MAP_TYPES_VALUES),
  /**
   * Add a marker on the center
   */
  hasCenterMarker: external_tribe_modules_propTypes_default.a.bool,
  apiKey: external_tribe_modules_propTypes_default.a.string
});
defineProperty_default()(element_GoogleMap, "defaultProps", {
  format: IMAGE_FORMATS.JPG,
  mapType: MAP_TYPES.ROADMAP,
  hasCenterMarker: true,
  style: {},
  scale: 2,
  interactive: false,
  apiKey: API_KEY,
  zoom: DEFAULT_ZOOM,
  coordinates: {},
  address: {}
});
// CONCATENATED MODULE: ./src/modules/elements/google-map/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var google_map = (element_GoogleMap);
// EXTERNAL MODULE: ./src/modules/elements/dashboard/style.pcss
var dashboard_style = __webpack_require__("hT6J");

// CONCATENATED MODULE: ./src/modules/elements/dashboard/element.js
/**
 * External Dependencies
 */




/**
 * Internal dependencies
 */


/**
 * Enumeration with the available directions.
 *
 * @type {{up: string, down: string}}
 */
const directions = {
  up: 'up',
  down: 'down'
};

/**
 * Usage of this component:
 *
 * <Dashboard isOpen={true} className="custom" direction={directions.up}>
 *   <AnyComponent></AnyComponent>
 * </Dashboard
 */

const Dashboard = _ref => {
  let {
    className,
    direction,
    isOpen,
    children
  } = _ref;
  const containerClasses = external_tribe_modules_classnames_default()('tribe-editor__dashboard__container', `tribe-editor__dashboard__container--${direction}`, {
    'tribe-editor__dashboard__container--open': isOpen
  }, className);
  return wp.element.createElement("div", {
    className: containerClasses
  }, wp.element.createElement("div", {
    className: "tribe-editor__dashboard"
  }, children));
};
Dashboard.defaultProps = {
  isOpen: false,
  className: '',
  direction: directions.down,
  children: null
};
Dashboard.propTypes = {
  isOpen: external_tribe_modules_propTypes_default.a.bool,
  className: external_tribe_modules_propTypes_default.a.string,
  direction: external_tribe_modules_propTypes_default.a.oneOf(Object.keys(directions)),
  children: external_tribe_modules_propTypes_default.a.element
};
/* harmony default export */ var dashboard_element = (Dashboard);
// CONCATENATED MODULE: ./src/modules/elements/dashboard/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var dashboard = (dashboard_element);
// EXTERNAL MODULE: external "lodash.omit"
var external_lodash_omit_ = __webpack_require__("2TDg");
var external_lodash_omit_default = /*#__PURE__*/__webpack_require__.n(external_lodash_omit_);

// EXTERNAL MODULE: external "tribe.modules.reactDayPicker"
var external_tribe_modules_reactDayPicker_ = __webpack_require__("wLDe");
var external_tribe_modules_reactDayPicker_default = /*#__PURE__*/__webpack_require__.n(external_tribe_modules_reactDayPicker_);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: ./src/modules/elements/month/style.pcss
var month_style = __webpack_require__("N/iB");

// CONCATENATED MODULE: ./src/modules/elements/month/element.js



/**
 * External dependencies
 */






/**
 * Wordpress dependencies
 */


/**
 * Internal dependencies
 */


const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const yearsBack = 5;
const fromMonth = new Date(currentYear - yearsBack, currentMonth);
const toMonth = new Date(currentYear + 10, 11);
class element_Month extends external_wp_element_["Component"] {
  constructor() {
    super(...arguments);
    defineProperty_default()(this, "selectDay", day => {
      const {
        withRange
      } = this.props;
      let range = {};
      if (withRange) {
        range = external_tribe_modules_reactDayPicker_["DateUtils"].addDayToRange(day, this.state);

        // if the range was unselected we fallback to the first available day
        if (range.from === null && range.to === null) {
          range.from = today;
          range.to = undefined;
        }
        if (range.to && external_moment_default()(range.to).isSame(range.from)) {
          range.to = undefined;
        }
      } else {
        range.from = day;
        range.to = undefined;
      }
      this.setState(this.maybeUpdate(range), () => {
        this.onSelectCallback();
      });
    });
    defineProperty_default()(this, "maybeUpdate", range => state => {
      if (state.from === range.from && state.to === range.to) {
        return null;
      }
      return range;
    });
    defineProperty_default()(this, "onSelectCallback", () => {
      const {
        onSelectDay
      } = this.props;
      onSelectDay(external_lodash_omit_default()(this.state, ['withRange']));
    });
    defineProperty_default()(this, "getSelectedDays", () => {
      const {
        withRange,
        from,
        to
      } = this.props;
      if (withRange) {
        return [from, {
          from,
          to
        }];
      }
      return from;
    });
    defineProperty_default()(this, "getCaptionElement", _ref => {
      let {
        date,
        localeUtils
      } = _ref;
      const {
        month,
        setVisibleMonth
      } = this.props;
      if (date.getMonth() !== month.getMonth()) {
        return this.renderCaption(date, localeUtils);
      }
      return wp.element.createElement(year_month_form, {
        today: today,
        date: date,
        localeUtils: localeUtils,
        onChange: setVisibleMonth
      });
    });
    defineProperty_default()(this, "renderCaption", (date, localeUtils) => wp.element.createElement("div", {
      className: 'tribe-editor__daypicker-caption'
    }, wp.element.createElement("div", null, localeUtils.formatMonthTitle(date))));
    this.state = {
      toMonth: toMonth,
      from: null,
      to: null
    };
  }
  render() {
    const {
      from,
      to,
      month,
      withRange,
      setVisibleMonth
    } = this.props;
    const modifiers = withRange ? {
      start: from,
      end: to
    } : {};
    const containerClass = external_tribe_modules_classnames_default()({
      'tribe-editor__calendars--range': withRange
    });
    return wp.element.createElement(external_tribe_modules_reactDayPicker_default.a, {
      className: containerClass,
      fromMonth: fromMonth,
      toMonth: this.state.toMonth,
      month: month,
      numberOfMonths: 2,
      modifiers: modifiers,
      selectedDays: this.getSelectedDays(),
      onDayClick: this.selectDay,
      onMonthChange: setVisibleMonth,
      captionElement: this.getCaptionElement
    });
  }
}
defineProperty_default()(element_Month, "propTypes", {
  withRange: external_tribe_modules_propTypes_default.a.bool,
  onSelectDay: external_tribe_modules_propTypes_default.a.func,
  from: external_tribe_modules_propTypes_default.a.instanceOf(Date),
  to: external_tribe_modules_propTypes_default.a.instanceOf(Date),
  month: external_tribe_modules_propTypes_default.a.instanceOf(Date),
  setVisibleMonth: external_tribe_modules_propTypes_default.a.func
});
defineProperty_default()(element_Month, "defaultProps", {
  onSelectDay: external_lodash_noop_default.a,
  from: today,
  to: undefined,
  month: fromMonth,
  setVisibleMonth: external_lodash_noop_default.a
});
// CONCATENATED MODULE: ./src/modules/elements/month/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var elements_month = (element_Month);
// EXTERNAL MODULE: ./src/modules/elements/search-or-create/style.pcss
var search_or_create_style = __webpack_require__("V4E3");

// CONCATENATED MODULE: ./src/modules/elements/search-or-create/template.js



/**
 * External dependencies
 */





/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

class template_SearchOrCreate extends external_wp_element_["Component"] {
  constructor(props) {
    super(props);
    defineProperty_default()(this, "renderItem", item => {
      const {
        title = {},
        id
      } = item;
      const {
        rendered = ''
      } = title;

      /**
       * @todo: Set onClick to a button, not li.
       */
      return wp.element.createElement("li", {
        // eslint-disable-line
        key: id,
        onClick: this.props.onItemClick(item)
      }, Object(he["decode"])(rendered));
    });
    defineProperty_default()(this, "renderResults", () => {
      const {
        isSelected,
        term,
        isLoading,
        posts,
        onCreateClick
      } = this.props;
      if (!isSelected || external_lodash_isEmpty_default()(term)) {
        return null;
      }
      if (isLoading) {
        return wp.element.createElement("div", {
          className: "tribe-editor__soc__results--loading"
        }, wp.element.createElement(external_wp_components_["Spinner"], null));
      }

      /**
       * @todo: Set onClick to a button, not li.
       */
      return wp.element.createElement("ul", {
        className: "tribe-editor__soc__results"
      }, wp.element.createElement("li", {
        // eslint-disable-line
        onClick: onCreateClick
      }, wp.element.createElement("strong", null, "Create"), ": ", this.props.term), posts.map(this.renderItem));
    });
    this.inputRef = /*#__PURE__*/external_React_default.a.createRef();
  }
  componentDidMount() {
    const {
      addBlock,
      setSearchPostType,
      name,
      postType,
      setFocus
    } = this.props;
    addBlock(name);
    setSearchPostType(name, postType);
    setFocus(this.inputRef);
  }
  componentDidUpdate() {
    this.props.setFocus(this.inputRef);
  }
  componentWillUnmount() {
    const {
      clearBlock,
      name
    } = this.props;
    clearBlock(name);
  }
  render() {
    const {
      isSelected,
      icon,
      term,
      placeholder,
      onInputChange
    } = this.props;
    const containerClass = external_tribe_modules_classnames_default()('tribe-editor__soc__input__container', {
      'tribe-editor__soc__input__container--active': isSelected
    });
    const currentTerm = isSelected ? term : '';
    return wp.element.createElement("section", {
      className: "tribe-soc__container"
    }, wp.element.createElement("div", {
      className: containerClass
    }, icon, wp.element.createElement("input", {
      className: "tribe-editor__soc__input",
      ref: this.inputRef,
      value: currentTerm,
      placeholder: placeholder,
      onChange: onInputChange
    })), this.renderResults());
  }
}
defineProperty_default()(template_SearchOrCreate, "defaultProps", {
  isSelected: false,
  term: '',
  placeholder: Object(external_wp_i18n_["__"])('Add or Find', 'the-events-calendar'),
  name: '',
  icon: null,
  posts: [],
  isLoading: false,
  clearBlock: external_lodash_noop_default.a,
  setFocus: external_lodash_noop_default.a,
  onInputChange: external_lodash_noop_default.a,
  onCreateClick: external_lodash_noop_default.a,
  onItemClick: external_lodash_noop_default.a
});
defineProperty_default()(template_SearchOrCreate, "propTypes", {
  isSelected: external_tribe_modules_propTypes_["PropTypes"].bool,
  term: external_tribe_modules_propTypes_["PropTypes"].string,
  placeholder: external_tribe_modules_propTypes_["PropTypes"].string,
  name: external_tribe_modules_propTypes_["PropTypes"].string,
  icon: external_tribe_modules_propTypes_["PropTypes"].object,
  posts: external_tribe_modules_propTypes_["PropTypes"].array,
  isLoading: external_tribe_modules_propTypes_["PropTypes"].bool,
  clearBlock: external_tribe_modules_propTypes_["PropTypes"].func,
  setFocus: external_tribe_modules_propTypes_["PropTypes"].func,
  onInputChange: external_tribe_modules_propTypes_["PropTypes"].func,
  onCreateClick: external_tribe_modules_propTypes_["PropTypes"].func,
  onItemClick: external_tribe_modules_propTypes_["PropTypes"].func
});
/* harmony default export */ var search_or_create_template = (template_SearchOrCreate);
// CONCATENATED MODULE: ./src/modules/elements/search-or-create/element.js

function search_or_create_element_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function search_or_create_element_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? search_or_create_element_ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : search_or_create_element_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * External dependencies
 */




/**
 * Internal dependencies
 */


/**
 * Module Code
 */

const setFocus = isSelected => inputRef => {
  if (isSelected && inputRef.current && document.activeElement !== inputRef.current) {
    inputRef.current.focus();
  }
};
const search_or_create_element_onInputChange = (dispatchProps, ownProps) => event => {
  const {
    setTerm,
    search
  } = dispatchProps;
  const {
    name,
    exclude
  } = ownProps;
  const {
    value
  } = event.target;
  setTerm(name, value);
  search(name, {
    term: value,
    exclude,
    perPage: 5
  });
};
const element_onCreateClick = (term, onCreateNew) => () => onCreateNew(term);
const search_or_create_element_onItemClick = (dispatchProps, ownProps) => item => () => {
  const {
    clearBlock
  } = dispatchProps;
  const {
    name,
    onItemSelect
  } = ownProps;
  onItemSelect(item.id, item);
  clearBlock(name);
};
const element_mapStateToProps = (state, props) => ({
  term: search["c" /* selectors */].getSearchTerm(state, props),
  isLoading: search["c" /* selectors */].getIsLoading(state, props),
  posts: search["c" /* selectors */].getResults(state, props)
});
const element_mapDispatchToProps = dispatch => search_or_create_element_objectSpread(search_or_create_element_objectSpread({}, Object(external_tribe_modules_redux_["bindActionCreators"])(search["a" /* actions */], dispatch)), Object(external_tribe_modules_redux_["bindActionCreators"])(search["d" /* thunks */], dispatch));
const element_mergeProps = (stateProps, dispatchProps, ownProps) => search_or_create_element_objectSpread(search_or_create_element_objectSpread(search_or_create_element_objectSpread(search_or_create_element_objectSpread({}, ownProps), stateProps), dispatchProps), {}, {
  setFocus: setFocus(ownProps.isSelected),
  onInputChange: search_or_create_element_onInputChange(dispatchProps, ownProps),
  onCreateClick: element_onCreateClick(stateProps.term, ownProps.onCreateNew),
  onItemClick: search_or_create_element_onItemClick(dispatchProps, ownProps)
});
/* harmony default export */ var search_or_create_element = (Object(external_tribe_modules_reactRedux_["connect"])(element_mapStateToProps, element_mapDispatchToProps, element_mergeProps)(search_or_create_template));
// CONCATENATED MODULE: ./src/modules/elements/search-or-create/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var search_or_create = (search_or_create_element);
// EXTERNAL MODULE: ./src/modules/elements/loading/style.pcss
var loading_style = __webpack_require__("8czI");

// CONCATENATED MODULE: ./src/modules/elements/loading/index.js
/**
 * External dependencies
 */



/**
 * Wordpress dependencies
 */


/* harmony default export */ var loading = (_ref => {
  let {
    className
  } = _ref;
  return wp.element.createElement("span", {
    className: external_tribe_modules_classnames_default()(['tribe-editor__spinner-container', className])
  }, wp.element.createElement(external_wp_components_["Spinner"], null));
});
// EXTERNAL MODULE: ./src/modules/elements/year-month-form/style.pcss
var year_month_form_style = __webpack_require__("8w14");

// CONCATENATED MODULE: ./src/modules/elements/year-month-form/element.js
/**
 * External dependencies
 */


/**
 * Internal dependencies
 */

const YearMonthForm = _ref => {
  let {
    today,
    date,
    localeUtils,
    onChange
  } = _ref;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const toMonth = new Date(currentYear + 10, 11);
  const months = localeUtils.getMonths();
  const years = [];
  const yearsBack = 5;
  for (let i = currentYear - yearsBack; i <= toMonth.getFullYear(); i++) {
    years.push(i);
  }
  const handleChange = e => {
    const {
      year,
      month
    } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  /**
   * @todo: figure out what to do about onChange event (accessibility).
   */
  return wp.element.createElement("form", {
    className: "tribe-editor__year-month-form"
  }, wp.element.createElement("select", {
    // eslint-disable-line
    className: "tribe-editor__year-month-form__month",
    name: "month",
    onChange: handleChange,
    value: date.getMonth()
  }, months.map((month, monthNum) => {
    if (date.getFullYear() === currentYear - yearsBack && monthNum < currentMonth) {
      return wp.element.createElement("option", {
        key: month,
        value: monthNum,
        disabled: true
      }, month);
    }
    return wp.element.createElement("option", {
      key: month,
      value: monthNum
    }, month);
  })), wp.element.createElement("select", {
    // eslint-disable-line
    className: "tribe-editor__year-month-form__year",
    name: "year",
    onChange: handleChange,
    value: date.getFullYear()
  }, years.map(year => {
    if (date.getMonth() < currentMonth && year === currentYear - yearsBack) {
      return wp.element.createElement("option", {
        key: year,
        value: year,
        disabled: true
      }, year);
    }
    return wp.element.createElement("option", {
      key: year,
      value: year
    }, year);
  })));
};
/* harmony default export */ var year_month_form_element = (YearMonthForm);
// CONCATENATED MODULE: ./src/modules/elements/year-month-form/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var year_month_form = (year_month_form_element);
// EXTERNAL MODULE: ./src/modules/elements/upsell/style.pcss
var upsell_style = __webpack_require__("oJLs");

// CONCATENATED MODULE: ./src/modules/elements/upsell/element.js
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


/**
 * Module Code
 */

const Upsell = () => wp.element.createElement("div", {
  className: "tribe-editor__subtitle__footer-upsell"
}, wp.element.createElement("p", {
  className: "tribe-editor__subtitle__footer-upsell-text"
}, Object(external_wp_i18n_["__"])('Turbocharge your events with our premium calendar and ticketing add-ons. ', 'the-events-calendar'), wp.element.createElement("a", {
  href: "http://evnt.is/1a8q",
  className: "tribe-editor__subtitle__footer-upsell-link",
  target: "_blank",
  rel: "noopener noreferrer"
}, Object(external_wp_i18n_["_x"])('Check \'em out!', 'linked text for plugin add-ons', 'the-events-calendar'))));
/* harmony default export */ var upsell_element = (Upsell);
// CONCATENATED MODULE: ./src/modules/elements/upsell/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var upsell = (upsell_element);
// EXTERNAL MODULE: external "tribe.modules.reactInputAutosize"
var external_tribe_modules_reactInputAutosize_ = __webpack_require__("AuWn");
var external_tribe_modules_reactInputAutosize_default = /*#__PURE__*/__webpack_require__.n(external_tribe_modules_reactInputAutosize_);

// EXTERNAL MODULE: external "tribe.common.utils"
var external_tribe_common_utils_ = __webpack_require__("B8vQ");

// EXTERNAL MODULE: ./src/modules/elements/timezone/style.pcss
var timezone_style = __webpack_require__("kXZL");

// CONCATENATED MODULE: ./src/modules/elements/timezone/element.js

/**
 * External dependencies
 */



/**
 * Internal dependencies
 */


const Timezone = _ref => {
  let {
    value,
    placeholder,
    className,
    onChange
  } = _ref;
  return wp.element.createElement(external_tribe_modules_reactInputAutosize_default.a, {
    className: className,
    value: value,
    placeholder: placeholder,
    onChange: external_tribe_common_utils_["input"].sendValue(onChange)
  });
};
Timezone.propTypes = {
  value: external_tribe_modules_propTypes_default.a.string,
  placeholder: external_tribe_modules_propTypes_default.a.string,
  onChange: external_tribe_modules_propTypes_default.a.func,
  className: external_tribe_modules_propTypes_default.a.oneOfType([external_tribe_modules_propTypes_default.a.string, external_tribe_modules_propTypes_default.a.arrayOf(external_tribe_modules_propTypes_default.a.string)])
};
Timezone.defaultProps = {
  value: '',
  placeholder: '',
  onChange: external_lodash_noop_default.a,
  className: 'tribe-editor__timezone-input'
};
/* harmony default export */ var timezone_element = (Timezone);
// CONCATENATED MODULE: ./src/modules/elements/timezone/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var timezone = (timezone_element);
// EXTERNAL MODULE: ./src/modules/elements/edit-link/style.pcss
var edit_link_style = __webpack_require__("tOtL");

// CONCATENATED MODULE: ./src/modules/elements/edit-link/element.js


/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


const EditLink = _ref => {
  let {
    postId,
    label,
    target
  } = _ref;
  const admin = external_lodash_get_default()(external_tribe_common_utils_["globals"].common(), 'adminUrl', '');
  if (!admin || !postId) {
    return null;
  }
  const extraProps = {
    rel: '_blank' === target ? 'noreferrer noopener' : undefined
  };
  return wp.element.createElement("a", extends_default()({
    className: "tribe-editor__edit-link",
    href: `${admin}post.php?post=${postId}&action=edit`,
    target: target
  }, extraProps), label);
};
EditLink.propTypes = {
  postId: external_tribe_modules_propTypes_default.a.number,
  label: external_tribe_modules_propTypes_default.a.string,
  target: external_tribe_modules_propTypes_default.a.string
};
EditLink.defaultProps = {
  postId: 0,
  label: Object(external_wp_i18n_["__"])('Edit', 'the-events-calendar'),
  target: '_blank'
};
/* harmony default export */ var edit_link_element = (EditLink);
// CONCATENATED MODULE: ./src/modules/elements/edit-link/index.js
/**
 * Internal dependencies
 */

/* harmony default export */ var edit_link = (edit_link_element);
// CONCATENATED MODULE: ./src/modules/elements/index.js
















/***/ }),

/***/ "kXZL":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "kczL":
/***/ (function(module, exports) {

module.exports = tribe.common.utils.globals;

/***/ }),

/***/ "l3Sj":
/***/ (function(module, exports) {

module.exports = wp.i18n;

/***/ }),

/***/ "lCf4":
/***/ (function(module, exports) {

module.exports = lodash.get;

/***/ }),

/***/ "mXU7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "oJLs":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "oX0b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "peom":
/***/ (function(module, exports) {

module.exports = lodash.isUndefined;

/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = tribe.modules.redux;

/***/ }),

/***/ "rf6O":
/***/ (function(module, exports) {

module.exports = tribe.modules.propTypes;

/***/ }),

/***/ "tI+e":
/***/ (function(module, exports) {

module.exports = wp.components;

/***/ }),

/***/ "tOtL":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "vJBw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "wp.i18n"
var external_wp_i18n_ = __webpack_require__("l3Sj");

// EXTERNAL MODULE: external "lodash.isEmpty"
var external_lodash_isEmpty_ = __webpack_require__("4Qn9");
var external_lodash_isEmpty_default = /*#__PURE__*/__webpack_require__.n(external_lodash_isEmpty_);

// EXTERNAL MODULE: external "lodash.trim"
var external_lodash_trim_ = __webpack_require__("XNrZ");
var external_lodash_trim_default = /*#__PURE__*/__webpack_require__.n(external_lodash_trim_);

// EXTERNAL MODULE: external "tribe.modules.reactRedux"
var external_tribe_modules_reactRedux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "tribe.modules.redux"
var external_tribe_modules_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "tribe.common.utils"
var external_tribe_common_utils_ = __webpack_require__("B8vQ");

// EXTERNAL MODULE: external "tribe.common.hoc"
var external_tribe_common_hoc_ = __webpack_require__("Q9xL");

// EXTERNAL MODULE: ./src/modules/data/blocks/price/index.js + 5 modules
var price = __webpack_require__("RqUN");

// EXTERNAL MODULE: external "tribe.modules.propTypes"
var external_tribe_modules_propTypes_ = __webpack_require__("rf6O");
var external_tribe_modules_propTypes_default = /*#__PURE__*/__webpack_require__.n(external_tribe_modules_propTypes_);

// EXTERNAL MODULE: external "tribe.modules.classnames"
var external_tribe_modules_classnames_ = __webpack_require__("K2gz");
var external_tribe_modules_classnames_default = /*#__PURE__*/__webpack_require__.n(external_tribe_modules_classnames_);

// EXTERNAL MODULE: external "wp.components"
var external_wp_components_ = __webpack_require__("tI+e");

// EXTERNAL MODULE: ./src/modules/elements/index.js + 31 modules
var modules_elements = __webpack_require__("jHzm");

// EXTERNAL MODULE: ./src/Events/Blocks/Price/app/editor/style.pcss
var style = __webpack_require__("oX0b");

// EXTERNAL MODULE: external "tribe.common.utils.globals"
var external_tribe_common_utils_globals_ = __webpack_require__("kczL");

// CONCATENATED MODULE: ./src/Events/Blocks/Price/app/editor/template.js
/**
 * External dependencies
 */




/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */




const {
  InspectorControls
} = external_tribe_common_utils_globals_["wpEditor"];

/**
 * Module Code
 */

const renderCurrency = _ref => {
  let {
    showCurrencySymbol,
    currencySymbol
  } = _ref;
  return showCurrencySymbol && wp.element.createElement("span", {
    className: "tribe-editor__event-price__currency"
  }, currencySymbol);
};
const renderPlaceholder = _ref2 => {
  let {
    showCost,
    currencySymbol,
    currencyPosition
  } = _ref2;
  let placeholder = Object(external_wp_i18n_["__"])('Add Price', 'the-events-calendar');
  placeholder = 'prefix' === currencyPosition ? currencySymbol + ' ' + placeholder : placeholder + ' ' + currencySymbol;
  return !showCost && wp.element.createElement("span", {
    className: "tribe-editor__event-price__label"
  }, placeholder);
};
const renderCost = _ref3 => {
  let {
    showCost,
    isFree,
    cost
  } = _ref3;
  const parsed = external_tribe_common_utils_["range"].parser(cost);
  let value = parsed;
  if (isFree) {
    value = Object(external_wp_i18n_["__"])('Free', 'the-events-calendar');
  }
  return showCost && wp.element.createElement("span", {
    className: "tribe-editor__event-price__cost"
  }, value);
};
const renderDescription = _ref4 => {
  let {
    showCostDescription,
    attributes
  } = _ref4;
  return showCostDescription && wp.element.createElement("span", {
    className: "tribe-editor__event-price__description"
  }, attributes.costDescription);
};
const renderLabel = props => {
  const {
    currencyPosition,
    open
  } = props;
  const containerClass = external_tribe_modules_classnames_default()('tribe-editor__event-price__price', `tribe-editor__event-price__price--${currencyPosition}`);

  /**
   * @todo: Change div to button.
   */
  return wp.element.createElement("div", {
    // eslint-disable-line
    className: containerClass,
    onClick: open
  }, renderCurrency(props), renderPlaceholder(props), renderCost(props), renderDescription(props));
};
const renderDashboard = _ref5 => {
  let {
    isOpen,
    cost,
    setCost,
    attributes,
    setAttributes
  } = _ref5;
  const setDescription = event => setAttributes({
    costDescription: event.target.value
  });
  return wp.element.createElement(modules_elements["Dashboard"], {
    isOpen: isOpen
  }, wp.element.createElement(external_React_["Fragment"], null, wp.element.createElement("section", {
    className: "tribe-editor__event-price__dashboard"
  }, wp.element.createElement("input", {
    className: external_tribe_modules_classnames_default()('tribe-editor__event-price__input', 'tribe-editor__event-price__input--price'),
    name: "description",
    type: "text",
    placeholder: Object(external_wp_i18n_["__"])('Fixed Price or Range', 'the-events-calendar'),
    onChange: setCost,
    value: cost
  }), wp.element.createElement("input", {
    className: external_tribe_modules_classnames_default()('tribe-editor__event-price__input', 'tribe-editor__event-price__input--description'),
    name: "description",
    type: "text",
    placeholder: Object(external_wp_i18n_["__"])('Description', 'the-events-calendar'),
    onChange: setDescription,
    value: attributes.costDescription
  })), wp.element.createElement("footer", {
    className: "tribe-editor__event-price__dashboard__footer"
  }, Object(external_wp_i18n_["__"])('Enter 0 as price for free events', 'the-events-calendar'))));
};
const renderUI = props => wp.element.createElement("section", {
  key: "event-price-box",
  className: "tribe-editor__block"
}, wp.element.createElement("div", {
  className: "tribe-editor__event-price"
}, renderLabel(props), renderDashboard(props)));
const renderControls = _ref6 => {
  let {
    isSelected,
    currencySymbol,
    currencyCode,
    currencyPosition,
    setCurrencyPosition,
    setCode,
    setSymbol
  } = _ref6;
  return isSelected && wp.element.createElement(InspectorControls, {
    key: "inspector"
  }, wp.element.createElement(external_wp_components_["PanelBody"], {
    title: Object(external_wp_i18n_["__"])('Price Settings', 'the-events-calendar')
  }, wp.element.createElement(external_wp_components_["TextControl"], {
    className: "tribe-editor__event-price__currency-symbol-setting",
    label: Object(external_wp_i18n_["__"])(' Currency Symbol', 'the-events-calendar'),
    value: currencySymbol,
    placeholder: Object(external_wp_i18n_["__"])('E.g.: $', 'the-events-calendar'),
    onChange: setSymbol
  }), wp.element.createElement(external_wp_components_["TextControl"], {
    className: "tribe-editor__event-price__currency-code-setting",
    label: Object(external_wp_i18n_["__"])(' Currency Code', 'the-events-calendar'),
    value: currencyCode,
    placeholder: Object(external_wp_i18n_["__"])('E.g.: USD', 'the-events-calendar'),
    onChange: setCode
  }), wp.element.createElement(external_wp_components_["CheckboxControl"], {
    label: Object(external_wp_i18n_["__"])('Currency symbol follows price', 'the-events-calendar'),
    checked: 'suffix' === currencyPosition,
    onChange: setCurrencyPosition
  })));
};
const EventPrice = props => [renderUI(props), renderControls(props)];
EventPrice.propTypes = {
  isOpen: external_tribe_modules_propTypes_default.a.bool,
  cost: external_tribe_modules_propTypes_default.a.string,
  currencyPosition: external_tribe_modules_propTypes_default.a.oneOf(['prefix', 'suffix', '']),
  currencySymbol: external_tribe_modules_propTypes_default.a.string,
  currencyCode: external_tribe_modules_propTypes_default.a.string,
  showCurrencySymbol: external_tribe_modules_propTypes_default.a.bool,
  showCost: external_tribe_modules_propTypes_default.a.bool,
  showCostDescription: external_tribe_modules_propTypes_default.a.bool,
  isFree: external_tribe_modules_propTypes_default.a.bool,
  setCost: external_tribe_modules_propTypes_default.a.func,
  setSymbol: external_tribe_modules_propTypes_default.a.func,
  setCode: external_tribe_modules_propTypes_default.a.func,
  setCurrencyPosition: external_tribe_modules_propTypes_default.a.func,
  onKeyDown: external_tribe_modules_propTypes_default.a.func,
  onClick: external_tribe_modules_propTypes_default.a.func,
  open: external_tribe_modules_propTypes_default.a.func,
  attributes: external_tribe_modules_propTypes_default.a.object,
  setAttributes: external_tribe_modules_propTypes_default.a.func
};
/* harmony default export */ var template = (EventPrice);
// CONCATENATED MODULE: ./src/Events/Blocks/Price/app/editor/container.js





/**
 * Internal dependencies
 */





/**
 * Module Code
 */

const showCurrencySymbol = cost => {
  const parsed = external_tribe_common_utils_["range"].parser(cost);
  return !external_lodash_isEmpty_default()(external_lodash_trim_default()(parsed)) && !external_tribe_common_utils_["range"].isFree(cost);
};
const container_showCost = cost => {
  const parsed = external_tribe_common_utils_["range"].parser(cost);
  return !external_lodash_isEmpty_default()(external_lodash_trim_default()(parsed)) || external_tribe_common_utils_["range"].isFree(cost);
};
const mapStateToProps = (state, ownProps) => ({
  cost: price["d" /* selectors */].getPrice(state),
  currencyPosition: price["d" /* selectors */].getPosition(state),
  currencySymbol: price["d" /* selectors */].getSymbol(state),
  currencyCode: price["d" /* selectors */].getCode(state),
  showCurrencySymbol: showCurrencySymbol(price["d" /* selectors */].getPrice(state)),
  showCost: container_showCost(price["d" /* selectors */].getPrice(state)),
  showCostDescription: !external_lodash_isEmpty_default()(external_lodash_trim_default()(ownProps.attributes.costDescription)),
  isFree: external_tribe_common_utils_["range"].isFree(price["d" /* selectors */].getPrice(state))
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setCost: event => {
    ownProps.setAttributes({
      cost: event.target.value
    });
    dispatch(price["a" /* actions */].setCost(event.target.value));
  },
  setSymbol: symbol => {
    ownProps.setAttributes({
      currencySymbol: symbol
    });
    dispatch(price["a" /* actions */].setSymbol(symbol));
  },
  setCode: code => {
    ownProps.setAttributes({
      currencyCode: code
    });
    dispatch(price["a" /* actions */].setCode(code));
  },
  setCurrencyPosition: value => {
    const position = price["e" /* utils */].getPosition(!value);
    ownProps.setAttributes({
      currencyPosition: position
    });
    dispatch(price["a" /* actions */].setPosition(position));
  }
});
/* harmony default export */ var container = (Object(external_tribe_modules_redux_["compose"])(Object(external_tribe_common_hoc_["withStore"])(), Object(external_tribe_modules_reactRedux_["connect"])(mapStateToProps, mapDispatchToProps), external_tribe_common_hoc_["withBlockCloser"])(template));
// EXTERNAL MODULE: ./src/modules/icons/index.js + 15 modules
var icons = __webpack_require__("NxMS");

// CONCATENATED MODULE: ./src/Events/Blocks/Price/app/editor/index.js
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



/**
 * Module Code
 */
/* harmony default export */ var editor = __webpack_exports__["default"] = ({
  id: 'event-price',
  title: Object(external_wp_i18n_["__"])('Event Price', 'the-events-calendar'),
  description: Object(external_wp_i18n_["__"])('Let visitors know the cost of this event or if it’s free to attend.', 'the-events-calendar'),
  icon: wp.element.createElement(icons["Price"], null),
  category: 'tribe-events',
  keywords: ['event', 'events-gutenberg', 'tribe'],
  supports: {
    html: false
  },
  attributes: {
    cost: {
      type: 'string',
      source: 'meta',
      meta: '_EventCost'
    },
    costDescription: {
      type: 'html',
      default: ''
    },
    currencySymbol: {
      type: 'string',
      source: 'meta',
      meta: '_EventCurrencySymbol'
    },
    currencyCode: {
      type: 'string',
      source: 'meta',
      meta: '_EventCurrencyCode'
    },
    currencyPosition: {
      type: 'string',
      source: 'meta',
      meta: '_EventCurrencyPosition'
    }
  },
  edit: container,
  save() {
    return null;
  }
});

/***/ }),

/***/ "wLDe":
/***/ (function(module, exports) {

module.exports = tribe.modules.reactDayPicker;

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = moment;

/***/ })

/******/ });