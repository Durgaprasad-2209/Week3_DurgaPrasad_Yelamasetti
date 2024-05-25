"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Weather_1 = require("./Weather");
const sequelize = new sequelize_1.Sequelize({
    database: "postgres",
    username: 'postgres',
    password: "Dpvinay@2209",
    port: 5432,
    dialect: 'postgres',
});
exports.sequelize = sequelize;
const Weather = (0, Weather_1.WeatherFactory)(sequelize);
exports.Weather = Weather;
//# sourceMappingURL=pgConfig.js.map