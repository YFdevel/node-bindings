"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const group_by_1 = require("./group-by");
const index_js_1 = __importDefault(require("./addons/native_napi/index.js"));
const group_by_js_1 = __importDefault(require("./addons/webassembly-embind/group_by.js"));
const group_by_js_2 = __importDefault(require("./addons/webassembly-webidl/group_by.js"));
function generateData(amount) {
    return Array.from({ length: amount }, (v, i) => {
        return {
            id: i,
            group: String.fromCharCode(Math.floor(Math.random() * 25) + 65),
            string: Math.random().toString(36).substring(2),
            number: Math.random() * 100,
            number2: Math.random() * 1000,
            null: null,
            undefined: undefined,
            boolean: true
        };
    });
}
const data = generateData(1000);
let grouped = null;
/**
 * JavaScript
 */
console.log('\n# JavaScript');
console.time('Duration');
grouped = (0, group_by_1.groupBy)(data, 'group', ['number', 'number2']);
console.timeEnd('Duration');
/**
 * N-API
 */
console.log('\n# Native addon with N-API');
console.time('Duration');
grouped = index_js_1.default.groupBy(data, 'group', ['number', 'number2']);
console.timeEnd('Duration');
/**
 * WebAssembly Embind
 */
group_by_js_1.default['onRuntimeInitialized'] = function (a) {
    console.log('\n# WebAssembly with Embind binding');
    console.time('Duration');
    grouped = group_by_js_1.default.groupBy(data, 'group', ['number', 'number2']);
    console.timeEnd('Duration');
};
/**
 * WebAssembly WebIdl (WIP)
 */
group_by_js_2.default['onRuntimeInitialized'] = function (a = null) {
    console.log('\n# WebAssembly with WebIDL binding');
    const CollectionUtils = new group_by_js_2.default.CollectionUtils();
    console.time('Duration');
    const res = CollectionUtils.group_by('Fake result. Work in progress', 42);
    console.timeEnd('Duration');
};
