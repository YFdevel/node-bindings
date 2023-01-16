"use strict";
/**
 * Group items by field
 *
 * const items = [
 *  {id: 1, name: 'A', val: 1, smth: true},
 *  {id: 2, name: 'B', val: 2, ...},
 *  {id: 3, name: 'A', val: 3, ...},
 *  {id: 4, name: 'B', val: 4, ...},
 *  {id: 5, name: 'A', val: 5, ...}
 * ]
 *
 * groupBy(items, 'name', ['val', ...]);
 * // Result
 * [
 *   {
 *     groupField: 'name',
 *     groupValue: 'A',
 *
 *     // Items of the group
 *     items: [{id: 1, name: 'A', val: 1, , smth: true}, {id: 3, name: 'A', val: 3}, {id: 5, name: 'A', val: 5}],
 *
 *     // Values of first item
 *     id: 1,
 *     smth: true,
 *     ...
 *
 *     // Summed values
 *     val: 9,
 *     ...
 *   }, {
 *     groupField: 'name',
 *     groupValue: 'B',
 *     items: [{id: 2, name: 'B', val: 2}, {id: 4, name: 'B', val: 4}],
 *     id: 2,
 *     val: 6,
 *     ...
 *   }
 * ]
 *
 * @param items - Array<any> - items array
 * @param field - string - field name
 * @param sumFields - Array<string> - array with names of fields which should be summed
 * @returns Array<any>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
function groupBy(items, field, sumFields = []) {
    const groupsMap = {};
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const groupValue = item[field];
        let group = groupsMap[groupValue];
        if (!group) {
            group = Object.assign({ items: [], groupField: field, groupValue: groupValue }, item);
            groupsMap[groupValue] = group;
        }
        for (let j = 0; j < sumFields.length; j++) {
            const fieldName = sumFields[j];
            const sumValue = item[fieldName];
            if (sumValue) {
                group[fieldName] += sumValue;
            }
        }
        group.items.push(item);
    }
    return Object.keys(groupsMap).map(key => groupsMap[key]);
}
exports.groupBy = groupBy;
