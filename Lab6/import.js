//===================Bài 1=================================
import {uppercaseString,lowercaseString} from './script.js';
const myString = 'Lâm Chí Thoại';

const uppercased = uppercaseString(myString);
const lowercased = lowercaseString(myString);

console.log(uppercased);
console.log(lowercased);
// ========================Bài 2==========================
import * as stringFunctions from './script.js';
console.log(stringFunctions.uppercaseString("hello"));
console.log(stringFunctions.lowercaseString("WORLD!"));
// ==========================Bài 4=======================
import { subtract } from './sum_function.js';
console.log(subtract(7,4));

