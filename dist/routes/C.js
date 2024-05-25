"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crouter = void 0;
const express_1 = require("express");
const mail_1 = require("../mail");
exports.Crouter = (0, express_1.Router)();
exports.Crouter.post('/sendWeatherEmail', mail_1.sendWeatherEmail);
exports.default = exports.Crouter;
//# sourceMappingURL=C.js.map