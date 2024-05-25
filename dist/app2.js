"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/array-operations', (req, res) => {
    const array = req.body.array;
    if (!Array.isArray(array)) {
        return res.status(400).send("invalid input");
    }
    const newArray1 = array.concat([6, 7, 8]);
    console.log("concat:", newArray1);
    const index = array.lastIndexOf(3);
    console.log("lastIndexOf:", index);
    array.push(6);
    console.log("push:", array);
    const splicedArray = array.splice(1, 2);
    console.log("splice:", splicedArray);
    const poppedItem = array.pop();
    console.log("pop:", poppedItem);
    const slicedArray = array.slice(1, 3);
    console.log("slice:", slicedArray);
    const mappedArray = array.map((item) => item * 2);
    console.log("map:", mappedArray);
    const shiftedItem = array.shift();
    console.log("shift:", shiftedItem);
    const filteredArray = array.filter((item) => item > 2);
    console.log("filter:", filteredArray);
    array.unshift(0);
    console.log("unshift:", array);
    array.forEach((item) => console.log("foreach:", item));
    const foundItem = array.find((item) => item === 3);
    console.log("find:", foundItem);
    const joinedString = array.join("-");
    console.log("join:", joinedString);
    const foundIndex = array.findIndex((item) => item === 4);
    console.log("findindex:", foundIndex);
    const stringRepresentation = array.toString();
    console.log("tostring:", stringRepresentation);
    const someResult = array.some((item) => item > 3);
    console.log("some:", someResult);
    const stringToSplit = "Hello World";
    const splitArray = stringToSplit.split(" ");
    console.log("split:", splitArray);
    const everyResult = array.every((item) => item > 0);
    console.log("every:", everyResult);
    const replacedString = stringToSplit.replace("World", "Universe");
    console.log("replace:", replacedString);
    const includesResult = array.includes(3);
    console.log("includes:", includesResult);
    const indexOfItem = array.indexOf(2);
    console.log("indexOf:", indexOfItem);
    res.send({
        newArray1,
        index,
        updatedArray: array,
        splicedArray,
        poppedItem,
        slicedArray,
        mappedArray,
        shiftedItem,
        filteredArray,
        foundItem,
        joinedString,
        foundIndex,
        stringRepresentation,
        someResult,
        splitArray,
        everyResult,
        replacedString,
        includesResult,
        indexOfItem
    });
});
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=app2.js.map