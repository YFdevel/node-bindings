import {groupBy} from "./group-by";
import NativeNapi from "./addons/native_napi/index.js";
import EmbindModule from './addons/webassembly-embind/group_by.js';
import WebidlModule from './addons/webassembly-webidl/group_by.js';

export interface ProjectData{
    id: number,
    group: string,
    string: string,
    number: number,
    number2: number,
    null: null,
    undefined: undefined,
    boolean: boolean
}


function generateData(amount:number):ProjectData[] {
    return Array.from({length: amount}, (v:never, i:number) => {
        return {
            id: i,
            group: String.fromCharCode(Math.floor(Math.random() * 25) + 65),
            string: Math.random().toString(36).substring(2),
            number: Math.random() * 100,
            number2: Math.random() * 1000,
            null: null,
            undefined: undefined,
            boolean: true
        }
    })
}

const data:ProjectData[] = generateData(1000);

let grouped:any=null;

/**
 * JavaScript
 */
console.log('\n# JavaScript');
console.time('Duration');
grouped = groupBy(data, 'group', ['number', 'number2']);
console.timeEnd('Duration');

/**
 * N-API
 */
console.log('\n# Native addon with N-API');
console.time('Duration');
grouped = NativeNapi.groupBy(data, 'group', ['number', 'number2']);
console.timeEnd('Duration');

/**
 * WebAssembly Embind
 */

EmbindModule['onRuntimeInitialized'] = function(a:any) {
    console.log('\n# WebAssembly with Embind binding');
    console.time('Duration');
    grouped = EmbindModule.groupBy(data, 'group', ['number', 'number2']);
    console.timeEnd('Duration');
};

/**
 * WebAssembly WebIdl (WIP)
 */

WebidlModule['onRuntimeInitialized'] = function(a:any=null) {
    console.log('\n# WebAssembly with WebIDL binding');
    const CollectionUtils = new WebidlModule.CollectionUtils();
    console.time('Duration');
    CollectionUtils.group_by('Fake result. Work in progress', 42);
    console.timeEnd('Duration');
};


