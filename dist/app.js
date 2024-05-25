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
const express_1 = __importDefault(require("express"));
const pgConfig_1 = require("../src/pgConfig");
const AD_1 = require("./routes/AD");
const B_1 = require("./routes/B");
const C_1 = require("./routes/C");
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use('/api', AD_1.ADrouter);
app.use('/api', B_1.Brouter);
app.use('/api', C_1.Crouter);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${PORT}`);
    yield pgConfig_1.sequelize.authenticate();
    console.log('Database connected!');
}));
//# sourceMappingURL=app.js.map