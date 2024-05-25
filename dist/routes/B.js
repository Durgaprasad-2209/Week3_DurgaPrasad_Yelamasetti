"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brouter = void 0;
const express_1 = __importDefault(require("express"));
exports.Brouter = express_1.default.Router();
const controllers_1 = require("../controllers");
exports.Brouter.get('/weatherDashboard', controllers_1.getWeatherDashboard);
exports.default = exports.Brouter;
//# sourceMappingURL=B.js.map