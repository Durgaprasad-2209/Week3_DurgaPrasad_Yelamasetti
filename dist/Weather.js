"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherFactory = exports.Weather = void 0;
const sequelize_1 = require("sequelize");
class Weather extends sequelize_1.Model {
}
exports.Weather = Weather;
function WeatherFactory(sequelize) {
    Weather.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        weather: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        longitude: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        latitude: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'Weathers'
    });
    return Weather;
}
exports.WeatherFactory = WeatherFactory;
//# sourceMappingURL=Weather.js.map