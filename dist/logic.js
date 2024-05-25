"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatehandshake = exports.isLeapYear = exports.concatenateStrings = exports.splitString = void 0;
//a.
function splitString(inputString) {
    return inputString.split('_').join(' ');
}
exports.splitString = splitString;
//b.
function concatenateStrings(par1, par2) {
    return par1 + par2;
}
exports.concatenateStrings = concatenateStrings;
//c.
function isLeapYear(year) {
    if (year % 4 !== 0)
        return false;
    if (year % 100 === 0 && year % 400 !== 0)
        return false;
    return true;
}
exports.isLeapYear = isLeapYear;
//d.
function generatehandshake(num) {
    const handshake = [];
    if (num & 1)
        handshake.push('wink');
    if (num & 2)
        handshake.push('double blink');
    if (num & 4)
        handshake.push('close your eyes');
    if (num & 8)
        handshake.push('jump');
    if (num & 16)
        handshake.reverse();
    return handshake;
}
exports.generatehandshake = generatehandshake;
//# sourceMappingURL=logic.js.map