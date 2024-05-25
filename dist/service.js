"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndStoreOrders = exports.isOrderValid = void 0;
const usermodel_1 = __importDefault(require("./usermodel"));
function isOrderValid(order) {
    return order.OrderBlocks.some(block => block.LineNo % 3 === 0);
}
exports.isOrderValid = isOrderValid;
function fetchAndStoreOrders(orders) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const order of orders) {
                if (isOrderValid(order)) {
                    console.log(`Storing orderID: ${order.orderID}`);
                    yield usermodel_1.default.create({ orderID: order.orderID });
                }
            }
        }
        catch (error) {
            console.error('Error storing orders:', error);
        }
    });
}
exports.fetchAndStoreOrders = fetchAndStoreOrders;
//# sourceMappingURL=service.js.map