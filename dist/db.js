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
exports.initDb = exports.MyTable = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const pgConfig_1 = __importDefault(require("./pgConfig"));
exports.sequelize = pgConfig_1.default;
class MyTable extends sequelize_1.Model {
}
exports.MyTable = MyTable;
MyTable.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: pgConfig_1.default,
    modelName: 'MyTable',
    tableName: 'my_table',
    timestamps: false,
});
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgConfig_1.default.authenticate();
        console.log('Connection has been established successfully.');
        yield pgConfig_1.default.sync();
        console.log('All models were synchronized successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.initDb = initDb;
//# sourceMappingURL=db.js.map